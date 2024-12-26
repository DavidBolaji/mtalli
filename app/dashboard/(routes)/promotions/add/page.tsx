import React from "react";
import { Crumb } from "@/components/crumb/crumb";
import AddPromotions from "@/app/dashboard/components/add-promotion";
// import AddOrders from "@/app/dashboard/components/add-orders";

export const revalidate = 0;

export default async function AddPromotionPage() {
    return (
        <div className="p-4">
          <Crumb
            crumbData={[
              {
                text: "Dashboard",
                href: "/dashboard",
              },
              {
                text: "Promotions",
                href: "/dashboard/promotions",
              },
              {
                text: "Create New Promotion",
                href: "#",
              },
            ]}
          />
          <AddPromotions />
        </div>
      );
}