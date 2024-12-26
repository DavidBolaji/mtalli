import { ChevronRightIcon } from "@/constants/icons/chevron-right";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

export const Crumb: React.FC<{
  crumbData: { text: string; href: string }[];
}> = ({ crumbData }) => {
  return (
    <nav className="flex items-center w-full">
      {crumbData.map((crumb, index) => {
        const isLast = index < crumbData.length - 1;
        const crumbStyle = classNames(
          "font-bold font-satoshi  text-sm leading-6 gap-2 flex items-center mr-2",
          {
            "black-300": !isLast,
            "black-100": isLast,
          }
        );
        return !isLast ? (
          <span  key={crumb.text} className={crumbStyle}> {crumb.text}
          {isLast && <ChevronRightIcon size="18" />}
          </span>
        ) : (
          <Link key={crumb.text} href={crumb.href} className={crumbStyle}>
            {crumb.text}
            {isLast && <ChevronRightIcon size="18" />}
          </Link>
        );
      })}
    </nav>
  );
};
