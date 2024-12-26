import { CustomerProduct } from "@/actions/get-customers";
import { Address } from "@prisma/client";

export interface CustomerOrders {
  id: string;
  price: number,
  orderId: string,
  products: CustomerProduct[],
  address: Address | null,
  createdAt: Date,
  paymentType: string,
  status: string
}

export interface CustomerOrdersTableProps {
  id: string;
  initialOrders?: CustomerOrders[];
  onLoadMore?: () => Promise<CustomerOrders[]>;
  onSort?: (column: keyof CustomerOrders, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number;
}
