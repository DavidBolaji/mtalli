
import { Toggle } from "@/components/input/toggle";
import { IEvent } from "@/components/table/event-table/types";
import { useQueryClient } from "@tanstack/react-query";

import { Field, Form, Formik } from "formik";
import React from "react";

type EventInventoryFormProps<T> = { 
  btnRef?: React.RefObject<HTMLButtonElement>, 
  event: IEvent | null | undefined,
  keyz: string,
  type?: keyof T;
}


export const EventInventoryForm = <T extends Record<string, any>>({btnRef, event, keyz}:
  EventInventoryFormProps<T>
) => {
  const queryClient = useQueryClient()
 
  return (
    <Formik
      initialValues={{
        status: event?.status === "ACTIVE" ? true : false,
      }}
      validate={(values: { status: boolean }) => {
        const errors = {};
        const { status } = values;
      
        const obj = {
          status
        };

        queryClient.setQueryData([keyz], (old: T) =>
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
      validateOnChange
      onSubmit={() => {}}
      enableReinitialize
    >
      {({resetForm}) => (
        <Form className="">
          <div className="mb-6">
            <Field as={Toggle} name="status" label="In active" />
          </div>
         
          <button type="button" onClick={() => {
            resetForm({
              values: {
                status: true
              }
            })
          }} ref={btnRef} className="hidden"></button>
        </Form>
      )}
    </Formik>
  );
};
