"use client";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const usePath = () => {
  const pathname = usePathname();
  const params = useParams();
  const customerId = params?.customerId;
  const bookingId = params?.bookingId;
  const eventId = params?.eventId;
  const promotionId = params?.promotionId;

  const [locationCurrent, setLoc] = useState("");

  useEffect(() => {
    const key =
      pathname === "/dashboard/home"
        ? "/dashboard/home"
        : pathname === "/dashboard/events"
        ? "/dashboard/events"
        : pathname === "/dashboard/events/add"
        ? "/dashboard/events"
        : pathname === `/dashboard/events/${eventId}/edit`
        ? "/dashboard/events"
        : pathname === "/dashboard/customers"
        ? "/dashboard/customers"
        : pathname === "/dashboard/bookings"
        ? "/dashboard/bookings"
        : pathname === "/dashboard/bookings/add"
        ? "/dashboard/bookings"
        : pathname === `/dashboard/customers/${customerId}`
        ? "/dashboard/customers"
        : pathname === `/dashboard/customers/${customerId}/edit`
        ? "/dashboard/customers"
        : pathname === `/dashboard/promotions`
        ? "/dashboard/promotions"
         : pathname === `/dashboard/bookings/${bookingId}`
        ? "/dashboard/bookings"
         : pathname === `/dashboard/promotions/add`
        ? "/dashboard/promotions"
         : pathname === `/dashboard/promotions/${promotionId}`
        ? "/dashboard/promotions"
         : pathname === `/dashboard/promotions/${promotionId}/edit`
        ? "/dashboard/promotions"
        : pathname?.split("/")[pathname?.split("/").length - 1];
    setLoc(key);
  }, [pathname, customerId, bookingId, promotionId, eventId]);

  return { locationCurrent };
};

export default usePath;
