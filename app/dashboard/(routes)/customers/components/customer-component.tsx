// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from "react";
import { SelectedCustomerButtons } from "./select-customer-buttons";
import { IUser } from "@/actions/get-customers";
import { Category } from "@prisma/client";
import { DetailComponent } from "./detail-section/detail-component";
import CustomerOrdersTable from "@/components/table/customer-order-table/customer-orders-table";
import EventCard from "@/components/card/event-card";

interface ICustomerComponent {
  customerName: string;
  customer: IUser | null;
  searchParams: { [key: string]: string | undefined };
  totalPages: number;
  data: any
}

export const CustomerComponent: React.FC<ICustomerComponent> = ({
  customerName,
  customer,
  searchParams,
  totalPages,
  data
}) => {
  const page = parseInt(searchParams?.page as string) || 1;
  const limit = parseInt(searchParams?.limit as string) || 10;

  return (
    <div className="">
      <div className="md:my-0 my-6 ml-0.5 lg:px-0 overflow-x-scroll scrollbar-hide">
        <SelectedCustomerButtons
          customers={[
            { name: "Details", id: "details", key: customer?.id },
            { name: "Booking History", id: "order", key: customer?.id },
          ]}
          initialCustomerName={customerName}
        />
      </div>
      {customerName === "Details" ? (
        <DetailComponent customerId={customer?.id as string} data={data} />
      ) : (
        <div className="space-y-4 mt-8">
          {data?.bookings?.map((booking) => (
            <EventCard
              key={booking.events?.id}
              thumbnailUrl={booking?.events?.images[0]?.url}
              tripName={booking.events?.title}
              startDate={booking.events?.startDate || ""}
              endDate={booking.events?.endDate || ""}
              basePrice={booking.events?.price}
              guestCount={booking?.totalBookingCount}
            />
          ))}
        </div>
      )}
    </div>
  );
};
