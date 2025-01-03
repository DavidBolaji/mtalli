import { Typography } from "@/components/typography/typography";
import { formatToNaira } from "@/utils/helper";
import React from "react";
import FilterComponent from "./filter-component";


export const RenderDashboardcards:React.FC<{data: {
  title: string
  amount: number
  type?: string
  icon: React.ComponentType<{color?: string}>
}[],
dash?: boolean
}> = ({data, dash = true}) => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {data.map((el) => (
        <div key={el.title} className={`h-40 font-onest rounded-2xl bg-white border border-[#ABD0E4] col-span-12 p-6 ${dash ? "lg:col-span-6": "lg:col-span-4"} `}>
          <div className="flex justify-between mb-2">
            <div className="w-10 h-10 bg-black-100 rounded-lg flex items-center justify-center">{<el.icon color="white" />}</div>
            <div className="">
              <FilterComponent />
            </div>
          </div>
          <Typography
            as="p"
            size="s1"
            align="left"
            className="black-200 text-sm py-2 font-medium font-onest"
          >
            {el.title}
          </Typography>
          <Typography
            as="h5"
            size="h5"
            align="left"
            className="black-100 font-medium leading-8 text-xl tracking-wide"
          >
            {!el.type ? el.amount : formatToNaira(el.amount)}
          </Typography>
        </div>
      ))}
    </div>
  );
};
