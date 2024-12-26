"use client";

import { Button } from "@/components/button/button";
import { Order } from "@/components/table/orders-table/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid } from "antd";
const { useBreakpoint } = Grid;

export default function ViewOrder({ order }: { order: Order | null }) {
  const screen = useBreakpoint();
  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      {/* Header */}
      <div className="flex lg:flex-row flex-col lg:items-center justify-between mb-8 bg-white px-4 py-[19px] rounded-2xl border border-[#DDEEE5]">
        <h1 className="text-2xl font-semibold text-left lg:mb-0 mb-4">
          Order {order?.orderId}
        </h1>
        <div className="flex gap-3">
          <Button size="lg" color="light" className="h-9">
            {screen.lg ? "Cancel Order" : "Cancel"}
          </Button>
          <div className="w-auto">
            <Select>
              <SelectTrigger className="border-0 rounded-full bg-black-100 text-white text-center ">
                <SelectValue
                  placeholder={
                    screen.lg ? "Update Order Status" : "Update Status"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delivered">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
