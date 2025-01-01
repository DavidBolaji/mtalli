import React from "react";

import { ISingleBooking } from "@/actions/get-bookings";
import { SideCards } from "@/app/dashboard/components/side-cards";
import EventCard from "@/components/card/event-card";
import { Typography } from "@/components/typography/typography";
import { formatToNaira } from "@/utils/helper";


export const BookingComponent = async ({
  booking
}: {
  booking: ISingleBooking;
}) => {


  return (
    <div className="">
      <div className="col-span-12 my-6 mx-4">
        <SideCards
          title="Event Details"
          filter={null}
          body={
            <div className="space-y-3">
              <EventCard
                key={booking?.id}
                thumbnailUrl={booking?.events?.images[0].url as string}
                tripName={booking?.events?.title as string}
                startDate={booking?.events?.startDate as Date}
                endDate={booking?.events?.endDate as Date}
                basePrice={booking?.events?.price || 0}
                guestCount={booking?.bookingCount || 0}
              />
              <div className="grid grid-cols-12">
                <div className="col-span-6 space-y-3">
                  <div>
                    <Typography
                      as="p"
                      size="s2"
                      align="left"
                      className="black-200 text-sm font-medium font-onest"
                    >
                      Booked by
                    </Typography>
                    <Typography
                      as="p"
                      size="s2"
                      align="left"
                      className="black-100 font-onest text-base font-normal"
                    >
                      {booking?.User?.fname} {booking?.User?.lname}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      as="p"
                      size="s2"
                      align="left"
                      className="black-200 text-sm font-medium font-onest"
                    >
                      Contact phone number
                    </Typography>
                    <Typography
                      as="p"
                      size="s2"
                      align="left"
                      className="black-100 font-onest text-base font-normal"
                    >
                      {booking?.User?.phone || "-"}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      as="p"
                      size="s2"
                      align="left"
                      className="black-200 text-sm font-medium font-onest"
                    >
                      Total amount paid
                    </Typography>
                    <Typography
                      as="p"
                      size="s2"
                      align="left"
                      className="black-100 font-onest text-base font-normal"
                    >
                      {formatToNaira(booking?.totalPrice || 0)}
                    </Typography>
                  </div>
                </div>
                <div className="col-span-6 space-y-3">
                  <div>
                    <Typography
                      as="p"
                      size="s2"
                      align="left"
                      className="black-200 text-sm font-medium font-onest"
                    >
                      No of guests
                    </Typography>
                    <Typography
                      as="p"
                      size="s2"
                      align="left"
                       className="black-100 font-onest text-base font-normal"
                    >
                      {booking?.bookingCount}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      as="p"
                      size="s2"
                      align="left"
                      className="black-200 text-sm font-medium font-onest"
                    >
                      Contact email
                    </Typography>
                    <Typography
                      as="p"
                      size="s2"
                      align="left"
                       className="black-100 font-onest text-base font-normal"
                    >
                      {booking?.User?.email}
                    </Typography>
                  </div>
                <div>
                  <Typography
                    as="p"
                    size="s2"
                    align="left"
                    className="black-200 text-sm font-medium font-onest"
                  >
                    Service fees
                  </Typography>
                  <Typography
                    as="p"
                    size="s2"
                    align="left"
                    className="black-100 font-onest text-base font-normal"
                  >
                    {formatToNaira(booking?.events?.serviceFee || 0)}
                  </Typography>
                </div>
                </div>

              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};
