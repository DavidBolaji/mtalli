"use client";
import React from "react";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";
import { useQueryClient } from "@tanstack/react-query";
import { Promotion } from "../table/promotions-table/types";

export const EmptyCart: React.FC<{
  close: () => void;
  dashboard?: boolean;
  promotion?: string;
  order?: string
}> = ({ close, dashboard = false, promotion  }) => {
  const queryClient = useQueryClient();
  const open = () => {
    if (promotion?.length) {
      const path = queryClient.getQueryData(["CREATE_PROMOTION"]) as Promotion & {type: string}
      if(path.type.toLocaleLowerCase() === "category") {
        return queryClient.setQueryData(["PROMOTION_CATEGORY_DRAWER"], true);
      } else {
        return queryClient.setQueryData(["PROMOTION_ITEM_DRAWER"], true);
      }
    }
    queryClient.setQueryData(["CART_DRAWER_DASHBOARD"], true);
  };

  return (
    <div className="h-5/6 max-w-[390px] flex-col flex items-center justify-center w-full mx-auto">
      <Typography as="h6" size="h6" align="center" className="pb-2 font-onest font-bold text-xl">
        {promotion ?? "Add item to cart"}
      </Typography>
      {dashboard && (
        <Button color="light" size="lg" onClick={open} className="font-onest font-medium text-sm">
          {promotion?.trim().length ? "Select Events" : "Add item to cart"}
        </Button>
      )}
      {!dashboard && (
        <>
          {" "}
          <span className="text-center text-[16px] mb-6 flex items-center justify-center font-medium font-satoshi leading-5 black-100">
            Looks like you haven&apos;t added anything yet! Explore our premium
            meats and find the perfect cuts to fill your cart.
          </span>
          <Button color="light" size="lg" onClick={close}>
            Continue shopping
          </Button>
        </>
      )}
    </div>
  );
};
