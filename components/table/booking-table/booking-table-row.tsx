
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";


import { IBooking } from "./types";
import { formatDateRange } from "@/utils/helper";
import Link from "next/link";

interface BookingTableRowProps {
  booking: IBooking;
  selectedItems: Set<string>;
  toggleSelectItem: (id: string) => void;
  deleteOne?: (data: Set<string>) => void;
}

export default function BookingTableRow({
  booking,
  selectedItems,
  toggleSelectItem,

}: BookingTableRowProps) {

  const item = booking?.events;

  return (
    <TableRow className={selectedItems.has(booking?.id) ? 'bg-black-600': ""} >
      <TableCell className="pl-6 py-3 flex mt-2 items-end h-full">
        <Checkbox
          checked={selectedItems.has(booking?.id)}
          onCheckedChange={() => toggleSelectItem(booking?.id)}
        />
      </TableCell>
      <TableCell className="pl-6 py-3">
        <div className="flex items-center gap-3">
          <Image
            src={item?.images[0]?.url ?? ""}
            alt={item?.title || "event"}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
          <span className="font-bold text-sm  black-100">{item?.title}</span>
        </div>
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
      {booking?.User?.fname} {booking?.User?.lname}
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        {booking?.bookingCount}
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        {booking.orderNo}
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        {formatDateRange(item?.startDate, item?.endDate)}
      </TableCell>
      <TableCell className="py-3">
        <div className="flex">
          <Button variant={'ghost'} className="bg-black-400 rounded-full font-onest">
            <Link href={`/dashboard/bookings/${booking.id}`}>
            View
            </Link>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
