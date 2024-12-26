"use client"
import React, { useEffect } from "react";
import { Promotion } from "@prisma/client";
import { PromotionDetail } from "./promotion-detail";
import { Typography } from "@/components/typography/typography";
import { Button } from "@/components/button/button";
import { useQueryClient } from "@tanstack/react-query";
import { IPromotion } from "./types";
import { SelectPromotionType } from "@/app/dashboard/components/select-promotion-type";
import { PromotionProduct } from "./promotion-product";
import { format } from "date-fns";

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
      
      if (promotion?.promotionType === "CATEGORY") {
        const category = promotion?.category && promotion?.category.map((el) => ({
          label: el.name,
          value: el.id,
          key: el.id,
        }))
        queryClient.setQueryData(["SELECT_CATEGORY"], () => category)
      } else {
        queryClient.setQueryData(["SELECT_ITEM"], () => promotion?.product)
      }
    }
  }, [])

  const getPath = () =>
    queryClient.getQueryData(["CREATE_PROMOTION"]) as Promotion & {
      type: string;
    };

  const open = () => {
    const path = getPath();
    if (path?.type?.toLocaleLowerCase() === "category") {
      return queryClient.setQueryData(["PROMOTION_CATEGORY_DRAWER"], true);
    } else {
      return queryClient.setQueryData(["PROMOTION_ITEM_DRAWER"], true);
    }
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
                Select promotion products
              </Typography>
              <Button
                size="lg"
                color="light"
                className="border-0 h-9 bg-black-600 text-white"
                onClick={() => open()}
              >
                Select Products
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
