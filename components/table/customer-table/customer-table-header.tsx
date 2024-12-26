// CustomerTableHeader.tsx
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Customer } from "./types";
import { CheckboxMinus } from "@/components/ui/checkboxminus";

interface CustomerTableHeaderProps {
  allChecked: boolean;
  handleSort: (column: keyof Customer) => void;
  toggleSelectAll: () => void;
  sortDirection: "asc" | "desc";
  sortColumn: keyof Customer | null;
}

const headerList = [
  { key: "fname", title: "Customer name", hasSort: true },
  { key: "email", title: "Email", hasSort: true },
  { key: "phone", title: "Phone no", hasSort: true },
  { key: "totalOrders", title: "Total orders", hasSort: true },
  { key: "lastOrderDate", title: "Last order date", hasSort: true },
  { key: "status", title: "status", hasSort: true },
  { key: "actions", title: "", hasSort: false },
];

export default function CustomerTableHeader({
  allChecked,
  toggleSelectAll,
  handleSort,
  sortDirection,
  sortColumn,
}: CustomerTableHeaderProps) {
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
                onClick={() => handleSort(header.key as keyof Customer)}
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

