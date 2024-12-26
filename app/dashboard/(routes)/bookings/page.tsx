import React from "react";
import BookingTable from "../../../../components/table/booking-table/booking-table";
import { getDashboardBooking } from "@/actions/get-bookings";

export const revalidate = 0;

interface OrdersPageSearchParams {
  [key: string]: string;
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: OrdersPageSearchParams;
}) {

  // const categories = searchParams.category?.split(",") || [];
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 7;
  const sort = searchParams.sort || "createdAt";
  const sortOrder = searchParams.sortOrder || "asc";
  const startDate = searchParams.dateFrom || "";
  const endDate = searchParams.dateTo || "";
  const searchQuery = searchParams.searchQuery || "";

  const req = getDashboardBooking({
    page,
    limit,
    sort,
    sortOrder,
    startDate,
    endDate,
    searchQuery,
  });

  

  const [data] = await Promise.all([req]);

  return (
    <div className="p-4">
      <div className="mt-10" />
      <BookingTable
        initialBookings={data?.booking ?? []}
        totalPages={data?.totalPages}
        page={page}
        itemsPerPage={limit}
      />
    </div>
  );
}
