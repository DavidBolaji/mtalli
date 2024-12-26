import React from "react";

export const ShoppingCartIcon: React.FC<{ size?: string, color?: string  }> = ({ size = '24', color = "#23342A" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 20C9.55228 20 10 19.5523 10 19C10 18.4477 9.55228 18 9 18C8.44772 18 8 18.4477 8 19C8 19.5523 8.44772 20 9 20Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 20C18.5523 20 19 19.5523 19 19C19 18.4477 18.5523 18 18 18C17.4477 18 17 18.4477 17 19C17 19.5523 17.4477 20 18 20Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3H6.27273L8.46545 14.6044C8.54027 15.0034 8.7452 15.3618 9.04436 15.6169C9.34351 15.872 9.71784 16.0075 10.1018 15.9997H18.0545C18.4385 16.0075 18.8129 15.872 19.112 15.6169C19.4112 15.3618 19.6161 15.0034 19.6909 14.6044L21 7.33323H7.09091"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
