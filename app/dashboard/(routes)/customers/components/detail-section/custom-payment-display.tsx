import { Typography } from "@/components/typography/typography";
import React from "react";

export const CustomerPaymentDisplay: React.FC<{
  order: { paymentType: string; phone: string };
}> = ({ order }) => {
  return (
    <div className="bg-white px-4 py-6 rounded-2xl mt-6 border-[#DDEEE5]">
      <Typography as="p" size="s1" align="left" className="mb-[14px] black-100">
        Payment Status
      </Typography>
      <div className="grid lg:grid-cols-12 grid-cols-6 lg:space-y-0 space-y-4 mb-2">
        <div className="col-span-6">
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-300"
          >
            Payment type
          </Typography>
          <Typography
            as="p"
            size="s2"
            align="left"
            className="black-100"
          >
            {order.paymentType}
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
            className="black-100"
          >
            {order.phone ?? "-"}
          </Typography>
        </div>
      </div>
    </div>
  );
};
