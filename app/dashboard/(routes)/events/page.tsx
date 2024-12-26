
import { getDashboardEvent } from "@/actions/get-events";
import EventTable from "@/components/table/event-table/event-table";
import React from "react";

export const revalidate = 0;

interface ProductOageSearchParams {
  [key: string]: string;
}

export default async function ProductPage({
  searchParams,
}: {
  searchParams: ProductOageSearchParams;
}) {

  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 10;
  const sort = searchParams.sort || "createdAt"; 
  const sortOrder = searchParams.sortOrder || "asc"; 
  const searchQuery = searchParams.searchQuery || ""; 
  const startDate = searchParams.dateFrom || "";
  const endDate = searchParams.dateTo || "";

  const req = getDashboardEvent({
    page,
    limit,
    sort,
    sortOrder,
    searchQuery,
    startDate,
    endDate,
  });

  const [data] = await Promise.all([req])

  return (
    <div className="p-4">
      <EventTable
        initialEvents={data?.events ?? []}
        totalPages={data?.totalPages}
        page={page}
        itemsPerPage={limit}
      />
    </div>
  );
}
