import { Typography } from "@/components/typography/typography";
import React from "react";
import { IPromotion } from "./types";
import EventCard from "@/components/card/event-card";

export const PromotionProduct: React.FC<{
  item: IPromotion;
}> = ({ item }) => {

  return (
    <div className="bg-white px-4 py-6 rounded-2xl border-[#DDEEE5]">
      <Typography as="p" size="s1" align="left" className="mb-[14px] black-100 text-sm font-bold">
        Promotion Events
      </Typography>

      <>
        {item?.event?.map((event) => (
          <EventCard
            key={event.id}
            thumbnailUrl={event?.images[0].url || ""}
            startDate={event?.startDate || new Date()}
            endDate={event?.endDate || new Date()}
            tripName={event?.title || ""}
            basePrice={event?.price || 0}
          />
        ))}
      </>

    </div>
  );
};
