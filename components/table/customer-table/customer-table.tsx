"use client";

import * as React from "react";
import { useTable } from "@/hooks/use-table";
import { MainHeader } from "../main-header";
import { Table, TableBody } from "@/components/ui/table";

import { filterCustomer } from "@/actions/get-customers";
import CustomerTableHeader from "./customer-table-header";
import { Customer, CustomerTableProps } from "./types";
import Pagination from "../pagination";
import CustomerTableRow from "./customer-table-row";
import { Empty } from "antd";

export default function CustomerTable({
  initialCustomers = [],
  onSort,
  totalPages,
  page,
  itemsPerPage,
}: CustomerTableProps) {
  const {
    items,
    showFilters,
    setShowFilters,
    ref,
    allChecked,
    handleSort,
    sortColumn,
    sortDirection,
    handleSearch,
    toggleSelectAll,
    toggleSelectItem,
    selectedItems,
    loading,
  } = useTable<Customer>({
    initialItems: initialCustomers,
    onSort,
    onSearch: (form, params) => {
      filterCustomer(form, params)
    },
    onFilter(form, params, path) {
        filterCustomer(form, params, path)
    },
  });

  return (
    <div className="w-full scrollbar-hide">
      <MainHeader
        title={"Customer List"}
        setShowFilters={setShowFilters}
        onFilter={filterCustomer}
        showFilters={showFilters}
        placeholder="Search customer by name and email"
        handleSearch={handleSearch}
        filter
        calender
        search
        calenderTxt="Last booking date"
      />
      <div className="rounded-b-2xl border-t-0 bg-white overflow-hidden border border-[#DDEEE5]">
        <Table>
          <CustomerTableHeader
            handleSort={handleSort}
            allChecked={allChecked}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
            toggleSelectAll={toggleSelectAll}
          />
          <TableBody>
            {items.map((customer: Customer) => (
              <CustomerTableRow
                key={customer.id}
                customer={customer}
                selectedItems={selectedItems}
                toggleSelectItem={toggleSelectItem}
              />
            ))}
          </TableBody>
        </Table>
        {items.length < 1 && <div className="py-8">
          <Empty />
        </div>}
      </div>

      <Pagination
        ref={ref}
        isMobile={false}
        loading={loading}
        totalPages={totalPages ?? 0}
        page={page ?? 1}
        itemsPerPage={itemsPerPage ?? 10}
        onFilter={filterCustomer}
      />
    </div>
  );
}
