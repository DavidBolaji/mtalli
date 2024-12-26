import classNames from "classnames";
import React, { HTMLAttributes, ReactNode } from "react";

type headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type texts = "c1" | "c2" | "s1" | "s2" | "b1" | "b2";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: headings | "p";
  size?: headings | texts;
  align?: "left" | "center" | "right";
  children: ReactNode;
  onClick?: () => void;
}

export const Typography: React.FC<TypographyProps> = ({
  as = "h4",
  size = "h4",
  align = "left",
  children,
  onClick,
  ...rest
}) => {
const HeadingTag = as;
  const headingClassnames = classNames("font-onest",
    {
      "text-h1": size === "h1",
      "text-h2": size === "h2",
      "text-h3": size === "h3",
      "text-h4": size === "h4",
      "text-h5": size === "h5",
      "text-h6": size === "h6",
      "text-s1": size === "s1",
      "text-s2": size === "s2",
      "text-b1": size === "b1",
      "text-b2": size === "b2",
      "text-c1": size === "c1",
      "text-c2": size === "c2",
    },
    {
      "text-left": align === "left",
      "text-center": align === "center",
      "text-right": align === "right",
    },
    rest.className,
  );

  return <HeadingTag className={headingClassnames} onClick={onClick}>{children}</HeadingTag>;
};
