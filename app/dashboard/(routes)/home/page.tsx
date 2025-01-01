// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { dashboardCard } from "@/utils/data";
import { endOfDay, startOfYear } from "date-fns";
import { RenderDashboardcards } from "../../components/render-dashboard-cards";
import db from "@/db/db";
import { RenderRevenueBooking } from "../../components/render-revenue-booking";
import { MeatCard, SideCards } from "../../components/side-cards";
import FilterComponent from "../../components/filter-component";
import { Empty } from "antd";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/button/button";
import EventCard from "@/components/card/event-card";


interface DashboardSearchParams {
  [key: string]: string;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: DashboardSearchParams;
}) {
  const sort = searchParams.sort || "createdAt";
  const sortOrder = searchParams.sortOrder || "asc";
  const startOfCurrentYear = startOfYear(new Date());
  const todayEndOfDay = endOfDay(new Date());

  const total = db.booking.aggregate({
    _sum: {
      totalPrice: true,
    },
    where: {
      createdAt: {
        gte: startOfCurrentYear,
        lte: todayEndOfDay,
      },
    },
  });

  const eventBookingResult = db.eventBooking.groupBy({
    by: ["eventId"],
    _count: {
      eventId: true,
    },
    orderBy: {
      _count: {
        eventId: "desc",
      },
    },
    take: 5,
  });

  const completed = db.booking.count({});

  const [amount, popularEvents, completedOrders] = await Promise.all([
    total,
    eventBookingResult,
    completed,
  ]);

  console.log(popularEvents)
  const idList = popularEvents.map(el => el.eventId)
   // Fetch detailed event data for popular events
   const popularEventz = await db.event.findMany({
    where: {
      id: {
        in: idList,
      },
    },
    include: {
      images: true,
      Booking: {
        select: {
          bookingCount: true,
        },
      },
    },
  });
  
  // Map the popular events to include their total booking count
  const popularEventDetails = popularEventz.map((event) => {
    const totalBookingCount = event.Booking.reduce(
      (sum, booking) => sum + booking.bookingCount,
      0
    );
    return {
      ...event,
      totalBookingCount,
    };
  });
  
  const data = {
    amount: amount?._sum?.totalPrice ?? 0,
    completedOrders,
  };

  return (
    <div className="bg-grey-200 p-4">
      <RenderDashboardcards data={dashboardCard(data)} />
      <RenderRevenueBooking />
      <div className="col-span-12 my-6">
        <SideCards
          title="Popular events"
          filter={<Button
            className="flex items-center justify-center"
            size="lg"
            color="dark"
            type="button"
          >
            <Link
             href={'/dashboard/events/add'}
              className="text-white text-sm hover:text-white flex gap-2 items-center"
            >
              Create New Event
              <span className="border border-white rounded-full h-5 w-5 flex items-center justify-center">
                <Plus className="h-4 w-4" color="white" />
              </span>
            </Link>
          </Button>}
          body={
            popularEvents.length < 1 ? (
              <div>
                <Empty />
              </div>
            ) : (
              <div className="space-y-3">
                {popularEventDetails?.map((data) => (
                  <EventCard
                    key={data.id}
                    thumbnailUrl={data.images[0].url}
                    tripName={data.title}
                    startDate={data.startDate}
                    endDate={data.endDate}
                    basePrice={data.price}
                    guestCount={data.totalBookingCount}
                  />
                ))}
              </div>
            )
          }
        />
      </div>
    </div>
  );
}
