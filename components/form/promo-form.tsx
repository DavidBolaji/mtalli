import React, { useState } from "react";
import FormikNormalInput from "../input/formik-normal-input";
import { Field, Form, Formik } from "formik";
import { Button } from "../button/button";
import { useAxios } from "@/hooks/use-axios";
import { useCartData } from "@/hooks/use-cart-data";
import { useNotification } from "@/hooks/use-notification";
import { AxiosError } from "axios";
import { Spinner } from "../spinner";


export const PromoForm = () => {
  const Axios = useAxios()
  const { applyPromotion } = useCartData();
  const { toggleNotification } = useNotification()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: { code: string }) => {
    setLoading(true)
    try {
      const promotion = await Axios.get(`/promotion/${values.code}`)
      // alert(JSON.stringify(promotion.data, null, 2))
      applyPromotion(promotion.data)

    } catch (error) {
      toggleNotification({
        type: "error",
        show: true,
        title: "Coupoun Error",
        message: (error as AxiosError<{ message: string }>).response?.data.message ?? "Something went wrong"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Formik
      initialValues={{
        code: "",
      }}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ }) => (
        <Form className="flex items-center gap-x-4">
          <Field
            as={FormikNormalInput}
            name="code"
            placeholder="Enter Promo code"
            y={-14}
          />
          <Button size="lg" color="light" className="border-0 bg-black-600">
            {loading ? <Spinner /> : "Apply Code"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
