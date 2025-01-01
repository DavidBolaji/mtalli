"use client";

import { ISingleBooking } from "@/actions/get-bookings";
import { Button } from "@/components/button/button";
import { Spinner } from "@/components/spinner";
import { useBooking } from "@/hooks/use-booking";

import { Grid } from "antd";
const { useBreakpoint } = Grid;

export default function ViewOrder({ booking }: { booking: ISingleBooking }) {
  const screen = useBreakpoint();
  const { updateBooking, load } = useBooking()
  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      {/* Header */}
      <div className="flex lg:flex-row flex-col lg:items-center justify-between mb-8 bg-white px-4 py-[19px] rounded-2xl border border-[#DDEEE5]">
        <h1 className="text-2xl font-semibold text-left lg:mb-0 mb-4 font-onest">
          Booking {booking?.events?.title}
        </h1>
        <div className="flex gap-3">
          <Button size="lg" color="light" className="h-9 border red-100 border-[#E83B3B] font-onest flex items-center justify-center text-sm"
            onClick={() => updateBooking({ status: "CANCELLED" })}
          >
            {screen.lg ? load ? <Spinner /> : "Cancel Booking" : load ? <Spinner /> : "Cancel"}
          </Button>
        </div>
      </div>
    </div>
  );
}
