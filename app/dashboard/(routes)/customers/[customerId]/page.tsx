import { getCategories } from "@/actions/get-categories";
import { getDashboardCustomer } from "@/actions/get-customers";
import { Crumb } from "@/components/crumb/crumb";

import React from "react";
import ViewCustomer from "../components/view-customer";
import { CustomerComponent } from "../components/customer-component";

export const revalidate = 0;

interface CustomerPageSearchParams {
  params: { customerId: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function CustomerPage({
  params,
  searchParams,
}: CustomerPageSearchParams) {
  const customerId = params.customerId;
  const sort = searchParams.sort || "createdAt";
  const sortOrder = searchParams.sortOrder || "asc";
  // Ensure category is always an array
  const category =
    typeof searchParams.payment === "string"
      ? [searchParams.payment]
      : Array.isArray(searchParams.payment)
      ? searchParams.payment
      : [];


  // Ensure status is always an array
  const status =
    typeof searchParams.status === "string"
      ? [searchParams.status]
      : Array.isArray(searchParams.status)
      ? searchParams.status
      : [];

  const customerRequest = getDashboardCustomer(
    customerId,
    sort,
    sortOrder as "asc" | "desc",
    {
      category,
      status,
    }
  );

  const custormerName = searchParams?.tab;
  const categoryRequest = getCategories();

  // Await both requests
  const [customer, categories] = await Promise.all([
    customerRequest,
    categoryRequest,
  ]);

  const detail = (customer?.customer?.fname && customer?.customer?.fname?.length) && (customer?.customer?.lname && customer?.customer?.lname?.length) ?` ${customer?.customer?.fname} ${customer?.customer?.lname}` : customer?.customer?.email


  return (
    <div className="p-4">
      <div>
        <Crumb
          crumbData={[
            {
              text: "Customers",
              href: "/dashboard/customers",
            },
            {
              text: "Active Customers",
              href: "/dashboard/customers",
            },
            {
              text: detail,
              href: "",
            },
          ]}
        />
      </div>
      
      <ViewCustomer customer={customer?.customer} />
      <CustomerComponent
        categories={categories}
        customerName={custormerName ? custormerName : "Details"}
        customer={customer.customer}
        searchParams={searchParams}
        totalPages={customer.totalItems}
      />
    </div>
  );
}
