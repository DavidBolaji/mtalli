"use client";

import * as React from "react";
import { EventTableProps, IEvent } from "./types";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { useTable } from "@/hooks/use-table";
import { filterEvent } from "@/actions/get-events";
import { MainHeader } from "../main-header";
import { Table, TableBody } from "@/components/ui/table";
import { Empty } from "antd";
import EventTableHeader from "./event-table-header";
import EventTableRow from "./event-table-row";
import Pagination from "../pagination";


export default function EventTable({
  initialEvents = [],
  onSort,
  totalPages,
  page,
  itemsPerPage,
}: EventTableProps) {
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
  } = useTable<IEvent>({
    initialItems: initialEvents,
    onSort,
    onSearch(form, params) {
      filterEvent(form, params)
    },
    onFilter(form, params, path) {
      filterEvent(form, params, path)
    },
    async onDeleteMany(data) {
      toggleModal(true, "DELETE_EVENTS", data)
    },
  });
  // min-w-[1000px]
  return (
    <div className="w-full scrollbar-hide ">
      <MainHeader
        title={"Events"}
        name={"Add event"}
        url={"/dashboard/events/add"}
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        onFilter={filterEvent}
        handleSearch={handleSearch}
        action={deleteMultiple}
        filter
        search
        more
      />
      <div className="rounded-b-2xl border-t-0 bg-white scrollbar-hide  border border-[#DDEEE5]">
        <Table className=''>
          <EventTableHeader
            handleSort={handleSort}
            allChecked={allChecked}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
            toggleSelectAll={toggleSelectAll}
          />
          <TableBody>
            {items.map((event: IEvent) => (
              <EventTableRow
                key={event.id}
                event={event}
                selectedItems={selectedItems}
                toggleSelectItem={toggleSelectItem}
                deleteOne={(data) => toggleModal(true, "DELETE_EVENTS", data)}
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
        onFilter={filterEvent}
        hasMore={hasMore}
      />
    </div>
  );
}
