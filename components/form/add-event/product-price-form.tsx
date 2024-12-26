import { ICreateProduct, IProduct } from "@/actions/get-products";
import FormikNormalInput from "@/components/input/formik-normal-input";
import FormikRadioInput from "@/components/input/formik-radio-input";
import FormikSelectInput from "@/components/input/formik-select-input";
import { usePromotions } from "@/hooks/use-promotion";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from "react";

const options = [
  { id: "Per kg", name: "Per kg", value: "Per kg" },
  { id: "Per item", name: "Per item", value: "Per item" },
];

const hash = {
  "PER_KG": "Per kg",
  "PER_ITEM": "Per item"
}


export const ProductPriceForm:React.FC<{  btnRef?: React.RefObject<HTMLButtonElement>, product: IProduct | undefined | null }> = ({btnRef, product}) => {
  const queryClient = useQueryClient();
  const isEdit = (product?.name?.length ?? 0) > 0 
  const {promotions} = usePromotions()

  console.log(product)

  return (
    <Formik
      initialValues={{
        unit: hash[product?.unit as keyof typeof hash]  ?? "Per kg",
        price: product?.price || "",
        promotion: product?.promotion[0]?.id ?? "",
      }}
      onSubmit={() => {}}
      validateOnBlur
      validateOnChange
      validate={(values: { unit: string; price: string, promotion: string }) => {
        const errors = {};
        const { unit, price, promotion } = values;
        const obj = {
          unit: unit.toUpperCase(),
          price: +price,
          promotion
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
      enableReinitialize
    >
      {({ values, resetForm }) => (
        <Form className="space-y-4">
          <Field
            as={FormikRadioInput}
            defaultValue={values.unit}
            name="unit"
            options={options}
           
          />
          <div className="grid grid-cols-6 gap-x-2">
            <div className="col-span-3">
              <Field
                as={FormikNormalInput}
                name="price"
                placeholder={`Price per unit`}
                align={-10}
                y={-14}
                required={false}
                naira
              />
            </div>
            <div className="col-span-3">
              <Field
                as={FormikSelectInput}
                name="promotion"
                options={promotions ?? []}
                placeholder={`Select promotion to apply`}
                required={false}
                align={-25}
                y={10}
              />
            </div>
          </div>
          <button type="button" onClick={() => {
            resetForm({
              values: {
                unit: "Per kg",
                price: "",
                promotion: "",
              }
            })
          }} ref={btnRef} className="hidden"></button>
        </Form>
      )}
    </Formik>
  );
};
