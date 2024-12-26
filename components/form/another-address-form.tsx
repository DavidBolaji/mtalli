"use client";
import { Field, Form, Formik } from "formik";
import React from "react";
import FormikNormalInput from "../input/formik-normal-input";
import LocationComponent from "../input/LocationComponent/LocationComponent";
import { Typography } from "../typography/typography";
import FormikTextAreaInput from "../input/formik-textarea-input";
import { useQueryClient } from "@tanstack/react-query";

import { Checkbox } from "../ui/checkbox";
import { UserType, useUser } from "@/hooks/use-user";
export const initialIValLogedIn = (user: UserType) => ({
  email: user?.email ?? "",
  phone: user?.phone ?? "",
  fname: user?.fname ?? "",
  lname: user?.lname ?? "",
  country: "",
  state: "",
  city: "",
  address: "",
  extra: "",
  password: "",
  save: false,
  default: false,
});

export const AnotherAddressForm = () => {
  const queryClient = useQueryClient();
  const {user} = useUser()
  // Call the function to get the initial values object
  const initialValues = initialIValLogedIn(user as UserType);

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        queryClient.setQueryData(["ORDER_BILLING_LOGEDIN"], values);
        return errors;
      }}
      validateOnChange
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <Form className="mt-5 w-full">
          <div className="space-y-4 border mb-10 rounded-2xl border-[#DDEEE5] p-6 ">
            <Field
              as={FormikNormalInput}
              name="email"
              placeholder="Email"
              align={-3}
              y={-14}
            />
            <Field
              as={FormikNormalInput}
              name="phone"
              placeholder="Phone"
              align={-3}
              y={-14}
            />
            <div className="grid grid-cols-10 gap-x-4">
              <div className="col-span-5">
                <Field
                  as={FormikNormalInput}
                  name="fname"
                  placeholder="First Name"
                  align={-7}
                  y={-14}
                  />
              </div>
              <div className="col-span-5">
                <Field
                  as={FormikNormalInput}
                  name="lname"
                  placeholder="Last name"
                  align={-7}
                  y={-14}
                />
              </div>
            </div>
            <Field
              as={LocationComponent}
              city={"city"}
              state={"state"}
              country={"country"}
              address={"address"}
              align={-12}
              align2={-4}
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                id={"save"}
                name="save"
                value={String(values.save)}
                defaultChecked={values.save}

                onClick={() => setFieldValue("save", !values.save)}
              />
              <label
                htmlFor={"create"}
                className="text-sm leading-5 font-medium"
              >
                Save delivery address
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={"default"}
                name="default"
                value={String(values.default)}
                defaultChecked={values.default}
                onClick={() => setFieldValue("default", !values.default)}
              />
              <label
                htmlFor={"create"}
                className="text-sm leading-5 font-medium"
              >
                Set delivery address as default address
              </label>
            </div>
          </div>

          <Typography as="h6" size="h6" align="left" className="black-100 font-bold mb-4">
            Additional Information
          </Typography>

          <Field
            as={FormikTextAreaInput}
            name="extra"
            rows={5}
            placeholder="Provide additional information about the delivery"
            align={-50}
          />
        </Form>
      )}
    </Formik>
  );
};
