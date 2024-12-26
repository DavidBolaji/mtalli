// ProductTable.tsx
"use client";

import * as React from "react";

import { CustomerOrders, CustomerOrdersTableProps } from "./types";

import { Table, TableBody } from "@/components/ui/table";
import { useTable } from "@/hooks/use-table";
import { MainHeader } from "../main-header";
import CustomerOrdersTableHeader from "./customer-orders-table-header";
import CustomerordersTableRow from "./customer-orders-table-row";
import { filterCustomerOrder } from "@/actions/get-customers";
import { Empty } from "antd";
import Pagination from "../pagination";

export default function CustomerOrdersTable({
  initialOrders,
  onSort,
  totalPages,
  page,
  itemsPerPage,
  id,
}: CustomerOrdersTableProps) {
  const {
    items,
    handleSort,
    sortColumn,
    sortDirection,
    showFilters,
    setShowFilters,
    ref,
    loading
  } = useTable<CustomerOrders>({
    initialItems: initialOrders as CustomerOrders[],

    onSort,
    onFilter(form, params) {
      alert(params)
      filterCustomerOrder(
        form,
        params,
        `/dashboard/customers/${id}?tab=Order+History`
      );
    },
  });

  return (
    <div className="w-full mt-6 scrollbar-hide">
      <MainHeader
        title={"Orders History"}
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        onFilter={(form, params) =>
          filterCustomerOrder(
            form,
            params,
            `/dashboard/customers/${id}?tab=Order+History`
          )
        }
        filter
        payment
        status
      />
      <div className="rounded-b-2xl border-t-0 bg-white overflow-hidden border relative border-[#DDEEE5]">
        <Table>
          <CustomerOrdersTableHeader
            handleSort={handleSort}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
          />
          <TableBody>
            {items.map((orders: CustomerOrders) => (
              <CustomerordersTableRow key={orders.id} orders={orders} />
            ))}
          </TableBody>
        </Table>
        {items.length < 1 && (
          <div className="py-8">
            <Empty />
          </div>
        )}
      </div>
      <Pagination
        ref={ref}
        isMobile={false}
        loading={loading}
        totalPages={totalPages ?? 0}
        page={page ?? 1}
        itemsPerPage={itemsPerPage ?? 10}
        onFilter={filterCustomerOrder}
      />
    </div>
  );
}
