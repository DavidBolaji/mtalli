
import { getBooking } from "@/actions/get-bookings";
import EventCard from "@/components/card/event-card";
import React from "react";
import Success from "../component/success";
import SuccessFooter from "../component/success-footer";


export const revalidate = 0;

interface CustomerPageSearchParams {
    params: { bookingId: string };
    searchParams: { [key: string]: string | undefined };
}

export default async function BookingSuccessPage({
    params,
}: CustomerPageSearchParams) {
    const bookingId = params.bookingId;
    const bookingRequest = getBooking(bookingId);

    // Await both requests
    const [booking] = await Promise.all([
        bookingRequest
    ]);


    return (
        <div className="relative md:px-0 px-6 w-full container max-w-2xl mx-auto mt-14 pb-32">
          <Success />

            <EventCard
                guestCount={booking?.bookingCount || 0}
                thumbnailUrl={booking?.events?.images[0].url || ""}
                startDate={booking?.events?.startDate || new Date()}
                endDate={booking?.events?.endDate || new Date()}
                tripName={booking?.events?.title || ""}
                basePrice={booking?.totalPrice || 0}
            />

           <SuccessFooter />
        </div>
    );
}
