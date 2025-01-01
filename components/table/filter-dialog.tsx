// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { FilterCollapse } from "./filter-collapse";
import { Category } from "@prisma/client";
import { X } from "lucide-react";
import { } from "date-fns";

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  categories?: Pick<Category, "id" | "name">[];
  onFilter: (form: FormData, params: URLSearchParams, path?: string) => void;
  calender?: boolean;
  payment?: boolean;
  status?: boolean;
  pStatus?: boolean;
  pType?: boolean;
  post?: boolean;
  calenderTxt?: string
}

export default function FilterDialog({
  open,
  onClose,
  onFilter,
  categories,
  calender,
  payment,
  status,
  post,
  pStatus,
  pType,
  calenderTxt
}: FilterDialogProps) {
  const searchParams = useSearchParams();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    if (dateFrom && dateTo) {
      const adjustedFrom = dateFrom ? new Date(dateFrom) : undefined;
      const adjustedTo = dateTo ? new Date(dateTo) : undefined;

      if (adjustedFrom) adjustedFrom.setDate(adjustedFrom.getDate() - 1);
      if (adjustedTo) adjustedTo.setDate(adjustedTo.getDate() - 1);
      setDate({
        from: adjustedFrom,
        to: adjustedTo,
      });
    }
  }, [searchParams]);

  const isChecked = (name: string, value: string) => {
    // console.log(name, value)
    const paramValues = searchParams.getAll(name); // Get all values for the parameter
    // console.log(paramValues)
    return paramValues.includes(value); // Check if the value is in the list
  };

  const handleFilter = (formData: FormData) => {
    if (date) {
      const adjustedFrom = date.from ? new Date(date.from) : undefined;
      const adjustedTo = date.to ? new Date(date.to) : undefined;

      if (adjustedFrom) adjustedFrom.setDate(adjustedFrom.getDate() + 1);
      if (adjustedTo) adjustedTo.setDate(adjustedTo.getDate() + 1);
      formData.append("dateFrom", adjustedFrom?.toISOString() || "");
      formData.append("dateTo", adjustedTo?.toISOString() || "");
      formData.append("dateTo", adjustedTo?.toISOString() || "");
    }
    onFilter(formData, searchParams);
  };

  const handleReset = () => {
    // Clear the selected date range
    setDate(undefined);

    // Uncheck all checkboxes in the form
    const form = btnRef.current?.form as HTMLFormElement | null;
    if (form) {
      const checkboxes = form.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]'
      );
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }

    // Append empty date fields
    const formData = new FormData();
    // formData.append("dateFrom", "");
    // formData.append("dateTo", "");
    // Ensure `dateFrom` and `dateTo` are cleared from the current params
    const params = new URLSearchParams(searchParams);
    params.delete("dateFrom");
    params.delete("dateTo");
    onFilter(formData, params);

    // Trigger Apply to reset filters
    btnRef.current?.click();
    onFilter(formData, params);
    // Optionally close the dialog
    onClose();
  };

  if (!open) return null;

  return (
    <div className="flex items-start justify-center pt-12">
      <div className="bg-white rounded-lg shadow-lg px-6 w-[372px]">
        <div className="flex items-center pb-2 justify-between pt-6">
          <h2 className="font-semibold pl-0.5 font-onest">Manage Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form action={handleFilter}>
          <FilterCollapse
            data={[
              ...(status
                ? [
                  {
                    key: "8",
                    label: "Status",
                    children: (
                      <div className="pt-2">
                        <div className="space-y-2">
                          {[
                            { id: "478894", name: "Pending" },
                            { id: "478894", name: "Delivered" },
                            { id: "478894", name: "Canceled" },
                          ]?.map((status) => (
                            <div
                              key={status.id}
                              className="flex items-center space-x-2 font-onest"
                            >
                              <Checkbox
                                id={status.name.toLowerCase()}
                                name="Status[]"
                                value={status.name}
                                defaultChecked={isChecked(
                                  `status`,
                                  status.name
                                )}
                              />
                              <label
                                htmlFor={status.name.toLowerCase()}
                                className="text-sm leading-5 font-medium"
                              >
                                {status.name}
                              </label>
                            </div>
                          ))}
                        </div>
                        {/* <button className="hidden" type="submit" ref={btnRef} /> */}
                      </div>
                    ),
                  },
                ]
                : []),

                ...(post
                  ? [
                    {
                      key: "111",
                      label: "Status",
                      children: (
                        <div className="pt-2">
                          <div className="space-y-2">
                            {[
                              { id: "478894", name: "Published" },
                              { id: "478894", name: "Draft" },
                             
                            ]?.map((status) => (
                              <div
                                key={status.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={status.name.toLowerCase()}
                                  name="Cstat[]"
                                  value={status.name}
                                  defaultChecked={isChecked(
                                    `cStat`,
                                    status.name
                                  )}
                                />
                                <label
                                  htmlFor={status.name.toLowerCase()}
                                  className="text-sm leading-5 font-medium"
                                >
                                  {status.name}
                                </label>
                              </div>
                            ))}
                          </div>
                          {/* <button className="hidden" type="submit" ref={btnRef} /> */}
                        </div>
                      ),
                    },
                  ]
                  : []),

              ...(categories
                ? [
                  {
                    key: "1",
                    label: "Categories",
                    children: (
                      <div className="pt-2">
                        <div className="space-y-2">
                          {categories?.map((category) => (
                            <div
                              key={category.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={category.name.toLowerCase()}
                                name="Categories[]"
                                value={category.name}
                                defaultChecked={isChecked(
                                  `category`,
                                  category.name
                                )}
                              />
                              <label
                                htmlFor={category.name.toLowerCase()}
                                className="text-sm leading-5 font-medium"
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  },
                ]
                : []),

                ...(pStatus
                  ? [
                    {
                      key: "3903",
                      label: "Promotion status",
                      children: (
                        <div className="pt-2">
                          <div className="space-y-2">
                            {[
                              { id: "45656", name: "Active" },
                              { id: "7856", name: "Complete" },
                              { id: "785678", name: "Cancelled" },
                            ]?.map((stat) => (
                              <div
                                key={stat.id}
                                className="flex items-center space-x-2"
                              >
                               
                                <Checkbox
                                  id={stat.name.toLowerCase()}
                                  name="Pstat[]"
                                  value={stat.name}
                                  defaultChecked={isChecked(
                                    `pStat`,
                                    stat.name
                                  )}
                                />
                                <label
                                  htmlFor={stat.name.toLowerCase()}
                                  className="text-sm leading-5 font-medium"
                                >
                                  {stat.name}
                                </label>
                              </div>
                            ))}
                          </div>
                          {/* <button className="hidden" type="submit" ref={btnRef} /> */}
                        </div>
                      ),
                    },
                  ]
                  : []),
                  
              ...(pType
                ? [
                  {
                    key: "2829",
                    label: "Promotion Type",
                    children: (
                      <div className="pt-2">
                        <div className="space-y-2">
                          {[
                            { id: "56", name: "Category" },
                            { id: "75", name: "Item" },
                          ]?.map((promo) => (
                            <div
                              key={promo.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={promo.name.toLowerCase()}
                                name="PromoT[]"
                                value={promo.name}
                                defaultChecked={isChecked(
                                  `promoT`,
                                  promo.name
                                )}
                              />
                              <label
                                htmlFor={promo.name.toLowerCase()}
                                className="text-sm leading-5 font-medium"
                              >
                                {promo.name}
                              </label>
                            </div>
                          ))}
                        </div>
                        {/* <button className="hidden" type="submit" ref={btnRef} /> */}
                      </div>
                    ),
                  },
                ]
                : []),

              ...(calender
                ? [
                  {
                    key: "2",
                    label: pType ? "Date range": calenderTxt ? calenderTxt : "Last order date range",
                    children: (
                      <div className="-ml-4 scale-[0.95] translate-y-2">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={1}
                          // fromYear={2000} // Set your desired start year here
                          // toYear={2030} // Set your desired end year here
                          // captionLayout="dropdown-buttons" // Enables dropdowns for month/year
                          className="w-full max-w-lg" // Adjust width as needed
                        />
                      </div>
                    ),
                  },
                ]
                : []),

              ...(payment
                ? [
                  {
                    key: "39028",
                    label: "Categories",
                    children: (
                      <div className="pt-2">
                        <div className="space-y-2">
                          {[
                            { id: "45656", name: "Debit Card" },
                            { id: "7856", name: "Pay on Delivery" },
                          ]?.map((payment) => (
                            <div
                              key={payment.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={payment.name.toLowerCase()}
                                name="Payment[]"
                                value={payment.name}
                                defaultChecked={isChecked(
                                  `payment`,
                                  payment.name
                                )}
                              />
                              <label
                                htmlFor={payment.name.toLowerCase()}
                                className="text-sm leading-5 font-medium"
                              >
                                {payment.name}
                              </label>
                            </div>
                          ))}
                        </div>
                        {/* <button className="hidden" type="submit" ref={btnRef} /> */}
                      </div>
                    ),
                  },
                ]
                : []),  
            ]}
          />
          <button className="hidden" type="submit" ref={btnRef} />
        </form>
        <div className="my-6 rounded-b-lg flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="rounded-full border-0 bg-black-600"
          >
            Reset
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="rounded-full"
              onClick={() => btnRef.current?.click()}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
