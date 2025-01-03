"use client"
import EventCard from '@/components/card/event-card'
import { useAxios } from '@/hooks/use-axios'
import { useQuery } from '@tanstack/react-query'
import { Empty } from 'antd'
import React from 'react'

type profileEvent = {
  events: {
    id: string;
    images: {
      id: string;
      url: string;
      createdAt: Date;
      updatedAt: Date;
      eventId: string;
    }[];
    title: string;
    startDate: Date;
    endDate: Date;
    totalSlots: number;
    price: number;
  } | null;
  id: string;
  createdAt: Date;
  orderNo: string;
  bookingCount: number;
}

const ProfileBookingHistory = () => {
  const Axios = useAxios()
  const { data: bookings } = useQuery({
    queryKey: ['MY_BOOKING'],
    queryFn: async () => {
      const res = await Axios.get('/booking')
      return res.data.bookings
    }
  })
  return (
    <div>
      <h1 className='font-onest text-2xl black-100 mb-6 font-normal'>
        Booking History
      </h1>
      <div className="space-y-4 mt-8">
        {bookings && bookings?.map((booking: profileEvent) => (
          <EventCard
            key={booking.events?.id}
            thumbnailUrl={booking?.events?.images[0]?.url as string}
            tripName={booking.events?.title as string}
            startDate={booking.events?.startDate as Date}
            endDate={booking.events?.endDate as Date}
            basePrice={booking.events?.price as number}
            guestCount={booking?.bookingCount}
          />
        ))}
        {!bookings?.length ? <Empty /> : null}
      </div>
    </div>
  )
}

export default ProfileBookingHistory
