
import { getSinglePromotion } from "@/actions/get-promotions";
import { Crumb } from "@/components/crumb/crumb";

import React from "react";
import ViewPromotion from "../components/view-promotion";
import { PromotionComponent } from "../components/promotion-component";
import { IPromotion } from "../components/types";


export const revalidate = 0;

interface CustomerPageSearchParams {
  params: { promotionId: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function PromotionPage({
  params,
}: CustomerPageSearchParams) {
  const promotionId = params.promotionId;

  const promotion = await getSinglePromotion(promotionId) as IPromotion;

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
              text: "Edit",
              href: "#",
            }
          ]}
        />
      </div>
      <div className="px-4">
        <ViewPromotion promotion={promotion ?? null} edit />
      </div>
      <PromotionComponent promotion={promotion ?? null} edit />
    </div>
  );
}
