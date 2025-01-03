import FormikNormalInput from "@/components/input/formik-normal-input";
import FormikTextAreaInput from "@/components/input/formik-textarea-input";
import { IcreateEvent, IEvent } from "@/components/table/event-table/types";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from "react";

import DateInput from "@/components/input/date/date-input";
import { usePromotions } from "@/hooks/use-promotion";
import FormikSelectInput from "@/components/input/formik-select-input";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useCountry from "@/hooks/useCountry";

dayjs.extend(customParseFormat);

// dayjs.extend(utc);

export const EventDetailsForm: React.FC<{
  btnRef?: React.RefObject<HTMLButtonElement>,
  event: IEvent | null | undefined,
  keyz: string
}> = ({ btnRef, event, keyz }) => {
  const queryClient = useQueryClient();
  const { promotions } = usePromotions();
  const {countries} = useCountry()

  const init = {
    title: event?.title ?? "",
    description: event?.description ?? "",
    location: event?.location ?? "",
    price: event?.price || "",
    totalSlots: event?.totalSlots ?? "",
    serviceFee: String(event?.serviceFee || "") || "",
    startDate: event?.startDate || "",
    endDate: event?.endDate || "",
    promotion: event?.promotion[0]?.id ?? "",
  }

  return (
    <Formik
      initialValues={init}
      onSubmit={() => { }}
      validateOnBlur
      validate={(values: typeof init) => {
        const errors: Partial<typeof init> = {};

        const obj = {
          ...values
        };
        queryClient.setQueryData([keyz], (old: IcreateEvent) =>
          old
            ? {
              ...old,
              ...obj,
            }
            : {
              ...obj,
            }
        );
        return errors;
      }}
      enableReinitialize
    >
      {({ resetForm, values }) => (
        <Form className="grid grid-cols-12 gap-4">
          <div className="col-span-6 space-y-4">
            <Field
              as={FormikNormalInput}
              name="title"
              placeholder="Title"
              align={-2}
              y={-14}
              required
            />

            <Field
              as={FormikSelectInput}
              options={countries ?? []}
              name="location"
              placeholder="Location"
              align={-5}
              y={7}
              required
            />

            <Field
              as={FormikNormalInput}
              name="price"
              placeholder="Travel Fee"
              align={-8}
              y={-14}
              required
            />

            <Field
              as={FormikTextAreaInput}
              name="description"
              placeholder="Description"
              align={-11}
              // y={-18}
              rows={3}
              required
            />
          </div>
          <div className="col-span-6 space-y-4 mt-0.5">
            <Field
              as={FormikNormalInput}
              name="totalSlots"
              placeholder="Available Slots"
              align={-12}
              y={-14}
              required
            />
            <span className="flex gap-x-3">
              <Field
                name="startDate"
                as={DateInput}
                picker="date"
                placeholder="Start Date"
                defaultValue={values.startDate ? dayjs(values.startDate.toLocaleString()): null}
              />
              <Field
                name="endDate"
                as={DateInput}
                picker="date"
                placeholder="End date"
                defaultValue={values.endDate ? dayjs(values.endDate.toLocaleString()): null}
              />
            </span>
            <Field
              as={FormikNormalInput}
              name="serviceFee"
              placeholder="Service Fee"
              align={-10}
              y={-14}
              required
            />
            <Field
              as={FormikSelectInput}
              name="promotion"
              options={promotions ?? []}
              placeholder="Select Promotion"
              required={false}
              align={-10}
              y={10}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              resetForm({
                values: {
                  title: "",
                  description: "",
                  location: "",
                  price: "",
                  totalSlots: "",
                  startDate: "",
                  serviceFee: "",
                  endDate: "",
                  promotion: event?.promotion[0]?.id ?? "",
                },
              });
            }}
            ref={btnRef}
            className="hidden"
          ></button>
        </Form>
      )}
    </Formik>
  );
};
