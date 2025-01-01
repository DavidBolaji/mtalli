import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import React from "react";
import { Promotion } from "./types";
import { Button } from "@/components/ui/button";
import { endOfToday, format, isAfter, isBefore, startOfToday } from "date-fns";
import { useRouter } from "next/navigation";

interface PromotionTableRowProps {
  promotion: Promotion;
  selectedItems: Set<string>;
  toggleSelectItem: (id: string) => void;
}

export default function PromotionTableRow({
  promotion,
  selectedItems,
  toggleSelectItem,
}: PromotionTableRowProps) {
  const router = useRouter();
  return (
    <TableRow className={selectedItems.has(promotion.id) ? "bg-black-600" : ""}>
      <TableCell className="pl-6 py-3 flex items-end h-full">
        <Checkbox
          checked={selectedItems.has(promotion.id)}
          onCheckedChange={() => toggleSelectItem(promotion.id)}
        />
      </TableCell>
      <TableCell className="pl-6 py-3">
        <span className="font-bold text-sm  black-100">{promotion.name}</span>
      </TableCell>
      <TableCell className="pl-6 py-3 font-onest font-bold font-sm black-100">
        {promotion.promotionType}
      </TableCell>
      <TableCell className="pl-6 py-3 font-onest font-bold font-sm black-100">
        {promotion.code}
      </TableCell>

      <TableCell className="pl-6 py-3 font-onest font-bold font-sm black-100">
        {format(promotion.startDate, "MMM dd, h:maa")}
      </TableCell>
      <TableCell className="pl-6 py-3 font-onest font-bold font-sm black-100">
        {format(promotion.endDate, "MMM dd, h:maa")}
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        <Badge variant="outline" className={cn("capitalize rounded-full")}>
        { promotion.status ? "Active" : !(isBefore(new Date(promotion.startDate), endOfToday()) &&
          isAfter(new Date(promotion.endDate), startOfToday()))
            ? "Completed"
            : "Cancelled"}
        </Badge>
      </TableCell>

      <TableCell className="">
        <Button
          onClick={() => router.push(`/dashboard/promotions/${promotion?.id}`)}
          size="sm"
          color="light"
          className="border-0 bg-black-600 hover:bg-transparent text-black h-7 flex items-center rounded-full justify-center"
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
