"use client"
import { IEvent } from '@/components/table/event-table/types'
import { cn } from '@/lib/utils'
import { HeartIcon } from 'lucide-react'
import React from 'react'

const BookmarkEvent = ({ event }: { event?: IEvent | null }) => {
    const [liked, setLiked] = React.useState(false)

    return (
        <div
            onClick={() => setLiked(!liked)}
            className="cursor-pointer z-10 backdrop-blur-sm">
            <HeartIcon
                className={cn(
                    "transition-colors w-10 h-8 stroke-8",
                    liked ? "fill-red-500 stroke-red-500" : "stroke-[#ABD0E4] fill-white"
                )}

            />
        </div>
    )
}

export default BookmarkEvent
