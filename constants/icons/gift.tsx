import React from "react";

export const GiftIcon: React.FC<{ size?: string; color?: string }> = ({
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
      <g clipPath="url(#clip0_85_1267)">
        <path
          d="M13.3334 8V14.6667H2.66669V8"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.6666 4.66675H1.33331V8.00008H14.6666V4.66675Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 14.6667V4.66675"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.99998 4.66659H4.99998C4.55795 4.66659 4.13403 4.49099 3.82147 4.17843C3.50891 3.86587 3.33331 3.44195 3.33331 2.99992C3.33331 2.55789 3.50891 2.13397 3.82147 1.82141C4.13403 1.50885 4.55795 1.33325 4.99998 1.33325C7.33331 1.33325 7.99998 4.66659 7.99998 4.66659Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 4.66659H11C11.442 4.66659 11.866 4.49099 12.1785 4.17843C12.4911 3.86587 12.6667 3.44195 12.6667 2.99992C12.6667 2.55789 12.4911 2.13397 12.1785 1.82141C11.866 1.50885 11.442 1.33325 11 1.33325C8.66667 1.33325 8 4.66659 8 4.66659Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_85_1267">
          <rect width={size} height={size} fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
