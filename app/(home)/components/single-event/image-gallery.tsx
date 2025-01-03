'use client'

import * as React from "react"
import Image, { StaticImageData } from "next/image"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from "embla-carousel-react"

interface ImageGalleryProps {
  images?: (string | StaticImageData)[]
  title?: string
  className?: string
}

export default function ImageGallery({
  images = [],
  title = "Gallery",
  className
}: ImageGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const defaultImages = ["/placeholder.svg?height=300&width=400"]
  const displayImages = images.length > 0 ? images : defaultImages

  React.useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentSlide(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  const renderDesktopImages = () => {
    if (displayImages.length === 1) {
      return (
        <div className="relative h-[300px] w-full">
          <Image
            src={displayImages[0]}
            alt={`${title} image`}
            fill
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )
    } else if (displayImages.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {displayImages.map((image, index) => (
            <div key={index} className="relative h-[300px] w-full">
              <Image
                src={image}
                alt={`${title} image ${index + 1}`}
                fill
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>
      )
    } else if (displayImages.length === 3 || displayImages.length === 4) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {displayImages.map((image, index) => (
            <div key={index} className="relative h-[150px] w-full">
              <Image
                src={image}
                alt={`${title} image ${index + 1}`}
                fill
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div className="grid grid-cols-12 gap-4 h-[600px]">
        {/* Large left image */}
        <div className="col-span-6 relative rounded-lg overflow-hidden">
          <Image
            src={displayImages[0]}
            alt={`${title} image 1`}
            fill
            className="object-cover"
          />
        </div>
  
        {/* Right side grid */}
        <div className="col-span-6 grid grid-rows-2 gap-4">
          {/* Top row */}
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-5 relative rounded-lg overflow-hidden">
              <Image
                src={displayImages[1]}
                alt={`${title} image 2`}
                fill
                className="object-cover"
              />
            </div>
            <div className="col-span-3 relative rounded-lg overflow-hidden">
              <Image
                src={displayImages[2]}
                alt={`${title} image 3`}
                fill
                className="object-cover"
              />
            </div>
          </div>
  
          {/* Bottom row */}
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-3 relative rounded-lg overflow-hidden">
              <Image
                src={displayImages[3]}
                alt={`${title} image 4`}
                fill
                className="object-cover"
              />
            </div>
            <div className="col-span-5 relative rounded-lg overflow-hidden">
              <Image
                src={displayImages[4]}
                alt={`${title} image 5`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      )
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Mobile View */}
      <div className="relative group md:hidden w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {displayImages.map((image, index) => (
            <div key={index} className="relative flex-[0_0_100%]">
              <div className="relative  h-[300px]
                    w-full">
                <Image
                  src={image}
                  alt={`${title} image ${index + 1}`}
                  fill
                  priority
                  className="object-cover w-full h-full"
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

      {/* Desktop View */}
      <div className="hidden sm:block px-4 sm:px-6 lg:px-20">
        {renderDesktopImages()}
      </div>
    </div>
  )
}
