"use client"
import React from 'react'
import { StyledMobileDrawer } from '../drawer.style'
import { useBookDrawer } from '@/hooks/use-book-drawer'
import { BookingCard } from '@/components/card/booking-card'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { IEvent } from '@/components/table/event-table/types'
import { useOverlay } from '@/hooks/use-overlay'

const BookDrawer = () => {
    const router = useRouter();
    const { bookDrawer, toggleDrawer } = useBookDrawer()
    const { toggleOverlay } = useOverlay()
    const params = useParams()
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey: ['event', params?.eventId],
        queryFn: () => queryClient.getQueryData(['event', params?.eventId]) as IEvent,
        enabled: !!params.eventId
    })
    return (
        <StyledMobileDrawer
            open={(bookDrawer as boolean) ?? false}
            onClose={() => {
                toggleDrawer(!bookDrawer)
                toggleOverlay(false)
            }}
            placement="bottom"
            height={"80%"}
            closeIcon={null}
            width={485}
            footer={null}
        >
            <BookingCard
                pricePerPerson={data?.price || 0}
                serviceFee={data?.serviceFee || 0}
                otherFee={0}
                serviceFeeTooltip="Service charge for booking experience"
                otherFeeTooltip="Additional fees and taxes"
                onBooking={(guests) => {
                    toggleDrawer(!bookDrawer)
                    toggleOverlay(false)
                    router.push(`/event/complete/${data?.id}?count=${guests}`)
                }}
                discount={data?.promotion[0]?.discount || 0}
                mobile
            />
        </StyledMobileDrawer>
    )
}

export default BookDrawer
