// import { Category } from "@prisma/client";

export interface Promotion {
  id: string;
  status: boolean;
  name: string;
  code: string;
  promotionType: string
  discount : number
  startDate: Date
  endDate  : Date
}

export interface PromotionTableProps {
  initialPromotions?: Promotion[];
  onLoadMore?: () => Promise<Promotion[]>;
  onSort?: (column: keyof Promotion, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number;
  // categories: Pick<Category, "id" | "name">[];
}
