import React from "react";

export const PieChartIcon: React.FC<{ size?: string; color?: string }> = ({
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
      <g clipPath="url(#clip0_85_1246)">
        <path
          d="M14.14 10.5934C13.7159 11.5964 13.0525 12.4802 12.2079 13.1676C11.3633 13.855 10.3632 14.325 9.29496 14.5366C8.22674 14.7481 7.12295 14.6948 6.0801 14.3813C5.03725 14.0677 4.08709 13.5034 3.31268 12.7378C2.53828 11.9722 1.96321 11.0286 1.63776 9.98935C1.31231 8.95015 1.24638 7.84704 1.44574 6.77647C1.64509 5.70591 2.10367 4.70047 2.78137 3.84807C3.45907 2.99567 4.33526 2.32226 5.33334 1.88672"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.6667 7.99992C14.6667 7.12444 14.4942 6.25753 14.1592 5.4487C13.8242 4.63986 13.3331 3.90493 12.714 3.28587C12.095 2.66682 11.3601 2.17575 10.5512 1.84072C9.74239 1.50569 8.87548 1.33325 8 1.33325V7.99992H14.6667Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_85_1246">
          <rect width={size} height={size} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
