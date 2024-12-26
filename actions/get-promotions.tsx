"use server"

import db from "@/db/db";
import { Prisma, Promotion, PromotionType } from "@prisma/client";
import { redirect } from "next/navigation";

interface GetPromotionsParams {
  categories?: string[];
  promotionStatus?: string;
  page?: number;
  limit?: number;
  sort?: string; // default sorting field
  sortOrder?: string; // ascending or descending order
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
  pStat?: string[];
  promoT?: PromotionType[];
}

export const getPromotions = async (): Promise<Pick<Promotion, "id" | "name">[]> => {
  try {
    const promotions = await db.promotion.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return promotions;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getPromotionsStat = async () => {
  // Get the total count of promotions
  // const all = db.promotion.count({});
  const all = db.promotion.groupBy({
    by: ["name"],
    _count: {
      id: true
    }
  });


  // Get the count of active promotions
  // const active = db.promotion.count({
  //   where: {
  //     startDate: {
  //       lte: new Date(), // Active if today's date is greater than or equal to startDate
  //     },
  //     endDate: {
  //       gte: new Date(), // Active if today's date is less than or equal to endDate
  //     },
  //   },
  // });
  const active = await db.promotion.groupBy({
    by: ["name"],
    where: {
      AND: [
        {
          status: true
        },
        {
          startDate: {
            lte: new Date(), // Active if today's date is greater than or equal to startDate
          },
          endDate: {
            gte: new Date(), // Active if today's date is less than or equal to endDate
          },
        }
      ]
    },
    _count: {
      id: true
    }
  });

  // Get the count of cancelled promotions
  // const cancelled = db.promotion.count({
  //   where: {
  //    status: false
  //   },
  // });

  const cancelled = await db.promotion.groupBy({
    by: ["name"],
    where: {
      AND: [
        {
          status: false
        },
        {
          endDate: {
            lt: new Date(), // Cancelled if today's date is after endDate
          },
        }
      ]
    },
    _count: {
      id: true
    }
  });

  // Await all queries simultaneously
  const [activePromotion, allPromotion, cancelledPromotion] = await Promise.all([
    active,
    all,
    cancelled,
  ]);

  // Return the statistics
  return {
    activePromotion: activePromotion?.length,
    allPromotion: allPromotion?.length,
    cancelledPromotion: cancelledPromotion?.length,
  };
};


export const getDashboardPromotion = async ({
  categories,
  page = 1,
  limit = 7,
  sort = "createdAt", // default sorting field
  sortOrder = "asc", // ascending or descending order
  startDate,
  endDate,
  searchQuery,
  pStat,
  promoT
}: GetPromotionsParams) => {
  const skip = (page - 1) * limit;
  const isActive = pStat?.includes("active")
  const isComplete = pStat?.includes("complete")
  const isCancelled = pStat?.includes("cancelled")
  const pro = (promoT?.map(el => el.toUpperCase()) ?? []) as PromotionType[]

  console.log(pStat)
  console.log(promoT)
  console.log(isActive, isComplete, isCancelled)

  // Build the `where` clause conditionally
  const whereClause: Prisma.PromotionWhereInput = {
    ...(categories?.length && {
      products: {
        some: {
          category: {
            name: {
              in: categories,
            },
          },
        },
      },
    }),

    ...(pStat?.length && {
      OR: [
        isActive ? {
          status: isActive
        } : {},
        isComplete ? {
          endDate: {
            lte: new Date()
          }
        } : {},
        isCancelled ? {
          status: false
        } : {},
      ]

    }),

    ...(promoT?.length && {
      promotionType: {
        in: pro
      }
    }),

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
    ...(searchQuery && {
      OR: [
        { name: { contains: searchQuery } },
        { code: { contains: searchQuery } },
      ],
    }),
  };


  const orderByField =
    sort === "name"
      ? "name"
      : sort === "type"
        ? "promotionType"
        : sort === "endDate"
          ? "endDate"
          : sort === "startDate"
            ? "startDate"
            : "createdAt";

  try {
    // Get unique promotions grouped by name with dynamic sorting
    const promotions = await db.promotion.groupBy({
      by: ["name"],
      where: whereClause,
      _max: {
        id: true,
        status: true,
        promotionType: true,
        code: true,
        startDate: true,
        endDate: true,
        createdAt: true,
      },
      orderBy: {
        _max: { [orderByField]: sortOrder as Prisma.SortOrder },
      },
      skip,
      take: limit,
    });

    const formattedPromotions = promotions.map((promo) => ({
      id: promo._max.id,
      name: promo.name,
      status: promo._max.status,
      promotionType: promo._max.promotionType,
      code: promo._max.code,
      startDate: promo._max.startDate,
      endDate: promo._max.endDate,
    }));

    // Get total pages based on unique promotions
    const totalItems = await db.promotion.groupBy({
      by: ["name"],
      where: whereClause,
      _count: { name: true },
    });

    const totalPages = Math.ceil(totalItems.length / limit);

    return { promotions: formattedPromotions ?? [], totalPages };
  } catch (error) {
    console.log((error as Error).message);
    throw new Error("Failed to fetch promotions");
  }
};




export const filterPromotions = (
  formData: FormData,
  currentParams: URLSearchParams,
  path?: string
) => {
  const params = new URLSearchParams(currentParams);

  // Extract filter values from the form data
  const categories = formData
    .getAll("Categories[]")
    .filter((item) => typeof item === "string") as string[];

  const pStat = formData
    .getAll("Pstat[]")
    .filter((item) => typeof item === "string") as string[];

  const promoT = formData
    .getAll("PromoT[]")
    .filter((item) => typeof item === "string") as string[];

  const page = (formData.get("page") as string) || params.get("page") || "1"; // Default to page 1
  const sort = (formData.get("sort") as string) || params.get("sort") || "name"; // Default to "name"
  const sortOrder =
    (formData.get("sortOrder") as string) || params.get("sortOrder") || "asc";
  const startDate = formData.get("dateFrom") as string;
  const endDate = formData.get("dateTo") as string;
  const searchQuery = params.get("searchQuery") as string;
  const status = formData
    .getAll("Status[]")
    .filter((item) => typeof item === "string") as string[];

  // Handle categories - Add or remove based on selection
  params.delete("category");
  if (categories.length > 0) {
    categories.forEach((category) => params.append("category", category));
    params.set("page", "1"); // Reset to page 1 if categories change
  }


  params.delete("pStat");
  if (pStat.length > 0) {
    pStat.forEach((stat) => params.append("pStat", stat));
    params.set("page", "1"); // Reset to page 1 if categories change
  }


  params.delete("promoT");
  if (promoT.length > 0) {
    promoT.forEach((promoT) => params.append("promoT", promoT));
    params.set("page", "1"); // Reset to page 1 if categories change
  }

  params.delete("status");
  if (status.length > 0) {
    status.forEach((status) => params.append("status", status));
    params.set("page", "1"); // Reset to page 1 if categories change
  }

  // Handle page - Maintain page if unchanged, reset to 1 otherwise
  if (
    categories.length === 0 &&
    startDate === undefined &&
    endDate === undefined &&
    !searchQuery
  ) {
    params.delete("page"); // Remove if no filters are applied
  } else {
    params.set("page", page);
  }
  if (
    status.length === 0 &&
    startDate === undefined &&
    endDate === undefined &&
    !searchQuery
  ) {
    params.delete("page"); // Remove if no filters are applied
  } else {
    params.set("page", page);
  }

  // Set sorting fields in the URL parameters
  params.set("sort", sort);
  params.set("sortOrder", sortOrder);

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
  const destinationPath = path ? path : "/dashboard/promotions";

  // Redirect to the new URL with updated parameters
  redirect(queryString ? `${destinationPath}?${queryString}` : destinationPath);
};


export const getPromotionSingle = async (promotionId: string) => {
  try {
    const promotion = await db.promotion.findUnique({
      where: {
        id: promotionId,
      },
    });


    return promotion ?? null;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deletePromotions = async (data: Set<string>) => {
  const ids: string[] = Array.from(data);  // Convert the Set to an array for easier manipulation

  // Step 1: Retrieve the promotions matching the IDs
  const deletedLit = await db.promotion.findMany({
    where: {
      id: {
        in: ids
      }
    },
    select: {
      id: true,
      code: true
    }
  });

  // Step 2: Create a set to track IDs that need to be deleted
  const idsToDelete = new Set<string>(ids);

  // Step 3: Iterate over the promotions we found to check for promotions with the same code
  for (const promotion of deletedLit) {
    // Find all promotions with the same code
    const promotionsWithSameCode = await db.promotion.findMany({
      where: {
        code: promotion.code
      },
      select: {
        id: true
      }
    });

    // Add the IDs of these promotions to the deletion set
    promotionsWithSameCode.forEach(promo => {
      idsToDelete.add(promo.id);
    });
  }

  // Step 4: Delete all promotions that need to be deleted
  await db.promotion.deleteMany({
    where: {
      id: {
        in: Array.from(idsToDelete)  // Convert Set back to array for the query
      }
    }
  });
};


