// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Crumb } from "@/components/crumb/crumb";

import React from "react";
import ViewOrder from "./components/view-booking";
import { getSinglebooking, ISingleBooking } from "@/actions/get-bookings";
import { BookingComponent } from "./components/booking-component";


export const revalidate = 0;

interface BookingPageSearchParams {
  params: { bookingId: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function BookingPage({
  params,
}: BookingPageSearchParams) {
  const bookingId = params.bookingId;

  const booking = await getSinglebooking(bookingId) as ISingleBooking;
  const user = booking?.User?.fname?.length ? `${booking?.User?.fname} ${booking?.User?.lname}` : booking?.User?.email

  return (
    <div>
      <div className="p-4">
        <Crumb
          crumbData={[
            {
              text: "Dashboard",
              href: "/dashboard",
            },
            {
              text: "Bookings",
              href: "/dashboard/bookings",
            },
            {
              text: user || "",
              href: "",
            },
          ]}
        />
      </div>
      <div className="px-4">
        <ViewOrder booking={booking} />
      </div>
      <BookingComponent booking={booking} />
    </div>
  );
}
