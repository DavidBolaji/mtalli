
import { Event, EVENTSTATUS, Promotion } from "@prisma/client";

export interface IEvent {
  id: string;
  title: string;
  price: number;
  description: string;
  location: string;
  info: string;
  rules: string;
  policy: string;
  status:  EVENTSTATUS;
  totalSlots: number;
  startDate: Date;
  endDate: Date;
  leftSlot: number;
  serviceFee: number;
  images: { url: string }[];
  promotion: Pick<Promotion, "name" | "discount" | "startDate" | "endDate" | "id">[];
} 

export interface IcreateEvent {
  id?: string;
  title: string;
  price: number;
  description: string;
  location: string;
  info: string;
  rules: string;
  policy: string;
  status:  EVENTSTATUS;
  totalSlots: number;
  startDate: Date;
  endDate: Date;
  leftSlot: number;
  serviceFee: number;
  promotionId?: string;
  images: string[]
}



export interface EventTableProps {
  initialEvents?: IEvent[];
  onLoadMore?: () => Promise<Event[]>;
  onSort?: (column: keyof IEvent, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number
}
