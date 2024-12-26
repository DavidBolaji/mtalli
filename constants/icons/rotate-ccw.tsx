import React from "react";

export const RotateCCWIcon: React.FC<{ size?: string, color?: string  }> = ({ size = '24', color = "#23342A" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5V10H8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25916 14.6584C5.84276 16.2943 6.94888 17.6985 8.41087 18.6596C9.87287 19.6206 11.6115 20.0864 13.3649 19.9868C15.1182 19.8871 16.7913 19.2274 18.132 18.107C19.4727 16.9867 20.4084 15.4663 20.7981 13.7751C21.1878 12.0839 21.0104 10.3134 20.2926 8.73046C19.5748 7.14748 18.3556 5.83775 16.8185 4.99861C15.2815 4.15947 13.51 3.83639 11.7708 4.07803C10.0317 4.31968 8.4192 5.11297 7.1763 6.33837L3 10.2139"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
