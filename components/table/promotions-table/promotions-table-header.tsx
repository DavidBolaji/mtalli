// ProductTableHeader.tsx
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

import { CheckboxMinus } from "@/components/ui/checkboxminus";
import { Promotion } from "./types";

interface PromotionsTableHeaderProps {
  allChecked: boolean;
  handleSort: (column: keyof Promotion) => void;
  toggleSelectAll: () => void;
  sortDirection: "asc" | "desc";
  sortColumn: keyof Promotion | null;
}

const headerList = [
  { key: "name", title: "Promotion name", hasSort: true },
  { key: "type", title: "Type", hasSort: true },
  { key: "code", title: "CODE", hasSort: true },
  { key: "startDate", title: "Start date", hasSort: true },
  { key: "endDate", title: "End date", hasSort: true },
  { key: "endDate", title: "Status", hasSort: true },
  { key: "actions", title: "", hasSort: false },
];

export default function PromotionsTableHeader({
  allChecked,
  toggleSelectAll,
  handleSort,
  sortDirection,
  sortColumn,
}: PromotionsTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="pl-6 h-full py-3 flex items-center">
          <CheckboxMinus checked={allChecked} onCheckedChange={toggleSelectAll} />
        </TableHead>
        {headerList.map((header) =>
          header.hasSort ? (
            <TableHead
              className="pl-6 py-3 black-300 font-bold text-sm text-nowrap"
              key={header.title}
            >
              <button
                onClick={() => handleSort(header.key as keyof Promotion)}
                className="flex items-center gap-1"
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

