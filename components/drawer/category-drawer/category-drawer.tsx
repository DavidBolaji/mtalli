"use client";

import React from "react";
import { CloseIcon } from "@/constants/icons/close";
import { Grid } from "antd";
// import { StyledDrawer, StyledMobileDrawer } from "../drawer.style";
import { useCategoryDrawer } from "@/hooks/use-category-drawer";
import { Folder } from "lucide-react";
import { Typography } from "@/components/typography/typography";
import { AddCategoryForm } from "@/components/form/add-category/add-category-form";
import { StyledDrawer, StyledMobileDrawer } from "../drawer.style";
const { useBreakpoint } = Grid;

export const CategoryDrawer = () => {
  const { categoryDrawer, toggleDrawer } = useCategoryDrawer();
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
              <Folder size="32" />
              <span className="inline-block pl-2.5 text-h5 font-bold text-2xl black-100">
                Add New Category
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
            <Typography
              size="s1"
              as="p"
              align="left"
              className="black-100 pt-6 pb-4"
            >
              Create a new product category
            </Typography>
            <AddCategoryForm />
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
              <Folder size="28" />
              <span className="inline-block pl-2.5 text-h5 font-bold text-xl black-100">
                Add New Category
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
            <Typography
              size="s1"
              as="p"
              align="left"
              className="black-100 pt-6 pb-4"
            >
              Create a new product category
            </Typography>
            <AddCategoryForm />
          </div>
        </StyledMobileDrawer>
      )}
    </div>
  );
};
