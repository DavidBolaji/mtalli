
import { getBooking } from "@/actions/get-bookings";
import EventCard from "@/components/card/event-card";
import React from "react";


export const revalidate = 0;

interface CustomerPageSearchParams {
    params: { bookingId: string };
    searchParams: { [key: string]: string | undefined };
}

const nextText = [
    {
        title: "Prepare for Your Trip:",
        text: "Check your email for booking details, itinerary, and any special instructions"
    },
    {
        title: "Stay Updated:",
        text: "We’ll send reminders and any important updates as your experience date approaches"
    },
    {
        title: "Need Assistance?:",
        text: "Our support team is here for you! Feel free to reach out if you have any questions"
    }
]

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
            <h3 className="text-center font-onest font-medium lg:text-5xl text-2xl black-100 mb-10">Booking Confirmed! 🎉</h3>

            <EventCard
                guestCount={booking?.bookingCount || 0}
                thumbnailUrl={booking?.events?.images[0].url || ""}
                startDate={booking?.events?.startDate || new Date()}
                endDate={booking?.events?.endDate || new Date()}
                tripName={booking?.events?.title || ""}
                basePrice={booking?.totalPrice || 0}
            />

            <p className="font-onest text-base black-100 leading-8 py-[26px] border-b border-[#ABD0E4]">Your adventure awaits! We&apos;ve successfully reserved your spot, and all the details are set. Look out for a confirmation email with everything you need to know about your upcoming experience.</p>

            <h6 className=" font-onest font-bold text-xl black-100 py-[26px]">
                What&apos;s Next?
            </h6>

            <ul className="border-b border-[#ABD0E4] font-normal pb-[26px]">
                {nextText.map(el => (
                    <li key={el.title}>
                        <span className="font-bold font-onest text-base mr-2 ">{el.title}</span>
                        {el.text}
                    </li>
                ))}
            </ul>

            <span className="pt-[26px] font-onest font-medium text-base inline-block">
                Thank you for choosing us for your adventure - get ready to make unforgettable memories!
            </span>
        </div>
    );
}
