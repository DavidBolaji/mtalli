
import { getEvent } from "@/actions/get-events";
import BookmarkEvent from "@/app/(home)/components/single-event/bookmark-event";
import ViewEvent from "@/app/(home)/components/single-event/view-event";
import { Typography } from "@/components/typography/typography";
import React from "react";

export const revalidate = 0;

interface CustomerPageSearchParams {
    params: { eventId: string };
    searchParams: { [key: string]: string | undefined };
}

export default async function EventEditPage({
    params,
}: CustomerPageSearchParams) {
    const eventId = params.eventId;
    const eventRequest = getEvent(eventId);

    // Await both requests
    const [event] = await Promise.all([
        eventRequest
    ]);


    return (
        <div className="relative">
            <div className="hidden justify-between items-center md:flex mt-12 px-4 sm:px-6 lg:px-20">
                <Typography align="left" size="h4" as="h4" className="font-extrabold mb-8">
                    {event?.title}
                </Typography>
                <BookmarkEvent />
            </div>
            <ViewEvent event={event} />
            
        </div>
    );
}
