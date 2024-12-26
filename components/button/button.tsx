import classNames from "classnames";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: "sm" | "lg";
  color: "dark" | "light";
  iconL?: React.ComponentType<{ size?: string, color?: string }>; // Make `size` optional
  iconR?: React.ComponentType<{ size?: string, color?: string }>;
  children: ReactNode;
  round?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  size = "lg",
  color = "dark",
  iconL: IconL,
  iconR: IconR,
  children,
  round = true,
  ...rest
}) => {
  const { className, ...props } = rest;

  const buttonClassnames = classNames(
    "font-onest text-s2 text-center py-2 font-medium h-12 text-nowrap",
    {
      "px-6": size === "lg",
      "px-3": size === "sm",
    },
    {
      "rounded-full": round,
      "rounded-2xl": !round,
    },
    {
      "bg-black-100 text-white": color === "dark",
      "bg-white black-100 border border-black-100": color === "light",
    },
    IconL || IconR ? "gap-2 flex items-center" : null, // Add flex layout and gap if there's an icon
    "md:px-6 px-3",
    className,
  );

  return (
    <button className={buttonClassnames} {...props}>
      {/* Render icon on the left or both positions */}
      { IconL && (
        <IconL size={size === "lg" ? "24px" : "16px"} color={color === "light" ? undefined: "#ffffff"} />
      )}
      {children}
      {/* Render icon on the right or both positions */}
      {IconR && (
        <IconR size={size === "lg" ? "24px" : "16px"} color={color === "light" ? undefined: "#ffffff"} />
      )}
    </button>
  );
};
