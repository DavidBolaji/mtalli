import React from "react";

export const TagIcon: React.FC<{ size?: string; color?: string }> = ({
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
      <g clipPath="url(#clip0_85_1222)">
        <path
          d="M13.7266 8.93992L8.94665 13.7199C8.82282 13.8439 8.67576 13.9422 8.5139 14.0093C8.35204 14.0764 8.17853 14.111 8.00331 14.111C7.82809 14.111 7.65459 14.0764 7.49273 14.0093C7.33086 13.9422 7.18381 13.8439 7.05998 13.7199L1.33331 7.99992V1.33325H7.99998L13.7266 7.05992C13.975 7.30973 14.1144 7.64767 14.1144 7.99992C14.1144 8.35217 13.975 8.6901 13.7266 8.93992Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.66669 4.66675H4.67335"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_85_1222">
          <rect width={size} height={size} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};


