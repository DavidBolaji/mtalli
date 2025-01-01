
import EventCard from "@/components/card/event-card";
import { EmptyCart } from "@/components/empty/empty-cart";
import { IEvent } from "@/components/table/event-table/types";

import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export const SelectPromotionType = () => {
  const queryClient = useQueryClient();


  const getRender = () => {
    const catData = queryClient.getQueryData(["SELECT_ITEM"]) as (IEvent & {
      weight: number;
    })[];

    return catData?.length ? (
      catData?.map((d) => {
        return (
          <div key={d.id} className="mt-6">
            <EventCard 
            //  guestCount={booking?.bookingCount || 0}
             thumbnailUrl={d?.images[0].url || ""}
             startDate={d?.startDate || new Date()}
             endDate={d?.endDate || new Date()}
             tripName={d?.title || ""}
             basePrice={d?.price || 0}
             dash
            />
           
          </div>
        );
      })
    ) : (
      <EmptyCart
        promotion="Select promotion type"
        close={() => {}}
        dashboard
      />
    );
  };
  return getRender();
};
