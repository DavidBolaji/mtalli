import { Booking, Event, EventBooking, Image, User } from "@prisma/client";

export type CustomerEvent = Pick<Event, "id" | "price" | "title"> & {
  images: Image[];
  EventBooking: Pick<EventBooking, "eventId" | "code">[];
};

type CustomerBooking = Pick<Booking, "id" | "totalPrice" | "createdAt" | "orderNo"> & {
  events: CustomerEvent[] | []; // Ensure events is an array
};

export interface IBooking {
  bookings: CustomerBooking[];
}

export type IUser = Pick<User, "id" | "fname" | "lname" | "email" | "phone" | "pic"> & IBooking;

type Customer = IUser | null

export interface CustomerTableProps {
  initialCustomers?: Customer[];
  onLoadMore?: () => Promise<Customer[]>;
  onSort?: (column: keyof Customer, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number;
}
