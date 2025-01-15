"use client";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";

import { Button } from "../button/button";
import { useUser } from "@/hooks/use-user";
import * as Yup from "yup";
import { useNotification } from "@/hooks/use-notification";

import { Spinner } from "../spinner";
import FormikNormalInput2 from "../input/formik-normal-input2";
import { FormattedMessage } from "react-intl";

const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginForm:React.FC<{btnTxt?: string}> = ({btnTxt}) => {
  const { login } = useUser();
  const { toggleNotification } = useNotification();

  const onSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>
  ) => {
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000))
    LoginValidation.validate(values)
    .then(() => {
      login({ data: {email: values.email, password: values.password }, redirect: btnTxt ? false : true });
    })
    .catch((reason) => {
      toggleNotification({
        type: "error",
        title: "Validation Error",
        message: reason.message,
        show: true,
      });

    }).finally(() => {
      setSubmitting(false);
    });
    
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
      validateOnChange
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6 w-full">
          <Field
            as={FormikNormalInput2}
            name="email"
            placeholder="Your Email"
            label={'Email'}
            className="w-full"
          />
          <Field
            as={FormikNormalInput2}
            name="password"
            placeholder="Password"
            type={'password'}
            label={'Password'}

          />
            <Button
              size="lg"
              color={isSubmitting ? "light" : "dark"}
              type="submit"
              className="w-full translate-y-5"
            >
              {isSubmitting ? <Spinner /> : btnTxt ? 
              <FormattedMessage id={btnTxt} />
             : <FormattedMessage id={"Log in"} />}
            </Button>
         
        </Form>
      )}
    </Formik>
  );
};
