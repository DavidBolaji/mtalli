"use client";

import * as React from "react";
import { BookingTableProps, IBooking } from "./types";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { useTable } from "@/hooks/use-table";

import { MainHeader } from "../main-header";
import { Table, TableBody } from "@/components/ui/table";
import { Empty } from "antd";

import Pagination from "../pagination";
import BookingTableRow from "./booking-table-row";

import { filterBooking } from "@/actions/get-bookings";
import BookingTableHeader from "./booking-table-header";


export default function BookingTable({
  initialBookings = [],
  onSort,
  totalPages,
  page,
  itemsPerPage,
}: BookingTableProps) {
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
    handleSearch,
    hasMore
  } = useTable<IBooking>({
    initialItems: initialBookings,
    onSort,
    onSearch(form, params) {
      filterBooking(form, params)
    },
    onFilter(form, params, path) {
      filterBooking(form, params, path)
    },
    async onDeleteMany(data) {
      toggleModal(true, "DELETE_BOOKINGS", data)
    },
  });
  // min-w-[1000px]
  return (
    <div className="w-full scrollbar-hide ">
      <MainHeader
        title={"Bookings"}
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        onFilter={filterBooking}
        handleSearch={handleSearch}
        action={deleteMultiple}
        filter
        search
        more
        calender
        calenderTxt="Booking date range"
        placeholder="Search by Event name, Booking no"
      />
      <div className="rounded-b-2xl border-t-0 bg-white scrollbar-hide  border border-[#DDEEE5]">
        <Table className=''>
          <BookingTableHeader
            handleSort={handleSort}
            allChecked={allChecked}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
            toggleSelectAll={toggleSelectAll}
          />
          <TableBody>
            {items.map((booking: IBooking) => (
              <BookingTableRow
                key={booking.id}
                booking={booking}
                selectedItems={selectedItems}
                toggleSelectItem={toggleSelectItem}
                deleteOne={(data) => toggleModal(true, "DELETE_BOOKINGS", data)}
              />
            ))}
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
        onFilter={filterBooking}
        hasMore={hasMore}
      />
    </div>
  );
}
