"use client";
import React, { useEffect } from "react";
import FormikNormalInput from "../input/formik-normal-input";
import { Field,  Form, Formik } from "formik";
import { IUser } from "@/actions/get-customers";
import { useQueryClient } from "@tanstack/react-query";

export const EditCustomerForm: React.FC<{
  user: IUser | null;
  disabled?: boolean,
  order?: boolean,
  reset?: number,
  customer?: boolean
}> = ({ user, disabled = false, reset }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      const userCopy = {...user};
      delete (userCopy as { orders?: unknown }).orders
      // Update the query data in the query client
      queryClient.setQueryData(['EDIT_CUSTOMER'], userCopy);
    }
  }, [user, queryClient]);

  return (
    <Formik
    initialValues={{
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      fname: user?.fname ?? "",
      lname: user?.lname ?? "",
    }}
      onSubmit={() => {}}
      validate={(values) => {
        const errors = {};
        queryClient.setQueryData(['EDIT_CUSTOMER'], (old: IUser | undefined) => {
          if (old) {
            return {
              ...old,
              ...values,
              userId: user?.id,
            };
          }
      
          return {
            ...values,
            userId: user?.id,
          };
        });
      
        return errors
      }}
      validateOnChange
      enableReinitialize
      key={user?.id ?? reset ?? 0}
    >
      {({ }) => (
        <Form className="w-full">
          <div className="bg-white w-full py-6 px-4 rounded-2xl space-y-4">
            <Field
              as={FormikNormalInput}
              name="email"
              placeholder="Email Address"
              align={-9}
              y={-14}
              disabled={disabled}
              focus
            />
            <Field
              as={FormikNormalInput}
              name="phone"
              placeholder="Phone number"
              align={-11}
              y={-14}
            />
            <div className="flex justify-between items-center gap-x-4">
              <Field
                as={FormikNormalInput}
                name="fname"
                placeholder="First name"
                align={-7}
                y={-14}
              />
              <Field
                as={FormikNormalInput}
                name="lname"
                placeholder="Last name"
                align={-7}
                y={-14}
              />
            </div>
          </div>
        
        </Form>
      )}
    </Formik>
  );
};
