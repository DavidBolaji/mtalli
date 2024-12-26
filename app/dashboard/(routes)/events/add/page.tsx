
import AddEvent from "@/app/dashboard/components/add-event";
import { Crumb } from "@/components/crumb/crumb";
import React from "react";

export default async function AddProductPage() {
  return (
    <div className="p-4">
      <Crumb
        crumbData={[
          {
            text: "Dashboard",
            href: "/dashboard",
          },
          {
            text: "Events",
            href: "/dashboard/events",
          },
          {
            text: "Add Event",
            href: "#",
          },
        ]}
      />
      <AddEvent />
    </div>
  );
}
