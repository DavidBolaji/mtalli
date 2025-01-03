import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatDateRange, formatToNaira } from "@/utils/helper";
import Image from "next/image";
import React from "react";

import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { IEvent } from "./types";

interface EventTableRowProps {
  event: IEvent;
  selectedItems: Set<string>;
  toggleSelectItem: (id: string) => void;
  deleteOne?: (data: Set<string>) => void;
}

export default function EventTableRow({
  event,
  selectedItems,
  toggleSelectItem,
  deleteOne
}: EventTableRowProps) {

  return (
    <TableRow className={selectedItems.has(event.id) ? 'bg-black-500': ""} >
      <TableCell className="pl-6 py-3 flex mt-2 items-end h-full">
        <Checkbox
          checked={selectedItems.has(event.id)}
          onCheckedChange={() => toggleSelectItem(event.id)}
        />
      </TableCell>
      <TableCell className="pl-6 py-3">
        <div className="flex items-center gap-3">
          <Image
            src={event?.images[0]?.url ?? ""}
            alt={event.title}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
          <span className=" text-sm  black-100">{event.title}</span>
        </div>
      </TableCell>
      <TableCell className="pl-6 py-3  text-sm black-100 font-onest">
        {formatToNaira(event?.price)}
      </TableCell>
      <TableCell className="pl-6 py-3  text-sm black-100 font-onest">
        {event?.totalSlots}
      </TableCell>
      <TableCell className="pl-6 py-3  text-sm black-100 font-onest">
        {event?.leftSlot}
      </TableCell>
      <TableCell className="pl-6 py-3  text-xs text-nowrap black-100 font-onest">
        {formatDateRange(event.startDate, event.endDate)}
      </TableCell>
      <TableCell className="pl-6 py-3  text-sm black-100 font-onest">
        <Badge variant="outline" className={cn("capitalize rounded-full")}>
          {event.status.toLowerCase()}
        </Badge>
      </TableCell>
      <TableCell className="py-3">
        <div className="flex">
          {/* <Button variant={'ghost'} className="text-xs">
            Manage
          </Button> */}
          <Link href={`/dashboard/events/${event?.id}/edit`}>
          <Button variant={'ghost'}>
            <Edit className="w-4 h-4 black-100 font-onest" /> 
          </Button>
          </Link>
          <Button variant={'ghost'} onClick={() => {
            if(deleteOne) {
              deleteOne(new Set([event.id]))
            }
          }}>
            <Trash2 className="w-4 h-4 black-100 font-onest" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
