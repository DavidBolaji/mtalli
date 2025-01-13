import SafeHTML from '@/app/dashboard/components/safe-html'
import { IEvent } from '@/components/table/event-table/types'
import { Typography } from '@/components/typography/typography'
import { formatDateRange } from '@/utils/helper'
import React from 'react'

const EventDetails = ({ event }: { event?: IEvent | null }) => {
    return (
        <div>
            <Typography align="left" size="h4" as="h4" className="font-extrabold text-2xl leading-snug mb-5 block md:hidden">
                    {event?.title}
                </Typography>
            <Typography align='left' size='h5' as='h5' className='font-bold text-xl pb-4 border-b border-[#ABD0E4]'>
                {event?.leftSlot} Slots Available
            </Typography>
            <div>
                <Typography align='left' size='h5' as='h5' className='font-medium font-onest black-100 text-xl pt-4 '>
                    Location
                </Typography>

                <Typography align='left' size='h5' as='h5' className='font-normal font-onest text-lg black-200 pb-4 border-b border-[#ABD0E4]'>
                    {event?.location}
                </Typography>
            </div>
            <div>
                <Typography align='left' size='h5' as='h5' className='font-medium font-onest black-100 text-xl pt-4 '>
                    Date
                </Typography>

                <Typography align='left' size='h5' as='h5' className='font-normal font-onest text-lg black-200 pb-4'>
                    {formatDateRange(event?.startDate, event?.endDate)}
                </Typography>
            </div>
            <div>
                <div className='bg-black-400 rounded-xl black-100 p-4 font-onest font-semibold'>
                    Important Information
                </div>
                <div className='p-4'>
                    <SafeHTML content={event?.info ?? ""} />
                </div>
            </div>
            <div>
                <div className='bg-black-400 rounded-xl black-100 p-4 font-onest font-semibold'>
                    Travel Rules
                </div>
                <div className='p-4'>
                    <SafeHTML content={event?.rules ?? ""} />
                </div>
            </div>
            <div className='lg:mb-20'>
                <div className='bg-black-400 rounded-xl black-100  p-4 font-onest font-semibold'>
                    Cancellation Policy
                </div>
                <div className='p-4'>
                    <SafeHTML content={event?.policy ?? ""} />
                </div>
            </div>
        </div>
    )
}

export default EventDetails
