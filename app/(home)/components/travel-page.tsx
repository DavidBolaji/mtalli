"use client"

import { fetchEvents, getEvent } from "@/actions/get-events";
import { Button } from "@/components/button/button";
import { SkeletonCard } from "@/components/card/skeleton-card";
import TravelCard from "@/components/card/travel-card";
import { Spinner } from "@/components/spinner";
import { Event, Image, Promotion } from "@prisma/client";
import { StaticImageData } from "next/image";
import { useState } from "react";


export interface TravelPackage {
  id: string
  title: string
  slots: number
  startDate: Date
  endDate: Date
  price: number
  discount?: string
  images: (string | StaticImageData)[]
}

type DatabaseEvent = (Event & { promotion: Promotion[] } & { images: Image[] })


interface TravelPageProps {
  events: {
    hasMore: boolean
    items: DatabaseEvent[]
  }
}


export default function TravelPage({ events: initialEvents }: TravelPageProps) {

  const [events, setEvents] = useState(initialEvents);
  const [isPending, setIsPending] = useState(false);


  const fetchMore = async () => {
    setIsPending(true);
    const limit = 5;
    const nextPage = Math.ceil(events.items.length / limit) + 1; // Calculate next page dynamically

    try {
      const data = await fetchEvents(
        nextPage,
        limit
      )
      console.log(data)
      setEvents((prev) => ({
        items: [...prev.items, ...data.items], // Append new events
        hasMore: data.hasMore,
      }));
    } catch (error) {
      console.error("Failed to fetch more events:", error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="pb-16 md:-mt-5 -mt-52 px-8 pt-8">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[42px] font-bold mb-8 font-onest black-100">Upcoming Experiences</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {events.items.map((pkg: DatabaseEvent) => (
            <div key={pkg.id}>
              <TravelCard
                id={pkg.id}
                images={pkg?.images?.map(el => el.url) || []}
                title={pkg?.title}
                slots={pkg?.totalSlots}
                startDate={pkg?.startDate}
                endDate={pkg?.endDate}
                price={pkg?.price}
                discount={pkg.promotion[0]?.discount || 0}
              />
            </div>
          ))}

          {isPending && (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
        </div>
        {(events.hasMore) ? <div  className="w-full justify-center items-center flex my-16">
          <Button onClick={fetchMore} size="lg" color="dark" type="button" disabled={!events.hasMore} className="font-onest text-sm" >
            {isPending ? <Spinner /> : "Explore More Experiences"}
          </Button>
        </div> : null}
      </div>
    </div>
  )
}


