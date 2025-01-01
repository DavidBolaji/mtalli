import { CustomerBooking } from "@/actions/get-customers";
// import { Address } from "@prisma/client";

export interface CustomerOrdersTableProps {
  id: string;
  initialOrders?: CustomerBooking[];
  onLoadMore?: () => Promise<CustomerBooking[]>;
  onSort?: (column: keyof CustomerBooking, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number;
}
