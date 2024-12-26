"use client";

import { selectCustomer } from "@/actions/get-customers";
import { Button } from "@/components/button/button";
import React, { useState } from "react";


interface Customer {
  id: string;
  name: string;
  key?: string
}

interface Props {
  customers: Customer[];
  initialCustomerName: string;
}

export const SelectedCustomerButtons: React.FC<Props> = ({
  customers,
  initialCustomerName,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCustomerName);

  const handleClick = async (
    e: React.FormEvent<HTMLFormElement>,
    customer: Customer
  ) => {
    e.preventDefault();
    setSelectedCategory(customer.name);

    // Submit the form to trigger server-side action
    const formData = new FormData(e.currentTarget);
    selectCustomer(formData);
  };

  return (
    <div className="flex gap-x-2.5">
      {customers.map((customer) => (
        <form
          key={customer?.id}
          onSubmit={(e) => handleClick(e, customer)}
          method="post"
        >
          <input type="hidden" name="Customer" value={customer.key} />
          <input type="hidden" name="Tab" value={customer.name} />
          <Button
            type="submit"
            round={false}
            size="lg"
            color={selectedCategory === customer.name ? "dark" : "light"}
            className="inline-block text-nowrap text-[14px]  h-12 rounded-2xl md:px-6 px-3 text-xs"
          >
            <span className="font-bold">{customer.name}</span>
          </Button>
        </form>
      ))}
    </div>
  );
};
