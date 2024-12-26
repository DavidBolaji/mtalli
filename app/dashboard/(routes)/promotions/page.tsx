import React from "react";
import { RenderDashboardcards } from "../../components/render-dashboard-cards";

import { getDashboardPromotion, getPromotionsStat } from "@/actions/get-promotions";
import { renderPromotionCard } from "@/utils/data";
import PromotionsTable from "@/components/table/promotions-table/promotions-table";
import { Promotion } from "@/components/table/promotions-table/types";

export const revalidate = 0;

interface OrdersPageSearchParams {
  [key: string]: string;
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: OrdersPageSearchParams;
}) {
  const promotionStat = await getPromotionsStat();
  const data = renderPromotionCard(promotionStat);
  const categories = Array.isArray(searchParams.category)
    ? searchParams.category
    : searchParams.category
    ? [searchParams.category]
    : [];
  // const categories = searchParams.category?.split(",") || [];
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 7;
  const sort = searchParams.sort || "createdAt";
  const sortOrder = searchParams.sortOrder || "asc";
  const startDate = searchParams.dateFrom || "";
  const endDate = searchParams.dateTo || "";
  const searchQuery = searchParams.searchQuery || "";
  const promotionStatus = searchParams.promotionStatus || "";
  const pStat = Array.isArray(searchParams.pStat)
  ? searchParams.pStat
  : searchParams.pStat
  ? [searchParams.pStat]
  : [];
  const promoT = Array.isArray(searchParams.promoT)
  ? searchParams.promoT
  : searchParams.promoT
  ? [searchParams.promoT]
  : [];

  const req = await getDashboardPromotion({
    categories: categories.map((el) => el.toLowerCase()),
    promotionStatus,
    page,
    limit,
    sort,
    sortOrder,
    startDate,
    endDate,
    searchQuery,
    pStat: pStat.map((el) => el.toLowerCase()),
    promoT: promoT.map((el) => el.toLowerCase())
  });


//   const req2 = getCategories();

  const [promotion] = await Promise.all([req]);

  return (
    <div className="p-4">
      <RenderDashboardcards data={data} />
      <div className="mt-10" />
      <PromotionsTable
        initialPromotions={(promotion?.promotions as unknown as Promotion[]) ?? []}
        totalPages={promotion?.totalPages}
        page={page}
        itemsPerPage={limit}
        // categories={categoryList}
      />
    </div>
  );
}
