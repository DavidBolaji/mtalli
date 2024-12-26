// ProductTable.tsx
"use client";

import * as React from "react";

import Pagination from "../pagination";
import { useTable } from "@/hooks/use-table";
import { MainHeader } from "../main-header";
import { Table, TableBody } from "@/components/ui/table";
import {  PromotionTableProps, Promotion } from "./types";
import PromotionsTableHeader from "./promotions-table-header";
import PromotionTableRow from "./promotions-table-row";
import { Empty } from "antd";
import { filterPromotions } from "@/actions/get-promotions";
import { useDeleteModal } from "@/hooks/use-delete-modal";

export default function PromotionsTable({
  initialPromotions = [],

  onSort,
  totalPages,
  page,
  itemsPerPage,
  // categories
}: PromotionTableProps) {
  const {toggleModal} = useDeleteModal()
  const {
    items,
    showFilters,
    setShowFilters,
    ref,
    allChecked,
    handleSort,
    sortColumn,
    sortDirection,
    toggleSelectAll,
    toggleSelectItem,
    selectedItems,
    loading,
    deleteMultiple,
    handleSearch
  } = useTable<Promotion>({
    initialItems: initialPromotions,
    onSort,
    onSearch: (form, params) => {
      filterPromotions(form, params)
    },
    onFilter(form, params) {
      filterPromotions(form, params)
    },
    async onDeleteMany(data) {
      toggleModal(true, "DELETE_PROMOTIONS", data)
    },
  });

  return (
    <div className="w-full scrollbar-hide">
      <MainHeader
        title={"Promotions"}
        name={"Create Promotion"}
        url={"/dashboard/promotions/add"}
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        onFilter={filterPromotions}
        filter
        calender
        handleSearch={handleSearch}
        placeholder="Search promotions by name or code"
        action={deleteMultiple}
        search
        more
        pType
        pStatus
      />

      <div className="rounded-b-2xl border-t-0 bg-white scrollbar-hide  border border-[#DDEEE5]">
        <Table className=''>
          <PromotionsTableHeader
            handleSort={handleSort}
            allChecked={allChecked}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
            toggleSelectAll={toggleSelectAll}
          />
          <TableBody>
            {items?.length ? items?.map((promotion: Promotion) => (
              <PromotionTableRow
                key={promotion.id}
                promotion={promotion}
                selectedItems={selectedItems}
                toggleSelectItem={toggleSelectItem}
              />
            )): null}
          </TableBody>
        </Table>
        {items?.length < 1 && <div className="py-8">
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
        onFilter={filterPromotions}
      />
    </div>
  );
}
