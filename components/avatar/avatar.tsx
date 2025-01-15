import { UserIcon } from "@/constants/icons/user";
import classNames from "classnames";
import Image from "next/image";
import React from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size: "lg" | "sm";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size,
  alt,
  className,
}) => {
  const avatarClassnames = classNames(
    "rounded-full object-cover bg-orange-400",
    {
      "w-14 h-14": size === "lg",
      "w-10 h-10": size === "sm",
    },
    !src && "flex justify-center items-center",
    className
  );

  return src ? (
    <Image width={40} height={40} src={src} className={avatarClassnames} alt={alt ?? "avatar"} />
  ) : (
    <div className={avatarClassnames}>
      <UserIcon color="#ffffff" />
    </div>
  );
};
