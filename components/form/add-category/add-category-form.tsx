"use client"

import { Button } from "@/components/button/button";
import FormikNormalInput from "@/components/input/formik-normal-input";
import FormikTextAreaInput from "@/components/input/formik-textarea-input";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { addCategorySchema } from "./category-validation";
// import { useAddCategory } from "@/hooks/use-add-category";
import { Icategories } from "./types";
import { useNotification } from "@/hooks/use-notification";
import { errorMessage } from "@/utils/helper";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/spinner";
;

export const AddCategoryForm = () => {
  // const { createCategory, isPending, } = useAddCategory();
  const { toggleNotification } = useNotification();
  const queryClient = useQueryClient();

  const close = () => {
    queryClient.setQueryData(["CATEGORY_DRAWER"], () => false);
  };

  const discard = (fn: ({}) => void) => {
    fn({
      values: {
        name: "",
        description: ""
      }
    });
    close();
  }


  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
      }}
      onSubmit={(values: Icategories, {setSubmitting}: FormikHelpers<Icategories>) => {
        addCategorySchema
          .validate(values)
          .then(() => {
            // createCategory(values);
          })
          .catch((reason) => {
            console.log(reason?.message);
            const errorList = String(reason)?.split(":");
            toggleNotification({
              show: true,
              title: errorList[1],
              type: "error",
              message:
                errorMessage[errorList[1].trim() as keyof typeof errorMessage],
            });
          }).finally(() => {
            close();
            setSubmitting(false)
          });
      }}
      enableReinitialize
    >
      {({isSubmitting, resetForm}) => (
        <Form className="space-y-4">
          <Field
            as={FormikNormalInput}
            name="name"
            placeholder="Product name"
            align={-10}
            y={-14}
          />
          <Field
            as={FormikTextAreaInput}
            name="description"
            placeholder="Product description"
            align={-18}
            rows={4}
          />
          <div className="flex justify-end space-x-4">
            <Button onClick={() => discard(resetForm)} disabled={isSubmitting} type="button" color="light" size="lg">
              Discard
            </Button>
            
            <Button disabled={isSubmitting} type="submit"  color={isSubmitting ? "light" : "dark"} size="lg">
            {isSubmitting ? <Spinner /> : "Add Category"}
              
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
