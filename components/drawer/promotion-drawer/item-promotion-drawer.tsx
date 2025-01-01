"use client";
import React from "react";
import { CloseIcon } from "@/constants/icons/close";
import { Grid } from "antd";
import { StyledDrawer, StyledMobileDrawer } from "../drawer.style";

import { usePromotionItemDrawer } from "@/hooks/use-promotion-item-drawer";
import { PromotionItemForm } from "@/components/form/promotion-item-form";
const { useBreakpoint } = Grid;

export const ItemCategoryDrawer = () => {
  const { categoryDrawer, toggleDrawer } = usePromotionItemDrawer();
  const screen = useBreakpoint();

  return (
    <div>
      {screen.lg && (
        <StyledDrawer
          open={(categoryDrawer as boolean) ?? false}
          onClose={() => toggleDrawer(!categoryDrawer)}
          closeIcon={null}
          width={485}
          footer={null}
        >
          <div className="w-full h-24 sticky top-0 z-10 bg-grey-200 flex items-center justify-between pl-10 pr-9">
            <div className="flex items-center">
              
              <span className="inline-block pl-2.5 text-h5 font-bold text-2xl black-100">
              Select items
              </span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => toggleDrawer(!categoryDrawer)}
            >
              <CloseIcon size="24" color="#92B09F" />
            </div>
          </div>
          <div className="">
           <PromotionItemForm />
          </div>
        </StyledDrawer>
      )}

      {!screen.lg && (
        <StyledMobileDrawer
          open={(categoryDrawer as boolean) ?? false}
          onClose={() => toggleDrawer(!categoryDrawer)}
          placement="bottom"
          height={"90%"}
          closeIcon={null}
          width={485}
          footer={null}
        >
          <div className="w-full h-[76px] sticky top-0 z-10 bg-grey-200 flex items-center justify-between pl-10 pr-9">
            <div className="flex items-center">
              
              <span className="inline-block pl-2.5 text-h5 font-bold text-xl black-100">
              Select items
              </span>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => toggleDrawer(!categoryDrawer)}
            >
              <CloseIcon size="24" color="#92B09F" />
            </div>
          </div>
          <div className="px-6">

            <PromotionItemForm />
          </div>
        </StyledMobileDrawer>
      )}
    </div>
  );
};
