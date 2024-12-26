import { Typography } from "@/components/typography/typography";
import React from "react";

export const CustomerDeliveryDetail: React.FC<{
  user: { country: string; state: string; city: string; address: string, info: string };
}> = ({ user }) => {
  return (
    <div className="bg-white px-4 py-6 rounded-2xl mt-6 border-[#DDEEE5]">
      <Typography as="p" size="s1" align="left" className="mb-[14px] black-100">
        Delivery Details
      </Typography>
      <div className="grid lg:grid-cols-12 grid-cols-6 lg:space-y-0 space-y-4 mb-2">
        <div className="col-span-6">
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-300"
          >
            Country
          </Typography>
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-100"
          >
            {user.country ?? "-"}
          </Typography>
        </div>
        <div className="col-span-6 lg:mb-5">
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-300"
          >
            State
          </Typography>
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-100"
          >
            {user.state ?? "-"}
          </Typography>
        </div>
      </div>
      <div className="grid lg:grid-cols-12 grid-cols-6 lg:space-y-0 space-y-4 mb-2">
        <div className="col-span-6">
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-300"
          >
            House number and street name
          </Typography>
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-100"
          >
            {user.address ?? "-"}
          </Typography>
        </div>
        <div className="col-span-6 lg:mb-5">
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-300"
          >
            Town/City
          </Typography>
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-100"
          >
            {user.city ?? "-"}
          </Typography>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <Typography
            as="p"
            size="s2"
            align="left"
            className="mb-2 black-300"
          >
            Additional information about the delivery
          </Typography>
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-100"
          >
            {user.info ?? "-"}
          </Typography>
        </div>
      </div>
    </div>
  );
};
