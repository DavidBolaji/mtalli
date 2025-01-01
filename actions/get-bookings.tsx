"use server";
import db from "@/db/db";
import { Event, Image, Prisma } from "@prisma/client";
import { startOfYear, endOfYear, format } from "date-fns";
import { redirect } from "next/navigation";

interface GetBookingsParams {
    status?: string[];
    page?: number;
    limit?: number;
    sort?: string; // default sorting field
    sortOrder?: string; // ascending or descending booking
    startDate?: string;
    endDate?: string;
    searchQuery?: string;
}


export interface IBook {
    id: string,
    events: (Pick<Event, "id" | "title" | "startDate" | "endDate"> & { images: Pick<Image, "url">[] }) | null,
    bookingCount: number,
    totalPrice: number,
}


export type ISingleBooking = {
    id: string;
    orderNo: string;
    totalPrice: number;
    createdAt: Date;
    bookingCount: number;
    User: {
        fname: string | null;
        lname: string | null;
        email: string;
        phone: string | null;
    } | null;
    events: (Pick<Event, "id" | "title" | "startDate" | "endDate" | "serviceFee" | "price"> & { images: Pick<Image, "url">[] }) | null;
} | null | undefined ;


export async function getMonthlyRevenue() {
    // Get the start and end of the current year
    const startOfCurrentYear = startOfYear(new Date());
    const endOfCurrentYear = endOfYear(new Date());

    // Aggregate revenue by month
    const rawData = await db.booking.groupBy({
        by: ["createdAt"],
        _sum: {
            totalPrice: true,
        },
        where: {
            createdAt: {
                gte: startOfCurrentYear,
                lte: endOfCurrentYear,
            },
        },
    });

    // Initialize an array with months and zero revenue
    const months = Array.from({ length: 12 }, (_, i) => ({
        month: format(new Date(2024, i, 1), "MMM"), // Adjust year dynamically if needed
        revenue: 0,
    }));

    // Map raw data to the corresponding month
    rawData.forEach(({ createdAt, _sum }) => {
        const monthIndex = new Date(createdAt).getMonth();
        if (_sum.totalPrice) {
            months[monthIndex].revenue += _sum.totalPrice;
        }
    });

    return months;
}


export const filterBooking = (
    formData: FormData,
    currentParams: URLSearchParams,
    path?: string
) => {
    const params = new URLSearchParams(currentParams);

    // Extract filter values from the form data
    // const page = (formData.get("page") as string) || params.get("page") || "1"; // Default to page 1
    const sort = (formData.get("sort") as string) || params.get("sort") || "title"; // Default to "name"
    const sortbooking =
        (formData.get("sortbooking") as string) || params.get("sortbooking") || "asc";
    const startDate = formData.get("dateFrom") as string;
    const endDate = formData.get("dateTo") as string;
    const searchQuery = params.get("searchQuery") as string;

    // Set sorting fields in the URL parameters
    params.set("sort", sort);
    params.set("sortbooking", sortbooking);

    // Handle date range filters
    if (startDate) {
        params.set("dateFrom", startDate);
    } else {
        params.delete("dateFrom");
    }
    if (endDate) {
        params.set("dateTo", endDate);
    } else {
        params.delete("dateTo");
    }

    // Handle search query
    if (searchQuery) {
        params.set("searchQuery", searchQuery);
    } else {
        params.delete("searchQuery");
    }

    // Generate the final query string
    const queryString = params.toString();
    const destinationPath = path ? path : "/dashboard/bookings";

    // Redirect to the new URL with updated parameters
    redirect(queryString ? `${destinationPath}?${queryString}` : destinationPath);
};

export const getDashboardBooking = async ({
    page = 1,
    limit = 10,
    sort = "createdAt", // default sorting field
    sortOrder = "asc", // ascending or descending booking
    startDate,
    endDate,
    searchQuery,
}: GetBookingsParams) => {
    const skip = (page - 1) * limit;

    const whereClause: Prisma.BookingWhereInput = {
        // Filter users by Bookings created within the date range (if provided)
        ...(startDate || endDate
            ? {
                createdAt:
                    startDate && endDate
                        ? { gte: startDate, lte: endDate }
                        : startDate
                            ? { gte: startDate }
                            : { lte: endDate },
            }
            : {}),

        // Add search query filter across multiple fields (if provided)
        ...(searchQuery && {
            OR: [
                { orderNo: { contains: searchQuery } },
                { events: { title: { contains: searchQuery } } },
                // { User: { fname: { contains: searchQuery } } },
            ],
        }),
    };

    const bookingBy: Prisma.BookingOrderByWithRelationInput =
        sort === "event"
            ? { events: { title: sortOrder as Prisma.SortOrder } }
            :
            sort === "fname"
                ? { User: { fname: sortOrder as Prisma.SortOrder } }
                : sort === "title"
                    ? { events: { title: sortOrder as Prisma.SortOrder } } :
                    sort === "totalSlots"
                        ? { events: { totalSlots: sortOrder as Prisma.SortOrder } }
                        : sort === "date" // Handle sorting by date range
                            ? {
                                events: {
                                    startDate: sortOrder as Prisma.SortOrder,
                                },
                            }
                            : { [sort]: sortOrder as Prisma.SortOrder };

    try {
        const totalItems = await db.booking.count({ where: whereClause });
        let Bookings = await db.booking.findMany({
            where: whereClause,
            select: {
                id: true,
                orderNo: true,
                bookingCount: true,
                events: {
                    select: {
                        id: true,
                        title: true,
                        images: true,
                        totalSlots: true,
                        startDate: true,
                        endDate: true
                    },
                },
                User: {
                    select: {
                        fname: true,
                        lname: true,
                        phone: true,
                    },
                },
                createdAt: true,
            },
            skip,
            take: limit,
            orderBy: bookingBy,
        });
        const totalPages = Math.ceil(totalItems / limit);


        return { booking: Bookings ?? [], totalPages };
    } catch (error) {
        console.log((error as Error).message);
    }
};

export const getSinglebooking = async (id: string) : Promise<ISingleBooking> => {
    try {
        const booking = await db.booking.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                orderNo: true,
                events: {
                    select: {
                        id: true,
                        title: true,
                        startDate: true,
                        endDate: true,
                        serviceFee: true,
                        images: {
                            select: {
                                url: true
                            }
                        },
                        price: true,
                    },
                },
                totalPrice: true,
                User: {
                    select: {
                        fname: true,
                        lname: true,
                        phone: true,
                        email: true
                    },
                },
                createdAt: true,
                bookingCount: true,
            },
        });
        return booking
    } catch (error) {
        console.log((error as Error).message);
    }
};

export const getBooking = async (bookingId: string): Promise<IBook | null> => {

    try {
        const booking = await db.booking.findUnique({
            where: {
                id: bookingId,
            },
            select: {
                id: true,
                events: {
                    select: {
                        id: true,
                        title: true,
                        startDate: true,
                        endDate: true,
                        images: {
                            select: {
                                url: true
                            }
                        }
                    }
                },
                bookingCount: true,
                totalPrice: true,
            },
        });

        if (!booking) return null;

        return booking
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const deleteBookings = async (data: Set<string>) => {
    await db.booking.deleteMany({
        where: {
            id: {
                in: Array.from(data)
            }
        }
    })
}