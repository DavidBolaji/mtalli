"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import React from "react";
import { Customer } from "./types";
import { Button } from "@/components/button/button";
import { formatDate } from "@/utils/helper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/avatar/avatar";

interface CustomerTableRowProps {
  customer: Customer;
  selectedItems: Set<string>;
  toggleSelectItem: (id: string) => void;
}

export default function CustomerTableRow({
  customer,
  selectedItems,
  toggleSelectItem,
}: CustomerTableRowProps) {
  const router = useRouter();

  return (
    <TableRow className={selectedItems.has(customer.id) ? "bg-black-600" : ""}>
      <TableCell className="pl-6 py-3 flex mt-2 items-end h-full">
        <Checkbox
          checked={selectedItems.has(customer.id)}
          onCheckedChange={() => toggleSelectItem(customer.id)}
        />
      </TableCell>
      <TableCell className="pl-6 py-3">
        <div className="flex items-center gap-3">
          {customer?.pic ? (
            <Image
              src={customer?.pic ?? ""}
              alt={customer.fname + " avatar"}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : <Avatar size="sm" src={customer.fname ? `https://avatar.iran.liara.run/username?username=${customer?.fname + "" + customer?.lname}

`: undefined} />}
          <span className="font-bold text-sm  black-100">
            {customer.fname} {customer.lname} {(customer?.fname?.length ?? 0) < 1 ? "-" : null}
          </span>
        </div>
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        {customer?.email}
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        {customer?.phone ? customer.phone : "-"}
      </TableCell>
      <TableCell className="pl-6 flex justify-center items-center font-bold text-sm black-100">
        <div className={selectedItems.has(customer.id) ? "" : "-translate-y-1"}>{customer?.totalOrders}</div>
      </TableCell>
      <TableCell className="pl-6 font-bold text-sm black-100">
        {customer?.lastOrderDate.toLocaleDateString() === "1/1/1970" ? "-" : formatDate(customer?.lastOrderDate.toLocaleDateString())}
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        <Badge variant="outline" className={cn("capitalize rounded-full")}>
          {customer.status.toLowerCase()}
        </Badge>
      </TableCell>
      <TableCell className="py-3">
        <div className="flex">
          <Button
            onClick={() => router.push(`/dashboard/customers/${customer?.id}`)}
            color="light"
            size="lg"
            className="border-0 bg-black-600 h-7 flex items-center justify-center"
          >
            View
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
