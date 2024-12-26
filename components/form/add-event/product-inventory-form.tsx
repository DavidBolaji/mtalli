import { ICreateProduct, IProduct } from "@/actions/get-products";
import FormikNormalInput from "@/components/input/formik-normal-input";
import { Toggle } from "@/components/input/toggle";
import { useQueryClient } from "@tanstack/react-query";

import { Field, Form, Formik } from "formik";
import React from "react";

export const ProductInentoryForm:React.FC<{  btnRef?: React.RefObject<HTMLButtonElement>, product: IProduct | null | undefined }> = ({btnRef, product}) => {
  const queryClient = useQueryClient()
  const isEdit = (product?.name?.length ?? 0) > 0 
  return (
    <Formik
      initialValues={{
        stock: product?.stock ?? true,
        qty:String(product?.qty ?? 0) ?? "",
      }}
      validate={(values: { stock: boolean; qty: string }) => {
        const errors = {};
        const { stock, qty } = values;
        console.log('[STOCK]', stock)
        const obj = {
          stock,
          qty: +qty,
        };
        queryClient.setQueryData([isEdit ? "EDIT_PRODUCT" : "CREATE_PRODUCT"], (old: ICreateProduct) =>
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
            <Field as={Toggle} name="stock" label="In stock" />
          </div>
          <Field
            as={FormikNormalInput}
            name="qty"
            placeholder="Quantity in stock"
            align={-12}
            y={-14}
          />
          <button type="button" onClick={() => {
            resetForm({
              values: {
                stock: true,
                qty: ""
              }
            })
          }} ref={btnRef} className="hidden"></button>
        </Form>
      )}
    </Formik>
  );
};
