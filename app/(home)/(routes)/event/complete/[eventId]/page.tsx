import { getEvent } from "@/actions/get-events";
import { BookingConfirmation } from "../components/booking-confirmation";
import { redirect } from "next/navigation";


export const revalidate = 0;

interface ConfirmBookingPageSearchParams {
    params: { eventId: string };
    searchParams: { [key: string]: string | undefined };
}


export default async function ConfirmBookingPage({
    params,
    searchParams,
}: ConfirmBookingPageSearchParams) {
    const eventId = params.eventId;
    const event = await getEvent(eventId);
    const count = searchParams.count

    if(!event) redirect('/');
    
  return (
    <div className="p-6">
      <BookingConfirmation
        tripName={event?.title}
        startDate={event?.startDate}
        endDate={event?.endDate}
        basePrice={event?.price}
        guestCount={count ? +count : 1}
        serviceFee={event?.serviceFee}
        otherFee={0}
        thumbnailUrl={event.images[0].url}
      />
    </div>
  )
}

