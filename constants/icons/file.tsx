import React from "react";

export const FileIcon: React.FC<{ size?: string; color?: string }> = ({
  size = "16",
  color = "#23342A",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.66669 1.33325H4.00002C3.6464 1.33325 3.30726 1.47373 3.05721 1.72378C2.80716 1.97382 2.66669 2.31296 2.66669 2.66659V13.3333C2.66669 13.6869 2.80716 14.026 3.05721 14.2761C3.30726 14.5261 3.6464 14.6666 4.00002 14.6666H12C12.3536 14.6666 12.6928 14.5261 12.9428 14.2761C13.1929 14.026 13.3334 13.6869 13.3334 13.3333V5.99992L8.66669 1.33325Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.66669 1.33325V5.99992H13.3334"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
