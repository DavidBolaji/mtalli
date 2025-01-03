// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { RenderDashboardcards } from "@/app/dashboard/components/render-dashboard-cards";
import React from "react";
import { CustomerDetailDisplay } from "./customer-detail-display";
import { isWithinInterval } from "date-fns";
import { renderCustomerCard } from "@/utils/data";



export const DetailComponent = async ({
  data,
}: {
  data: any;
}) => {
  const totalOrders = data?.bookings.length ?? 0;
  const totalProcessing = data?.bookings.filter((booking: any) =>
    isWithinInterval(new Date(), {
      start: new Date(booking.events?.startDate || ""),
      end: new Date(booking.events?.endDate || ""),
    })
  ).length ?? 0;

  const totalAmount =
    data?.bookings.reduce((acc: any, cur: any) => (acc += cur.totalPrice), 0) ?? 0;

  const res = renderCustomerCard({
    totalAmount,
    totalProcessing: totalProcessing,
    totalOrders,
  });

  return (
    <div className="mt-6">
      <RenderDashboardcards data={res} dash={false} />
      <div className="grid grid-cols-10 gap-x-6">
        <div className="col-span-10">
          <CustomerDetailDisplay
            user={{
              fname: data?.fname as string,
              lname: data?.lname as string,
              email: data?.email as string,
              phone: data?.phone as string,
            }}
          />
        </div>
      </div>
    </div>
  );
};
