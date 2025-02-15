import { Typography } from "@/components/typography/typography";
import React from "react";

export const CustomerDetailDisplay: React.FC<{
  user: { email: string; fname: string; lname: string; phone: string };
}> = ({ user }) => {
  return (
    <div className="bg-white px-4 py-6 rounded-2xl mt-6 border-[#DDEEE5]">
      <Typography as="p" size="s1" align="left" className="mb-[14px] text-sm black-100 font-onest font-normal">
        Customer Details
      </Typography>
      <div className="grid lg:grid-cols-12 grid-cols-6 lg:space-y-0 space-y-4 mb-2">
        <div className="col-span-6">
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-300 font-onest text-sm font-bold"
          >
            Email Address
          </Typography>
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-100 font-onest text-base font-normal"
          >
            {user.email}
          </Typography>
        </div>
        <div className="col-span-6 lg:mb-5">
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-300"
          >
            Phone number
          </Typography>
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-100 font-onest text-base font-normal"
          >
            {user.phone ?? "-"}
          </Typography>
        </div>
      </div>
      <div className="grid lg:grid-cols-12 grid-cols-6 lg:space-y-0 space-y-4">
        <div className="col-span-6">
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-300 font-onest text-sm font-bold"
          >
            First name
          </Typography>
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-100 font-onest text-base font-normal"
          >
            {user.fname ?? "-"}
          </Typography>
        </div>
        <div className="col-span-6">
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-300 font-onest text-sm font-bold"
          >
            Last name
          </Typography>
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-100 font-onest text-base font-normal"
          >
            {user.lname ?? "-"}
          </Typography>
        </div>
      </div>
    </div>
  );
};
