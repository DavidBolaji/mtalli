import { getCategories } from "@/actions/get-categories";
import { ICreateProduct } from "@/actions/get-products";
import FormikSelectInput from "@/components/input/formik-select-input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React, { ChangeEvent } from "react";


export const ProductCategoryForm: React.FC<{ btnRef?: React.RefObject<HTMLButtonElement>, categoryId?: string | null | undefined }> = ({ btnRef, categoryId }) => {
  const queryClient = useQueryClient();
  const { data: category } = useQuery({
    queryKey: ['CATEGORIES'],
    queryFn: async () => await getCategories()
  })

  const isEdit = (categoryId && categoryId?.length > 0) ?? 0  

  const categoryList = category?.map(el => ({
    label: el.name,
    value: el.id
  }))

  return (
    <Formik
      initialValues={{
        categoryId:  categoryId ?? "",
      }}
      onSubmit={() => { }}
      enableReinitialize
    >
      {({ resetForm, setFieldValue }) => (
        <Form className="space-y-4">
          <Field
            as={FormikSelectInput}
            name="categoryId"
            options={categoryList ?? []}
            placeholder="Select category"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const categoryId = e.target.value;
              const obj = {
                categoryId
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
              setFieldValue("categoryId", categoryId)
            }}
            align={-13}
            y={11}
          />
          <button type="button" onClick={() => {
            resetForm({
              values: {
                categoryId: ""
              }
            })
          }} ref={btnRef} className="hidden"></button>
        </Form>
      )}
    </Formik>
  );
};