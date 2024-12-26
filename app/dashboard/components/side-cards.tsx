import { Typography } from "@/components/typography/typography";
import Image from "next/image";
import React, { ReactNode } from "react";

export const SideCards: React.FC<{
  title: string;
  filter: ReactNode;
  body: ReactNode;
}> = ({ title, filter, body }) => {
  return (
    <div className="w-full bg-white max-h-[500px] overflow-y-auto border border-[#ABD0E4] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <Typography as="h5" size="s1" align="left" className="font-bold">{title}</Typography>
        <div>{filter}</div>
      </div>
      <div>{body}</div>
    </div>
  );
};

export const MeatCard: React.FC<{
  img: string;
  title: string;
  order: number | string;
}> = ({ img, title, order }) => {
  return (
    <div className="flex h-[60px] gap-4">
      <div className="w-[60px] h-full flex items-center rounded-2xl overflow-hidden">
        <Image src={img} alt={title} width={60} className="object-cover h-full w-full" height={60} priority />
      </div>
      <div>
        <Typography as="p" size="s1" align="left" className="mb-2">
          {title}
        </Typography>

        <Typography
          as="p"
          size="c1"
          align="left"
          className="tracking-tighter font-bold border-[#23342A] border inline-block px-2 rounded-2xl"
        >
          {order} orders
        </Typography>
      </div>
    </div>
  );
};
