'use client'

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { redirectProfile } from "@/actions/get-events";
import { useUser } from "@/hooks/use-user";

const commonLinks = [
    { name: 'Personal Details', key: 'details' },
    { name: 'Booking History', key: 'history' }
];

const commonLinks2 = [
    { name: 'Delete your account', key: 'delete' }
];

export default function ProfileCard({ mobile = false }: { mobile?: boolean }) {
    const searchParams = useSearchParams();
    const {user} = useUser()
    const active = searchParams.get("active") || "details";
    const router = useRouter()

    React.useEffect(() => {
        if(!user) return router.push("/")
    }, [user])

    return (
        <Card className={`w-full border rounded-2xl border-[#ABD0E4] ${mobile ? "w-full border-b-0 outline-0 shadow-none rounded-b-none" : "max-w-sm"}`}>
            <CardHeader className="flex flex-row items-center border-b border-[#ABD0E4] justify-between pb-2">
                <CardTitle className="text-2xl font-bold font-onest">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 mt-6 px-0">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs pl-6 black-200 uppercase font-bold font-onest">Personal Details</h3>
                    </div>

                    <div
                    >
                        <div className="space-y-1">
                            {commonLinks.map((destination) => (
                                <button
                                    key={destination.key}
                                    className={`flex pl-6 transition-colors duration-300 items-center w-full h-12 hover:bg-[#CCE2EE] hover:border-r-4 hover:border-[#4D7890] ${active === destination?.key ? "bg-black-400 border-r-4 border-[#4D7890]" : null}`}
                                    onClick={() => {
                                        const params = new URLSearchParams(searchParams);
                                        params.delete("active");
                                        redirectProfile(destination?.key as string)
                                    }}
                                >
                                    <label
                                        htmlFor={destination.key}
                                        className="text-base capitalize font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                                    >
                                        {destination.name.trim()}
                                    </label>

                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs pl-6 black-200 uppercase font-bold font-onest">Account management</h3>
                    <div
                    >
                        <div className="space-y-1">
                            {commonLinks2.map((destination) => (
                                <button
                                    key={destination.key}
                                    className={`flex pl-6 transition-colors duration-300 items-center w-full h-12 hover:bg-[#CCE2EE] hover:border-r-4 hover:border-[#4D7890] ${active === destination?.key ? "bg-black-400 border-r-4 border-[#4D7890]" : null}`}
                                    onClick={() => {
                                        const params = new URLSearchParams(searchParams);
                                        params.delete("active");
                                        redirectProfile(destination?.key as string)
                                    }}
                                >
                                    <label
                                        htmlFor={destination.key}
                                        className="text-base capitalize font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 red-100"
                                    >
                                        {destination.name.trim()}
                                    </label>

                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}

