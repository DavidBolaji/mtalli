"use client"
import { IEvent } from '@/components/table/event-table/types'
import { useBookmark } from '@/hooks/use-bookmark'
import { cn } from '@/lib/utils'
import { HeartIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

const BookmarkEvent = ({ event }: { event?: IEvent | null }) => {
    const { isBookmarked, addEvent, deleteEvent } = useBookmark()
    const params = useParams()


    return (
        <div
        onClick={() => {
            if(!params?.eventId) return;
            if(!isBookmarked(params?.eventId as string)) return addEvent({ id: params?.eventId as string })
              deleteEvent(params?.eventId as string)
          }}
            className="cursor-pointer z-10 backdrop-blur-sm">
            <HeartIcon
                className={cn(
                    "transition-colors w-10 h-8 stroke-8",
                    isBookmarked(params?.eventId as string) ? "fill-red-500 stroke-red-500" : "stroke-[#ABD0E4] fill-white"
                )}

            />
        </div>
    )
}

export default BookmarkEvent
