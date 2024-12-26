
import { getEvent } from "@/actions/get-events";
import AddEvent from "@/app/dashboard/components/add-event";
import { Crumb } from "@/components/crumb/crumb";

import React from "react";

export const revalidate = 0;

interface CustomerPageSearchParams {
    params: { eventId: string };
    searchParams: { [key: string]: string | undefined };
}

export default async function EventEditPage({
    params,
    searchParams,
}: CustomerPageSearchParams) {
    const eventId = params.eventId;
    const eventRequest = getEvent(eventId);
    console.log(searchParams)

    // Await both requests
    const [event] = await Promise.all([
        eventRequest
    ]);


    return (
        <div className="p-4">
            <div>
                <Crumb
                    crumbData={[
                        {
                            text: "Dashboard",
                            href: "/",
                        },
                        {
                            text: "Event",
                            href: "/dashboard/events",
                        },
                        {
                            text: "Edit Event",
                            href: "",
                        }
                    ]}
                />
            </div>
            <AddEvent event={event ?? null} />
        </div>
    );
}
