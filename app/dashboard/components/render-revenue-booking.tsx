import React from "react";
import RevenueChart from "./revenue-chart";

import { getMonthlyRevenue } from "@/actions/get-bookings";


export const RenderRevenueBooking = async () => {
  const result = getMonthlyRevenue()
  const [monthlyRevenue] = await Promise.all([result])

  return (
    <div className="grid grid-cols-12 gap-x-6 mt-6">
      <RevenueChart monthlyRevenue={monthlyRevenue} />
    </div>
  );
};
