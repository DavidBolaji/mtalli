// ProductTableHeader.tsx
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

import { CheckboxMinus } from "@/components/ui/checkboxminus";
import { IBooking } from "./types";


interface BookingTableHeaderProps {
  allChecked: boolean;
  handleSort: (column: keyof IBooking) => void;
  toggleSelectAll: () => void;
  sortDirection: "asc" | "desc";
  sortColumn: keyof IBooking | null;
}

const headerList = [
  { key: "title", title: "Event name", hasSort: true },
  { key: "fname", title: "Booked by", hasSort: true },
  { key: "totalSlots", title: "Guests", hasSort: true },
  { key: "orderNo", title: "Booking no", hasSort: true },
  { key: "date", title: "Date", hasSort: true },
  { key: "actions", title: "", hasSort: false },
];

export default function BookingTableHeader({
  allChecked,
  toggleSelectAll,
  handleSort,
  sortDirection,
  sortColumn,
}: BookingTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="pl-6 h-full py-3 flex items-center">
          <CheckboxMinus checked={allChecked} onCheckedChange={toggleSelectAll} />
        </TableHead>
        {headerList.map((header) =>
          header.hasSort ? (
            <TableHead
              className="pl-6 py-3 black-200 font-bold text-sm text-nowrap"
              key={header.title}
            >
              <button
                onClick={() => handleSort(header.key as keyof IBooking)}
                className="flex items-center gap-1 font-medium font-onest text-sm"
              >
                {header.title}
                {sortColumn === header.key ? (
                  sortDirection === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )
                ) : (
                  <ChevronDown className="h-4 w-4 opacity-50" />
                )}
              </button>
            </TableHead>
          ) : (
            <TableHead key={header.title}>{header.title}</TableHead>
          )
        )}
      </TableRow>
    </TableHeader>
  );
}

