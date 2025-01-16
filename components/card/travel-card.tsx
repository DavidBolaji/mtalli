'use client'

import * as React from "react"
import Image, { StaticImageData } from "next/image"
import { ChevronLeft, ChevronRight, HeartIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import useEmblaCarousel from "embla-carousel-react"
import { useRouter } from "next/navigation"
import { useBookmark } from "@/hooks/use-bookmark"
import { FormattedMessage } from "react-intl"
import { formatToNaira } from "@/utils/helper"

interface TravelCardProps {
  id?: string;
  images?: (string | StaticImageData)[]
  title?: string
  slots?: number
  startDate?: Date
  endDate?: Date
  price?: number
  discount?: number
  currency?: string
  className?: string
}

export default function TravelCard({
  id,
  images = [],
  title = "Travel Package",
  slots = 0,
  startDate = new Date(),
  endDate = new Date(),
  price = 0,
  discount,
  // currency = "₦",
  className,
}: TravelCardProps) {
  const { isBookmarked, addEvent, deleteEvent } = useBookmark()
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const router = useRouter();

  React.useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentSlide(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date)
  }


  const defaultImages = ["/placeholder.svg?height=300&width=400"]
  const displayImages = images.length > 0 ? images : defaultImages

  const handleClick = () => {
    router.push(`/event/${id}`)
  }

  React.useEffect(() => {
    router.prefetch(`/event/${id}`)
  }, [id])

  return (
    <Card className={cn("w-full overflow-hidden h-[376px] border-0 shadow-none", className)}>
      <CardHeader className="p-0 relative group">
        {discount && discount > 0 ? (
          <Badge variant="secondary" className="absolute top-6 left-3 z-10 bg-yellow-100 font-onest rounded-full">
            {discount}
          </Badge>
        ) : null}
        <div className="relative" ref={emblaRef}>
          <div className="flex">
            {displayImages.map((image, index) => (
              <div key={index} className="relative flex-[0_0_100%]">
                <div className="relative  h-[226px]
                    w-full">
                  <Image
                    src={image}
                    alt={`${title} image ${index + 1}`}
                    fill
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {displayImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  currentSlide === index ? "bg-white" : "bg-white/50"
                )}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-2 top-1/2 rounded-full -translate-y-1/2 bg-white backdrop-blur-sm hover:bg-white/90"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 rounded-full -translate-y-1/2 bg-white backdrop-blur-sm hover:bg-white/90"
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          onClick={() => {
            if(!id) return;
            console.log('passed')
            console.log(isBookmarked(id))
            if(!isBookmarked(id)) return addEvent({ id })
              deleteEvent(id)
          }}
          className="absolute top-3 right-4 cursor-pointer z-10 backdrop-blur-sm">

          <HeartIcon
            className={cn(
              "transition-colors w-7 h-6 stroke-8",
              isBookmarked(id ? id: "") ? "fill-red-500 stroke-red-500" : "stroke-[#ABD0E4] fill-white"
            )}

          />
        </div>
      </CardHeader>
      <CardContent onClick={handleClick} className="px-0 pt-1 cursor-pointer">
        <h2 className="text-sm font-bold mb-2 font-onest black-100 text-nowrap w-56 truncate text-ellipsis">{title}</h2>
        <p className="text-sm black-200 font-medium font-onest mb-2">
          {slots} <FormattedMessage id="eventCardPara" />
        </p>
        <p className="text-sm text-muted-foreground black-200 font-medium font-onest">
          {formatDate(startDate)} - {formatDate(endDate)}
        </p>
      </CardContent>
      <CardFooter className="px-0 pt-0 -mt-4">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-xl black-100 font-bold">{formatToNaira(price)}</span>
            <span className="text-[13.5px] black-200 font-onest font-medium">
            <FormattedMessage id="eventCardPrice" />
            </span>
          </div>
          {/* {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {currency}{formatPrice(originalPrice)}
            </span>
          )} */}
        </div>
      </CardFooter>
    </Card>
  )
}

