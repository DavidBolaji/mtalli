"use server"

import { IEvent } from "@/components/table/event-table/types";
import db from "@/db/db"
import { Event, Image, Prisma, Promotion } from "@prisma/client";
import { redirect } from "next/navigation";

interface GetEventsParams {
    page?: number;
    limit?: number;
    sort?: string; // default sorting field
    sortOrder?: string; // ascending or descending order
    searchQuery?: string; // ascending or descending order
    startDate?: string;
    endDate?: string;
}
interface GetEventsSearchParams {
    destinations?: string[];
    minPrice: string;
    maxPrice: string;
    location: string;
    startDate?: string;
    endDate?: string;
}

export const getDashboardEvent = async ({
    page = 1,
    limit = 10,
    sort = "createdAt", // default sorting field
    sortOrder = "asc", // ascending or descending order
    searchQuery = "", // ascending or descending order
    startDate,
    endDate,
}: GetEventsParams) => {
    const skip = (page - 1) * limit;
    // Build the `where` clause conditionally


    const whereClause: Prisma.EventWhereInput = {
        // Filter users by orders created within the date range (if provided)
        ...(startDate || endDate
            ? {

                startDate: {
                    ...(startDate ? { gte: startDate } : {}),
                    ...(endDate ? { lte: endDate } : {}),
                }
            }
            : {}),

        // Add search query filter across multiple fields (if provided)
        ...(searchQuery && {
            OR: [
                { title: { contains: searchQuery } },
            ],
        }),
    };

    const orderBy: Prisma.EventOrderByWithRelationInput =
        { [sort]: sortOrder as Prisma.SortOrder };



    try {
        const totalItems = await db.event.count({ where: whereClause });
        const events = await db.event.findMany({
            where: whereClause,
            select: {
                id: true,
                title: true,
                price: true,
                description: true,
                location: true,
                info: true,
                policy: true,
                status: true,
                startDate: true,
                endDate: true,
                rules: true,
                totalSlots: true,
                leftSlot: true,
                serviceFee: true,
                images: {
                    select: {
                        url: true,
                    },
                },
                promotion: {
                    select: {
                        name: true,
                        discount: true,
                        startDate: true,
                        endDate: true,
                        code: true,
                        id: true
                    }
                }
            },
            skip,
            take: limit,
            orderBy,
        });
        const totalPages = Math.ceil(totalItems / limit);



        return { events: events ?? [], totalPages };
    } catch (error) {
        console.log((error as Error).message);
    }
};

export const filterEvent = (
    formData: FormData,
    currentParams: URLSearchParams,
    path?: string
) => {
    const params = new URLSearchParams(currentParams);

    const page = (formData.get("page") as string) || params.get("page") || "1"; // Default to page 1
    const sort = (formData.get("sort") as string) || params.get("sort") || "name"; // Default to "name"
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
    const destinationPath = path ? path : "/dashboard/events";

    // Redirect to the new URL with updated parameters
    redirect(queryString ? `${destinationPath}?${queryString}` : destinationPath);
};

export const getEvent = async (eventId: string): Promise<IEvent | null> => {

    try {
        const event = await db.event.findUnique({
            where: {
                id: eventId,
            },
            select: {
                id: true,
                title: true,
                price: true,
                description: true,
                location: true,
                info: true,
                policy: true,
                status: true,
                startDate: true,
                rules: true,
                endDate: true,
                totalSlots: true,
                leftSlot: true,
                serviceFee: true,
                images: {
                    select: {
                        url: true,
                    },
                },
                promotion: {
                    select: {
                        name: true,
                        discount: true,
                        startDate: true,
                        endDate: true,
                        id: true
                    }
                }
            },
        });

        if (!event) return null;

        return event;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const deleteEvents = async (data: Set<string>) => {
    await db.event.deleteMany({
        where: {
            id: {
                in: Array.from(data)
            }
        }
    })
}

export async function fetchEvents(page: number = 1, limit: number = 15): Promise<{
    items: (Event & { promotion: Promotion[] } & { images: Image[] })[]
    hasMore: boolean
}> {

    const skip = (page - 1) * limit
    const totalItems = await db.event.count()

    const events = await db.event.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
            promotion: true,
            images: true
        }
    })

    const hasMore = skip + events.length < totalItems;
    // Simulate database fetch with pagination

    const finalEvents = events.map((event) => {
        const eventPromotions = event.promotion || [];
        const allPromotions = [...eventPromotions];

        return {
            ...event,
            promotion: allPromotions,
        };
    });

    return { items: finalEvents, hasMore };

}

export const fetchMoreEvent = (page: number) => {
    redirect(`/?page=${page}`)
}

export const getEventsByQuery = async (
    search: string
): Promise<IEvent[]> => {
    try {
        const events = await db.event.findMany({
            where: {
                title: {
                    contains: search,
                },
            },
            select: {
                id: true,
                title: true,
                price: true,
                description: true,
                location: true,
                info: true,
                policy: true,
                status: true,
                startDate: true,
                rules: true,
                endDate: true,
                totalSlots: true,
                leftSlot: true,
                serviceFee: true,
                images: {
                    select: {
                        url: true,
                    },
                },
                promotion: {
                    select: {
                        name: true,
                        discount: true,
                        startDate: true,
                        endDate: true,
                        id: true
                    }
                }
            },
        });
        return events;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const getUniqueEventsByLocation = async (
) => {
    try {

        const eventsData = await db.$transaction(async (tx) => {
            // Get all unique locations
            const locations = await tx.event.findMany({
                select: {
                    location: true,
                    id: true
                },
                distinct: ['location']
            });

            // Get the highest and lowest priced events
            const [maxPriceEvent, minPriceEvent] = await Promise.all([
                tx.event.findFirst({
                    orderBy: {
                        price: 'desc'
                    },
                    select: {
                        price: true
                    }
                }),
                tx.event.findFirst({
                    orderBy: {
                        price: 'asc'
                    },
                    select: {
                        price: true
                    }
                })
            ]);

            return {
                locations: locations.map(l => ({ id: l.id, label: l.location })),
                highestPricedEvent: maxPriceEvent ? +maxPriceEvent.price : 1000,
                lowestPricedEvent: minPriceEvent ? +minPriceEvent.price : 0
            };
        });

        return eventsData
    } catch (error) {
        throw new Error((error as Error).message);
    }
};


export const filterEventSearch = (
    formData: FormData,
    currentParams?: URLSearchParams,
    path?: string
) => {
    const params = new URLSearchParams(currentParams);

    const destinations = formData
        .getAll("Destinations[]")
        .filter((item) => typeof item === "string") as string[];
    const dest = params.getAll("destinations") as unknown as (string | string[])

    const minPrice = formData.get("minPrice") as string;
    const maxPrice = formData.get("maxPrice") as string;

    params.delete("destinations");
    if (destinations.length > 0) {
        destinations.forEach((destination) => params.append("destinations", destination));
    } else {
        if (dest) {
            (dest as string[]).forEach((el) =>
                params.append("destinations", el as string)
            )
        }
    }

    if (minPrice) {
        params.set("minPrice", minPrice);
    } else {
        params.delete("minPrice");
    }

    if (maxPrice) {
        params.set("maxPrice", maxPrice);
    } else {
        params.delete("maxPrice");
    }

    const queryString = params.toString();
    const destinationPath = path ? path : "/search";
    // Redirect to the new URL with updated parameters
    redirect(queryString ? `${destinationPath}?${queryString}` : destinationPath);
};

export const resetSearchFilter = () => {
    redirect(`/search`);
};

export async function getEventSearch({
    destinations,
    maxPrice,
    minPrice,
    location,
    startDate,
    endDate
}: GetEventsSearchParams): Promise<{
    items: (Event & { promotion: Promotion[] } & { images: Image[] })[]
    hasMore: boolean
}> {
    // Convert date strings to ISO DateTime format
    const formatDateToISO = (dateStr?: string) => {
        if (!dateStr) return undefined;
        // Append time to make it a valid ISO DateTime
        // Start of day for start date, end of day for end date
        const date = new Date(dateStr);
        return date.toISOString();
    };

    const isoStartDate = startDate ? formatDateToISO(startDate) : undefined;
    const isoEndDate = endDate ? formatDateToISO(endDate) : undefined;

    // Build the `where` clause conditionally
    const whereClause: Prisma.EventWhereInput = {
        // Filter by destinations if provided
        ...(destinations?.length && {
            location: {
                in: destinations,
            },
        }),

        // Filter by location if provided
        ...(location?.length && {
            location: {
                contains: location,
                // Add case-insensitive search if your database supports it
            },
        }),

        // Filter by date range if provided
        ...(isoStartDate || isoEndDate
            ? {
                startDate: {
                    ...(isoStartDate ? { gte: isoStartDate } : {}),
                    ...(isoEndDate ? { lte: isoEndDate } : {}),
                }
            }
            : {}),

        // Filter by price range if provided
        ...(maxPrice || minPrice
            ? {
                price:
                    maxPrice && minPrice
                        ? { gte: +minPrice, lte: +maxPrice }
                        : minPrice
                            ? { gte: +minPrice }
                            : { lte: +maxPrice },
            }
            : {}),
    };

    try {
        const events = await db.event.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            include: {
                promotion: true,
                images: true
            }
        });

        const finalEvents = events.map((event) => {
            const eventPromotions = event.promotion || [];
            const allPromotions = [...eventPromotions];

            return {
                ...event,
                promotion: allPromotions,
            };
        });

        return { items: finalEvents, hasMore: false };
    } catch (error) {
        console.log((error as Error).message);
        return { items: [], hasMore: false }
    }
}

export const redirectProfile = (key: string) => {
    redirect(`/profile?active=${key}`)
}