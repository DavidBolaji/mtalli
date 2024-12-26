"use client";
import React from "react";
import { Button } from "../button/button";
import { Spinner } from "../spinner";


export const DashboardTitleHeader: React.FC<{
  title: string;
  discard: () => void;
  btnText?: string
  addItem: () => void;
  loading?: boolean
  extra?: () => void
}> = ({ title, discard, addItem, btnText, loading, extra }) => {
  const add = async () => {
    addItem();
  };

  return (
    <div className="flex md:flex-row flex-col items-center justify-between mb-8 bg-white px-4 py-[19px] rounded-2xl border border-[#DDEEE5]">
      <h1 className="text-2xl font-semibold md:mb-0 mb-4">{title}</h1>
      <div className="grid grid-cols-2 gap-3">
        <Button size="lg" color="light" className="h-9 flex items-center justify-center text-sm" onClick={discard}>
          Discard Changes
        </Button>
        {extra ? <Button size="lg" color="light" className="h-9 flex items-center justify-center text-sm" onClick={extra}>
          Save as Draft
        </Button>: null}
        {!loading ? <Button size="lg" color="dark" className="h-9 flex items-center justify-center text-sm" onClick={add}>
          {btnText ? btnText : "Add Product"}
        </Button> : <Button disabled size="lg" color="light" className="h-9 w-28 flex justify-center items-center">
          <Spinner />
        </Button>}
      </div>
    </div>
  );
};
