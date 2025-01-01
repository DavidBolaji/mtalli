
import { getDashboardCustomers } from "@/actions/get-customers";
import CustomerTable from "@/components/table/customer-table/customer-table";
import React from "react";

export const revalidate = 0;

interface CustomerPageSearchParams {
  [key: string]: string;
}

export default async function CustomerPage({
  searchParams,
}: {
  searchParams: CustomerPageSearchParams;
}) {

  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 7;
  const sort = searchParams.sort || "createdAt";
  const sortOrder = searchParams.sortOrder || "asc";
  const startDate = searchParams.dateFrom || "";
  const endDate = searchParams.dateTo || "";
  const searchQuery = searchParams.searchQuery || "";

  // Fetch customer data and category list
  const customerRequest = getDashboardCustomers({
    page,
    limit,
    sort,
    sortOrder,
    startDate,
    endDate,
    searchQuery,
  });


  // Await both requests
  const [data] = await Promise.all([
    customerRequest,
  ]);


  return (
    <div className="p-4">
      <CustomerTable
        initialCustomers={data?.customers ?? []}
        totalPages={data?.totalPages}
        page={page}
        itemsPerPage={limit}
      />
    </div>
  );
}
