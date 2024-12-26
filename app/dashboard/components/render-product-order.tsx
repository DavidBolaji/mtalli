import React from "react";
import { SideCards } from "./side-cards";
import FilterComponent from "./filter-component";
import { Typography } from "@/components/typography/typography";
import PendingOrdersTable from "@/components/table/pending-orders/pending-orders-table";
import db from "@/db/db";
import { Empty } from "antd";
import { Prisma } from "@prisma/client";

export const RenderProductOrder: React.FC<{
  sort: string;
  sortOrder: string;
}> = async ({ sort, sortOrder }) => {
  const orderBy:Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[] | undefined =
    sort === "fname"
      ? {
          User: {
            fname: sortOrder as Prisma.SortOrder,
          },
        } :
    sort === "phone"
      ? {
          User: {
            phone: sortOrder as Prisma.SortOrder,
          },
        }
      : { [sort]: sortOrder as Prisma.SortOrder };

  const pendingOrders = await db.order.findMany({
    where: {
      status: "PENDING",
    },
    select: {
      id: true,
      products: {
        select: {
          id: true,
          name: true,
          images: true,
        },
      },
      User: {
        select: {
          fname: true,
          lname: true,
          phone: true,
          pic: true,
        },
      },
      createdAt: true,
    },
    orderBy,
    take: 8,
  });

  const popularWeights = await db.productOrder.groupBy({
    by: ["weight"],
    _count: {
      weight: true, // Count the orders by weight
    },
    orderBy: {
      _count: {
        weight: "desc",
      },
    },
  });

  return (
    <div className="grid grid-cols-12 gap-x-6 mt-6">
      <div className="lg:col-span-8 col-span-12">
        <PendingOrdersTable initialOrders={pendingOrders ?? []} />
      </div>
      <div className="lg:col-span-4 col-span-12 lg:mt-0 mt-6">
        <SideCards
          title="Popular order weights"
          filter={<FilterComponent />}
          body={
            <div className="">
              {popularWeights.map((data) => (
                <div
                  key={data.weight}
                  className="flex justify-between items-center h-14 py-4 border-b border-[#DDEEE5]"
                >
                  <Typography as="p" size="s1" align="left" className="mb-2">
                    {data.weight}kg
                  </Typography>
                  <Typography
                    as="p"
                    size="c1"
                    align="left"
                    className="tracking-tighter font-bold border-[#23342A] border inline-block px-2 rounded-2xl"
                  >
                    {data._count.weight} orders
                  </Typography>
                </div>
              ))}
              {popularWeights.length < 1 && (
                <div>
                  <Empty />
                </div>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
};
