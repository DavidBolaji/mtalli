import { useUser } from "@/hooks/use-user";
import { Field, Formik } from "formik";
import React, { useEffect } from "react";
import FormikRadioInput from "../input/formik-radio-input";
import { Empty } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { Address } from "@prisma/client";

export const SelectDeliveryAddressForm = () => {
  const { user } = useUser();
  const queryClient =  useQueryClient()
  const defaultAdd = user?.orderAddress.find((el) => el.active);
  const addressList = user?.orderAddress.map((address: Address) => ({
    id: address.id,
    name: "Select delivery address",
    label: (
      <div className="flex flex-col space-y-1 pb-4 capitalize">
        <span className="font-medium black-100 font-onest">{address.address},</span>
        <span className="font-medium black-100 font-onest">{address.city},</span>
        <span className="font-medium black-100 font-onest">{address.state},</span>
        <span className="font-medium black-100 font-onest">{address.country}.</span>
      </div>
    ),
    value: address.id,
  }));

  useEffect(() => {
    const fn = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      queryClient.setQueryData(["ADDRESS_ID"],  defaultAdd?.id);
    }
    fn()
  }, [])

  return user?.orderAddress.length ? (
    <Formik
      onSubmit={() => {}}
      initialValues={{
        address: defaultAdd?.id,
      }}
      validate={(values) => {
        const errors = {};
        queryClient.setQueryData(["ADDRESS_ID"], values.address);
        return errors;
      }}
      validateOnChange
      enableReinitialize
    >
      {({ values }) => (
        <div className="border mt-5 p-6 rounded-2xl">
          <Field
            as={FormikRadioInput}
            value={values.address}
            name="address"
            options={addressList}
            rev
            col
          />
        </div>
      )}
    </Formik>
  ) : (
    <div className="py-10 mt-4 rounded-2xl border">
      <Empty />
    </div>
  );
};
