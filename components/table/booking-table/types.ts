
import { Event, Image, User } from "@prisma/client";

export interface IBooking {
  id: string;
  orderNo: string;
  bookingCount: number;
  events: (Pick<Event, "id" | "title" | "totalSlots"| "startDate" | "endDate"> & {images: Image[]}) | null
  User: Pick<User, "fname" | "lname" | "phone"> | null
  createdAt: Date
}

export interface IcreateBooking {
  id?: string;
  orderNo: string
  events: (Pick<Event, "id" | "title" | "totalSlots"| "startDate" | "endDate"> & {images: Image[]})
  User: Pick<User, "fname" | "lname" | "phone">
  createdAt: Date
}



export interface BookingTableProps {
  initialBookings?: IBooking[];
  onLoadMore?: () => Promise<IBooking[]>;
  onSort?: (column: keyof IBooking, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number
}
