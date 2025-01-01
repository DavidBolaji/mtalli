"use server";

import db from "@/db/db";
import {
  Image,
  Booking,
  Prisma,
  Event,
  EventBooking,
  User,
} from "@prisma/client";
import { redirect } from "next/navigation";

export interface IBooking {
  bookings: CustomerBooking[];
}

export type CustomerEvent = Pick<Event, "id" | "price" | "title"> & {
  images: Image[];
  EventBooking: Pick<EventBooking, "eventId" | "code">[];
};

export type CustomerBooking = Pick<Booking, "id" | "totalPrice" | "createdAt" | "orderNo"> & {
  events: CustomerEvent[] | []; // Ensure events is an array
};

export interface IBooking {
  bookings: CustomerBooking[];
}

export type IUser = Pick<User, "id" | "fname" | "lname" | "email" | "phone" | "pic"> & IBooking;

export type ICustomer = {
  customer: IUser | null;
  totalBookings: number;
  totalAmountSpent: number;
  totalItems: number
};

interface GetCustomersParams {
  categories?: string[];
  page?: number;
  limit?: number;
  sort?: string;
  sortOrder?: string;
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
}

export const getDashboardCustomers = async ({
  page = 1,
  limit = 10,
  sort = "createdAt",
  sortOrder = "asc",
  startDate,
  endDate,
  searchQuery,
}: GetCustomersParams) => {
  const skip = (page - 1) * limit;

  const whereClause: Prisma.UserWhereInput = {
    AND: [  
    // Filter users by orders created within the date range (if provided)
    ...(startDate || endDate
      ? [{
          bookings: {
            some: {
              createdAt:
                startDate && endDate
                  ? { gte: startDate, lte: endDate }
                  : startDate
                  ? { gte: startDate }
                  : { lte: endDate },
            },
          },
        }]
      : []),
  
    // Add search query filter across multiple fields (if provided)
    ...(searchQuery ? [{
      OR: [
        { fname: { contains: searchQuery } },
        { email: { contains: searchQuery } },
      ],
    }] : []),
  ]
  };
  

  const orderBy: Prisma.UserOrderByWithRelationInput =
    sort === "totalBookings"
      ? { bookings: { _count: sortOrder as Prisma.SortOrder } }
      : { [sort]: sortOrder as Prisma.SortOrder };

  try {
    const totalItems = await db.user.count({ where: whereClause });
    const users = await db.user.findMany({
      where: whereClause,
      select: {
        id: true,
        fname: true,
        lname: true,
        email: true,
        phone: true,
        pic: true,
        
        bookings: {
          select: {
            id: true,
            createdAt: true,
          },
        },
        status: true,
      },
      skip,
      take: limit,
      orderBy: sort === "lastBookingDate" ? undefined : orderBy,
    });

    // Calculate total order count and last order date for each user
    const customers = users.map((user) => ({
      ...user,
      totalBookings: user.bookings.length,
      lastBookingDate: user.bookings.reduce(
        (latest, order) =>
          order.createdAt > latest ? order.createdAt : latest,
        new Date(0)
      ),
    }));

    // Sort by lastBookingDate if specified
    if (sort === "lastBookingDate") {
      customers.sort((a, b) => {
        const dateA = a.lastBookingDate;
        const dateB = b.lastBookingDate;
        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    }

    const totalPages = Math.ceil(totalItems / limit);
    return { customers: customers ?? [], totalPages };
  } catch (error) {
    console.error("Error fetching customers:", (error as Error).message);
    return { customers: [], totalPages: 0 };
  }
};


export const filterCustomer = (
  formData: FormData,
  currentParams: URLSearchParams,
  path?: string
) => {
  const params = new URLSearchParams(currentParams);

  // Extract form data
  const prodFilter = formData.getAll("Categories[]");
  const page = formData.get("page") as string;
  const sort = (formData.get("sort") as string) || params.get("sort") || "fname";
  const sortBooking =
    (formData.get("sortBooking") as string) || params.get("sortBooking") || "asc";

  const dateFrom = formData.get("dateFrom") as string;
  const dateTo = formData.get("dateTo") as string;

  const hasSelectedFilters = prodFilter.length > 0;
  const searchQuery = params.get("searchQuery") as string;

  // Handle date range filters
  if (dateFrom) {
    params.set("dateFrom", dateFrom);
  } else {
    params.delete("dateFrom");
  }

  if (dateTo) {
    params.set("dateTo", dateTo);
  } else {
    params.delete("dateTo");
  }

  // Handle category filters
  if (hasSelectedFilters) {
    params.delete("category"); // Remove existing category filters
    prodFilter.forEach((filter) => {
      params.append("category", filter as string);
    });
    params.set("page", "1"); // Reset page to 1 when filters change
  } else {
    params.delete("category"); // Remove all category filters
  }

  // Handle pagination and sorting
  if (page) {
    params.set("page", page);
  } else {
    params.delete("page");
  }

  if (sort) {
    params.set("sort", sort);
  } else {
    params.delete("sort");
  }

  if (sortBooking) {
    params.set("sortBooking", sortBooking);
  } else {
    params.delete("sortBooking");
  }

    // Handle search query
    if (searchQuery) {
      params.set("searchQuery", searchQuery);
    } else {
      params.delete("searchQuery");
    }
  

  // Check if there are any parameters left
  const newQuery = params.toString();
  if (newQuery) {
    const redirectPath = path
      ? `${path}?${newQuery}`
      : `/dashboard/customers?${newQuery}`;
    redirect(redirectPath);
  } else {
    // Redirect to the base path if no parameters exist
    const redirectPath = path || "/dashboard/customers";
    redirect(redirectPath);
  }
};



export const filterCustomerBooking = (
  formData: FormData,
  currentParams: URLSearchParams,
  path?: string
) => {
  // Extract base path and query string from the provided path
  // const [basePath, existingQueryString] = path?.split("?") || ["/dashboard/customers", ""];
  const params = new URLSearchParams(currentParams);

  // Extract filters from the formData
  const paymentFilters = formData.getAll("Payment[]").filter(item => typeof item === "string") as string[];
  const statusFilters = formData.getAll("Status[]").filter(item => typeof item === "string") as string[];

  const page = formData.get("page") as string || params.get("page") || "1"; // Default to page 1
  const sort = formData.get("sort") as string || params.get("sort") || "name"; // Default to "name"
  const sortBooking = formData.get("sortBooking") as string || params.get("sortBooking") || "asc";

  // Handle payment filters
  params.delete("payment");
  paymentFilters.forEach((payment) => params.append("payment", payment));

  // Handle status filters
  params.delete("status");
  statusFilters.forEach((status) => params.append("status", status));

  // Handle page parameter
  if (paymentFilters.length === 0 && statusFilters.length === 0) {
    params.delete("page"); // Remove page if no filters are applied
  } else {
    params.set("page", page);
  }

  // Set sorting fields in the URL parameters
  params.set("sort", sort);
  params.set("sortBooking", sortBooking);

  // Generate the final query string
   // Generate the final query string
  const queryString = params.toString();
  const destinationPath = path ? path : "/dashboard/customers";

  // Redirect to the new URL with updated parameters
  redirect(queryString ? `${destinationPath}?${queryString}` : destinationPath);
};


export const resetEvent = () => {
  redirect(`/dashboard/products`);
};

export const getDashboardCustomer = async (
  id: string,
  sort: string = "createdAt",
  sortBooking: "asc" | "desc" = "asc",
  filters: { category?: string[]; status?: string[] } = {}
): Promise<ICustomer> => {
  const { status = [] } = filters;

  // Build Prisma query filters for orders
  const bookingFilters: any = {};

  if (status.length > 0) {
    bookingFilters.status = { in: status.map((el) => el.toUpperCase()) };
  }

  // Fetch the total number of bookings
  const totalItem = await db.booking.count({
    where: {
      userId: id,
      ...bookingFilters,
    },
  });

  // Fetch the customer data
  const customer = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      fname: true,
      lname: true,
      email: true,
      phone: true,
      pic: true,
      bookings: {
        where: bookingFilters,
        orderBy: sort === "name" ? undefined : { [sort]: sortBooking },
        select: {
          id: true,
          totalPrice: true,
          createdAt: true,
          orderNo: true,
          events: {
            select: {
              id: true,
              images: true,
              title: true,
              price: true,
              EventBooking: {
                select: {
                  eventId: true,
                  code: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!customer) {
    return {
      totalBookings: 0,
      totalAmountSpent: 0,
      customer: null,
      totalItems: 0,
    };
  }

  // booking?.events?.map((event) => ({
  //   id: event.id,
  //   title: event.title,
  //   price: event.price,
  //   images: event.images,
  //   EventBooking: Array.isArray(event.EventBooking)
  //   ? event.EventBooking.map((eb) => ({
  //       eventId: eb.eventId,
  //       code: eb.code,
  //     }))
  //   : [],
  // })),

  // Map bookings to conform to the `CustomerBooking` type
  const bookings = customer.bookings.map((booking) => ({
    id: booking.id,
    totalPrice: booking.totalPrice,
    createdAt: booking.createdAt,
    orderNo: booking.orderNo,
    events: []
  }));

  const totalAmountSpent = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const totalItems = Math.ceil(totalItem / 7);

  return {
    totalBookings: bookings.length,
    totalAmountSpent,
    customer: {
      id: customer.id,
      fname: customer.fname,
      lname: customer.lname,
      email: customer.email,
      phone: customer.phone,
      pic: customer.pic,
      bookings,
    },
    totalItems,
  };
};



export const selectCustomer = (formData: FormData) => {
  const cusFilter = formData.get("Customer");
  const nameFilter = formData.getAll("Tab");

  console.log(cusFilter?.toString());

  const params = new URLSearchParams();

  if (nameFilter) {
    params.append("tab", nameFilter.join(","));
  }

  if (params.toString()) {
    redirect(
      `/dashboard/customers/${cusFilter?.toString()}?${params.toString()}`
    );
  } else {
    console.log("No filters applied");
  }
};

export const selectUser = (formData: FormData) => {
  const cusFilter = formData.get("User");
  const nameFilter = formData.getAll("Tab");

  console.log(cusFilter?.toString());

  const params = new URLSearchParams();

  if (nameFilter) {
    params.append("tab", nameFilter.join(","));
  }

  if (params.toString()) {
    redirect(`/orders/${cusFilter?.toString()}?${params.toString()}`);
  } else {
    console.log("No filters applied");
  }
};

