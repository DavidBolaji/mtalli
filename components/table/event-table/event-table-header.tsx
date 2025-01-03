// ProductTableHeader.tsx
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

import { CheckboxMinus } from "@/components/ui/checkboxminus";
import { IEvent } from "./types";

interface ProductTableHeaderProps {
  allChecked: boolean;
  handleSort: (column: keyof IEvent) => void;
  toggleSelectAll: () => void;
  sortDirection: "asc" | "desc";
  sortColumn: keyof IEvent | null;
}

const headerList = [
  { key: "title", title: "Event name", hasSort: true },
  { key: "price", title: "Price per person", hasSort: true },
  { key: "totalSlots", title: "Total Slots", hasSort: true },
  { key: "leftSlot", title: "Slots left", hasSort: true },
  { key: "startDate", title: "Date", hasSort: true },
  { key: "status", title: "Status", hasSort: true },
  { key: "actions", title: "", hasSort: false },
];

export default function EventTableHeader({
  allChecked,
  toggleSelectAll,
  handleSort,
  sortDirection,
  sortColumn,
}: ProductTableHeaderProps) {
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
                onClick={() => handleSort(header.key as keyof IEvent)}
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

