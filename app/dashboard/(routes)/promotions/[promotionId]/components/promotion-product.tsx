import { Typography } from "@/components/typography/typography";
import { formatToNaira } from "@/utils/helper";
import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { IPromotion } from "./types";

export const PromotionProduct: React.FC<{
  item: IPromotion;
}> = ({ item }) => {
  const cartOrderStyles = classNames("w-full pr-4 flex mt-1  justify-between items-center rounded-xl")

  return (
    <div className="bg-white px-4 py-6 rounded-2xl border-[#DDEEE5]">
      <Typography as="p" size="s1" align="left" className="mb-[14px] black-100">
        Promotion Products
      </Typography>
      {item?.promotionType === "CATEGORY" ? (
        <>
          {item?.category?.map((cat) => (
            <div key={cat?.id}>{cat?.name} (all items)</div>
          ))}
        </>
      ) : (
        <>
          {item?.product?.map((prod) => (
             <div key={prod.id} className={cartOrderStyles}>
             <div className="flex items-center h-12 mt-3">
               <div className={`rounded-xl relative h-[120px] w-[120px]`}>
                 <Image
                   priority
                   src={prod?.images[0]?.url ?? ""}
                   fill
                   alt={prod.name}
                   className="object-contain p-3 w-full h-full rounded-xl absolute -ml-6"
                 />
               </div>
               <div>
                 <Typography as="p" size="s1" align="left" className="-ml-6">
                   {prod.name}
                 </Typography>
                 <Typography as="h6" size="h6" align="left" className="pb-2 font-bold black-300 leading-7 -ml-6">
                 {formatToNaira(prod.price)}
                   {/* {formatToNaira(product.price)} */}
                 </Typography>
               
               </div>
             </div>
             
           </div>
          ))}
        </>
      )}
    </div>
  );
};
