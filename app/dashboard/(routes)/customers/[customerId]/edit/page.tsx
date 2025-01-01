import { getDashboardCustomer } from "@/actions/get-customers";
import { Crumb } from "@/components/crumb/crumb";

import React from "react";
import ViewCustomer from "../../components/view-customer";
import { EditCustomerForm } from "@/components/form/edit-customer-form";
export const revalidate = 0;

interface CustomerPageSearchParams {
  params: { customerId: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function CustomerEditPage({
  params,
  searchParams,
}: CustomerPageSearchParams) {
  const customerId = params.customerId;
  const customerRequest = getDashboardCustomer(customerId);
  console.log(searchParams)

  // Await both requests
  const [customer] = await Promise.all([
    customerRequest
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
              text: detail || "",
              href: "",
            },
          ]}
        />
      </div>
      <ViewCustomer customer={customer?.customer} save />
      <div className="grid grid-cols-10">
        <div className="lg:col-span-6 col-span-10 w-full">
          <EditCustomerForm
            user={customer?.customer}
           
            disabled
            customer={false}
          />
        </div>
      </div>
    </div>
  );
}
