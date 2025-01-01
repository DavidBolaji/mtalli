import { v4 as uuidv4 } from "uuid";
import { parse, format, isSameMonth, isSameYear } from "date-fns";
// import { Order } from "@/components/table/orders-table/types";

export function generateSixDigitCode() {
  // Generate a UUID, take the first 6 characters, and prefix with "#"
  const uniqueCode = uuidv4().replace(/-/g, "").slice(0, 6);
  return `#${uniqueCode}`;
}
// utils/getQueryParams.ts
export const getQueryCategoryParams = (url: string) => {
  const urlObj = new URL(url);
  const category = urlObj.searchParams.get("category");
  const name = urlObj.searchParams.get("name");

  return { category, name };
};

export const formatToNaira = (amount: number, dp?: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: dp ?? 0,
  }).format(amount);
};



export function formatDate(dateString: string) {
  // Parse the date string (MM/dd/yyyy format)
  const parsedDate = parse(dateString, "MM/dd/yyyy", new Date());

  // Format the parsed date as "dd MMMM, yyyy"
  return format(parsedDate, "do MMM, yyyy");
}

export const formatDateDShort = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export const errorMessage = {
  "Description is required":
    "You must fill the category description field in order to create a category",
  "Category name is required":
    "You must fill the category name field in order to create a category",
  "Product category is required": "Product must belong to a category",
  "Product name is required":
    "You must fill the product name field in order to create a product",
  "Product description is required":
    "You must fill the product description field in order to create a product",
  "Product quantity is required":
    "You must fill the product quantity field in order to create a product",
  "Product price is required":
    "You must fill the product price field in order to create a product",
  "Product quantity must be number":
    "Product quantity field can only contain numeric characters",
  "Product price must be number":
    "Product price field can only contain numeric characters",
  "Promotion name is required":
    "You must fill the promotion name field in order to create a promotion",
  "Promotion code is requiredd":
    "You must fill the promotion code field in order to create a promotion",
  "Promotion discount is required":
    "You must fill the promotion discount field in order to create a promotion",
  "Promotion discount must be numeric":
    "Promotion discount field can only contain numeric characters",
  "Promotion start date is required":
    "Promotion start date field must be filled in order to create a promotion",
  "Promotion end date is required":
    "Promotion end date field must be filled in order to create a promotion",
  "Promotion start time is required":
    "Promotion start time field must be filled in order to create a promotion",
  "Promotion end time is required":
    "Promotion end time field must be filled in order to create a promotion",
};


export function formatDateRange(startDate?: Date, endDate?: Date): string {
  if (!startDate || !endDate) {
    throw new Error("Both startDate and endDate must be provided.");
  }

  const startMonth = format(startDate, "MMM");
  const startDay = format(startDate, "d");
  const endMonth = format(endDate, "MMM");
  const endDay = format(endDate, "d");
  const year = format(endDate, "yyyy");

  if (isSameMonth(startDate, endDate)) {
    return `${startMonth} ${startDay} - ${endDay}, ${year}`;
  } else if (isSameYear(startDate, endDate)) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
  } else {
    const startYear = format(startDate, "yyyy");
    return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${year}`;
  }
}