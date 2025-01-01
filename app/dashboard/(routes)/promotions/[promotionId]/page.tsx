import { getSinglePromotion } from "@/actions/get-promotions";
import { Crumb } from "@/components/crumb/crumb";
import { endOfToday, isAfter, isBefore, startOfToday } from "date-fns";

import React from "react";
import ViewPromotion from "./components/view-promotion";
import { PromotionComponent } from "./components/promotion-component";
import { Event, Image, Promotion } from "@prisma/client";



export const revalidate = 0;

interface CustomerPageSearchParams {
  params: { promotionId: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function PromotionPage({
  params,
}: CustomerPageSearchParams) {
  const promotionId = params.promotionId;

  const promotion = await getSinglePromotion(promotionId) as Promotion & { event: (Event & { images: Image[] })[] | null } | null;
  const isActive = promotion &&
    isBefore(new Date(promotion?.startDate), endOfToday()) &&
    isAfter(new Date(promotion?.endDate), startOfToday())

  console.log(JSON.stringify(promotion, null, 2))

  return (
    <div>
      <div className="p-4">
        <Crumb
          crumbData={[
            {
              text: "Dashboard",
              href: "/dashboard",
            },
            {
              text: "Promotions",
              href: "/dashboard/promotions",
            },
            {
              text: isActive ? "Active" : "Cancelled",
              href: "#",
            },
            {
              text: `${promotion?.code}`,
              href: "",
            },
          ]}
        />
      </div>
      <div className="px-4">
        <ViewPromotion promotion={promotion ?? null} />
      </div>
      <PromotionComponent promotion={promotion ?? null} />
    </div>
  );
}
