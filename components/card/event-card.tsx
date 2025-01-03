import React from 'react'
import { Card, CardHeader } from '../ui/card'
import Image from 'next/image'
import { formatDateRange } from '@/utils/helper'

interface EventCardProps {
    tripName: string
    startDate: Date
    endDate: Date
    basePrice: number
    guestCount?: number
    thumbnailUrl: string
    dash?: boolean
}


const EventCard = ({ thumbnailUrl, tripName, startDate, endDate, basePrice, guestCount, dash = false }: EventCardProps) => {
    return (
        <Card className={`border border-[#ABD0E4] rounded-[32px] ${dash ? "" : "mb-10"}`}>
            <CardHeader className="p-2">
                <div className="flex gap-4 items-center">
                    <Image
                        src={thumbnailUrl}
                        alt={tripName}
                        width={140}
                        height={140}
                        className="rounded-3xl object-cover"
                    />
                    <div className="space-y-1">
                        <h2 className="font-onest text-sm font-bold black-100 mb-2">{tripName}</h2>
                        <p className="text-sm black-200 font-medium font-onest mb-2">
                            {formatDateRange(startDate, endDate)}
                        </p>
                        <p className="font-onest font-bold text-xl">
                            ₦{basePrice.toLocaleString()} 
                           {guestCount && guestCount > 0 ?<span className='text-xs black-200 font-onest ml-1'>({guestCount} slot booked)</span>: null}
                        </p>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export default EventCard
