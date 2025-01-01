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

      if(!event) return null;
      
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
  items: (Event & {promotion: Promotion[]} & {images: Image[]})[]
  hasMore: boolean
}> {

  const skip = (page - 1) * limit
  const totalItems = await db.event.count()

  const events = await db.event.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc"},
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
  