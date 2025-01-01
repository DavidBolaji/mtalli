"use client"
import React, { useEffect } from "react";
import { PromotionDetail } from "./promotion-detail";
import { Typography } from "@/components/typography/typography";
import { Button } from "@/components/button/button";
import { useQueryClient } from "@tanstack/react-query";
import { IPromotion } from "./types";
import { SelectPromotionType } from "@/app/dashboard/components/select-promotion-type";

import { format } from "date-fns";
import { PromotionProduct } from "./promotion-product";

export const PromotionComponent =  ({
  promotion,
  edit = false
}: {
  promotion: IPromotion;
  edit?: boolean
}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (edit) {
      queryClient.setQueryData(["CREATE_PROMOTION"], { ...promotion, startTime: format(promotion?.startDate ?? "", "H:mm"), endTime: format(promotion?.endDate ?? "", "H:mm"), type: promotion?.promotionType })
      console.log('[SELECT_CAT]');
      console.log(promotion?.event)
      queryClient.setQueryData(["SELECT_ITEM"], () => promotion?.event)
    }
  }, [])

  const open = () => {
    return queryClient.setQueryData(["PROMOTION_ITEM_DRAWER"], true);
  };

  return (
    <div className="">
      <div className="grid grid-cols-10 gap-x-6">
        <div className="lg:col-span-6 col-span-10 p-4">
          {promotion ? <PromotionDetail promotion={promotion} edit={edit} /> : null}
        </div>
        <div className="lg:col-span-4 lg:mr-4 col-span-10 mt-4 p-4 lg:mb-4 pb-10 lg:rounded-2xl  bg-white">
          {edit ? (<>
            <div className="flex justify-between items-center">
              <Typography size="s1" as="p" align="left" className="">
                Select promotion events
              </Typography>
              <Button
                size="lg"
                color="light"
                className="border-0 h-9 flex items-center text-sm bg-black-400 text-white"
                onClick={() => open()}
              >
                Select Events
              </Button>
            </div>
            <SelectPromotionType />
          </>)
            // : null
            : <PromotionProduct item={promotion} />
          }
        </div>
      </div>
    </div>
  );
};
