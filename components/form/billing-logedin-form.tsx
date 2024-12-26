import { Field, Form, Formik } from "formik";
import React from "react";

import { AnotherAddressForm } from "./another-address-form";
import { SelectDeliveryAddressForm } from "./select-delivery-address-form";
import FormikRadioInput from "../input/formik-radio-input";
import { useQueryClient } from "@tanstack/react-query";
import { AddressCollapse } from "../address-collapse";

export const BillingLogedInForm = () => {
  const queryClient = useQueryClient();

  const handleChange = (
    key: string[] | string,
    fn: (field: string, value: string) => void,
  ) => {
    if (key[0]) {
      return fn("billing", key[0]);
    }
  };

  return (
    <Formik
      initialValues={{
        billing: "Select delivery address",
      }}
      validate={(value) => {
        const errors = {};
        queryClient.setQueryData(["BILLING"], value.billing);
        return errors;
      }}
      onSubmit={() => {}}
      enableReinitialize
      validateOnChange
      validateOnMount
    >
      {({ setFieldValue, values }) => (
        <Form>
          <AddressCollapse
            onChange={(key) => handleChange(key, setFieldValue)}
            data={[
              {
                key: "Select delivery address",
                label: (
                  <Field
                    name="billing"
                    as={FormikRadioInput}
                    value={values.billing}
                    options={[
                      {
                        id: "selectAddress",
                        name: "Select delivery address",
                        value: "Select delivery address",
                      },
                    ]}
                  />
                ),
                children: <SelectDeliveryAddressForm />,
              },
              {
                key: "Deliver to another address",
                label: (
                  <Field
                    name="billing"
                    as={FormikRadioInput}
                    value={values.billing}
                    options={[
                      {
                        id: "anotherAddress",
                        name: "Deliver to another address",
                        value: "Deliver to another address",
                      },
                    ]}
                  />
                ),
                children: <AnotherAddressForm />,
              },
            ]}
          />
        </Form>
      )}
    </Formik>
  );
};
