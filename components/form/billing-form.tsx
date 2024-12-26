"use client";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import FormikNormalInput from "../input/formik-normal-input";
import LocationComponent from "../input/LocationComponent/LocationComponent";
import { Typography } from "../typography/typography";
import FormikTextAreaInput from "../input/formik-textarea-input";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/hooks/use-user";
;
import { ICON } from "@/constants/icon";
import { Checkbox } from "../ui/checkbox";
import {BillingLogedInForm} from "./billing-logedin-form";
export const initialIVal = {
  email: "",
  phone: "",
  fname: "",
  lname: "",
  country: "",
  state: "",
  city: "",
  address: "",
  extra: "",
  password: "",
  create: false,
};

export const BillingForm = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [type, setType] = useState<"password" | "text">("password");

  const togglePassword = () => {
    if (type === "password") return setType("text");
    setType("password");
  };

  if (user?.id) {
    return <BillingLogedInForm />;
  }

  return (
    <Formik
      initialValues={initialIVal}
      validate={(values) => {
        const errors = {};
        queryClient.setQueryData(["ORDER_BILLING_NOT_LOGEDIN"], values);
        return errors;
      }}
      validateOnChange
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-6">
          <Field
            as={FormikNormalInput}
            name="email"
            placeholder="Email"
            align={-3}
            y={-13}
          />
          <Field
            as={FormikNormalInput}
            name="phone"
            placeholder="Phone"
            align={-3}
            y={-13}
          />
          <div className="grid grid-cols-10 gap-x-4">
            <div className="col-span-5">
              <Field
                as={FormikNormalInput}
                name="fname"
                placeholder="First Name"
                align={-7}
                y={-15}
              />
            </div>
            <div className="col-span-5">
              <Field
                as={FormikNormalInput}
                name="lname"
                placeholder="Last name"
                align={-7}
                y={-15}
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
            align2={-33}
          />
          <Typography as="h6" size="h6" align="left" className="black-100">
            Additional Information
          </Typography>

          <Field
            as={FormikTextAreaInput}
            name="extra"
            rows={5}
            placeholder="Provide additional information about the delivery"
            align={-50}
            y={-13}
          />

          <div className="bg-black-700 border-[#DDEEE5] rounded-2xl py-6 px-4">
            <Typography
              as="h6"
              size="h6"
              align="left"
              className="black-100 mb-2 font-bold"
            >
              Create an EranPro account.
            </Typography>
            <Typography
              as="p"
              size="s1"
              align="left"
              className="black-100 mb-2 font-medium text-[16px] leading-5"
            >
              To save your delivery address and order history, consider creating
              an EranPro.
            </Typography>
            <div className="my-6">
              <Field
                as={FormikNormalInput}
                name="password"
                type={type}
                placeholder="Password"
                y={-14}
                align={-2}
                leftIcon={<ICON.KeyIcon  size="14" />}
                rightIcon={
                  <div onClick={togglePassword}>
                    {type === "password" ? (
                      <ICON.EyeOffIcon size="14" />
                    ) : (
                      <ICON.EyeIcon  size="14" />
                    )}
                  </div>
                }
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={"create"}
                name="create"
                value={String(values.create)}
                defaultChecked={values.create}
                onClick={() => setFieldValue("create", !values.create)}
              />
              <label
                htmlFor={"create"}
                className="text-sm leading-5 font-medium"
              >
                Create an EranPro account
              </label>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
