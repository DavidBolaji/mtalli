// import {  Event, EventBooking, Image, User } from "@prisma/client";

// export type CustomerEvent = Pick<Event, "id" | "price" | "title"> & {
//   images: Image[];
//   EventBooking: Pick<EventBooking, "eventId" | "code">[];
// };

// type CustomerBooking = Pick<Booking, "id" | "totalPrice" | "createdAt" | "orderNo"> & {
//   events: CustomerEvent[] | []; // Ensure events is an array
// };

// export interface IBooking {
//   bookings: CustomerBooking[];
// }

// export type IUser = Pick<User, "id" | "fname" | "lname" | "email" | "phone" | "pic"> & IBooking;

// type Customer = IUser | null

// Here’s an interface that represents the given data structure in TypeScript:

export interface Booking {
    id: string;
    createdAt: Date; // ISO date string
}

export interface Customer {
    id: string;
    fname: string | null;
    lname: string | null;
    email: string;
    phone: string | null;
    pic: string | null;

    bookings: Booking[];
    status: "ACTIVE" | "DEACTIVATED"; // Define allowed status values
    totalBookings: number;
    lastBookingDate: Date; // ISO date string
}

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
