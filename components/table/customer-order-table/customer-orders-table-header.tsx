// PendingOrdersTableHeader.tsx
import React from 'react'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { CustomerBooking } from '@/actions/get-customers';


interface PendingOrdersTableHeaderProps {
  handleSort: (column: keyof CustomerBooking, path?: string) => void;
  sortDirection: "asc" | "desc";
  sortColumn: keyof CustomerBooking | null;
}

const headerList = [
  { key: "name", title: "Product name", hasSort: true },
  { key: "orderId", title: "Order No", hasSort: true },
  { key: "price", title: "Amount", hasSort: true },
  { key: "createdAt", title: "Order date", hasSort: true },
  { key: "paymentType", title: "Payment Type", hasSort: true },
  { key: "status", title: "Status", hasSort: true },
  { key: "actions", title: "", hasSort: false },
];

export default function CustomerOrdersTableHeader({
  handleSort,
  sortDirection,
  sortColumn,
}: PendingOrdersTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        {headerList.map((header) =>
          header.hasSort ? (
            <TableHead
              className="pl-6 py-3 black-300 font-bold text-sm text-nowrap"
              key={header.title}
            >
              <button
                onClick={() => handleSort(header.key as keyof CustomerBooking)}
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

