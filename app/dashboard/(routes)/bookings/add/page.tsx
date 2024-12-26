import React from "react";
import { Crumb } from "@/components/crumb/crumb";
import AddOrders from "@/app/dashboard/components/add-orders";

export const revalidate = 0;

export default async function AddOrderPage() {
    return (
        <div className="p-4">
          <Crumb
            crumbData={[
              {
                text: "Dashboard",
                href: "/dashboard",
              },
              {
                text: "Orders",
                href: "/dashboard/orders",
              },
              {
                text: "Create New Order",
                href: "#",
              },
            ]}
          />
          <AddOrders />
        </div>
      );
}