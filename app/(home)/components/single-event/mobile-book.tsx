"use client"
import { getEvent } from '@/actions/get-events'
import { Button } from '@/components/button/button'
import { IEvent } from '@/components/table/event-table/types'
import { useBookDrawer } from '@/hooks/use-book-drawer'
import { useOverlay } from '@/hooks/use-overlay'
import { formatToNaira } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'
import { FormattedMessage } from 'react-intl'

const MobileBook = () => {
    const params = useParams()
    const { toggleOverlay } = useOverlay()
    const { toggleDrawer } = useBookDrawer()

    const handleBook = () => {
        toggleOverlay(true)
        toggleDrawer(true)
    }

    const { data } = useQuery({
        queryKey: ['event', params?.eventId],
        queryFn: async () => await getEvent(params?.eventId as string) as IEvent,
        enabled: !!params.eventId
    })

    return (
        <div className='sticky flex justify-between bottom-0 h-20 w-full lg:hidden bg-white shadow-lg border-t border-[#ABD0E4] px-4 py-5 rounded-t-3xl'>
            <div>
                <h3 className='font-onest font-bold text-xl black-100  tracking-wider'>{formatToNaira(data?.price as number)}</h3>
                <p className='font-onest black-200 font-medium text-xs'>
                    <FormattedMessage id="eventCardPrice" />
                </p>
            </div>
            <div>
                <Button color='dark' size='lg' className='px-20' onClick={handleBook}>
                    <FormattedMessage id="Book" />
                </Button>
            </div>
        </div>
    )
}

export default MobileBook
