"use client"
import { IEvent } from '@/components/table/event-table/types'
import React from 'react'
import ImageGallery from './image-gallery'
import { BookingCard } from '@/components/card/booking-card'
import EventDetails from './event-details'
import { useRouter } from 'next/navigation'

const ViewEvent = ({ event }: { event?: IEvent | null }) => {
    const router = useRouter()
    return (
        <div className='px-0 relative'>
            <ImageGallery images={event?.images.map(el => el.url)} />
            <div className='grid lg:grid-cols-12 grid-cols-8 mt-10 px-4 sm:px-6 lg:px-20'>
                <div className='col-span-8 lg:pr-40'>
                    <EventDetails event={event} />
                </div>
                <div className='col-span-4 lg:block hidden'>
                    <BookingCard
                        pricePerPerson={event?.price || 0}
                        serviceFee={event?.serviceFee || 0}
                        otherFee={0}
                        serviceFeeTooltip="Service charge for booking experience"
                        otherFeeTooltip="Additional fees and taxes"
                        onBooking={(guests) => {
                            router.push(`/event/complete/${event?.id}?count=${guests}`)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ViewEvent
