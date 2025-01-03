import ProfileCard from "@/components/card/profile-card/profile-card";
import React from "react";
import ProfileDetail from "./components/profile-detail";
import DeleteAccount from "./components/delete-account";
import ProfileBookingHistory from "./components/profile-booking-history";
import { CollapsibleProfileNav } from "./components/collapsible-profile";
export const revalidate = 0;

interface SearchPageSearchParams {
    searchParams: { [key: string]: string | undefined };
}

export default async function SearchPage({
    searchParams,
}: SearchPageSearchParams) {
    const active = searchParams.active || "details";

    return (
        <div>
            <CollapsibleProfileNav />
            <div className="relative grid grid-cols-12 gap-x-6 max-w-6xl mx-auto mt-8 md:px-0 px-4">
                <div className="col-span-4 lg:block hidden">
                    <ProfileCard />
                </div>
                <div className="lg:col-span-8 col-span-12 ">
                    {active === "details" ? <ProfileDetail />: null}
                    {active === "history" ? <ProfileBookingHistory />: null}
                    {active === "delete" ? <DeleteAccount />: null}
                </div>
            </div>
        </div>
    );
}
