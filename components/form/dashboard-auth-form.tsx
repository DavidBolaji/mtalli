"use client";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import FormikNormalInput from "../input/formik-normal-input";
import { ICON } from "@/constants/icon";
import { Button } from "../button/button";
import { useUser } from "@/hooks/use-user";
import * as Yup from "yup";

import Image from "next/image";
import { Images } from "@/constants/image";
import { useNotification } from "@/hooks/use-notification";
import { Spinner } from "../spinner";


const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const DashboardAuthForm = () => {
  const [type, setType] = useState<"password" | "text">("password");
  const { adminLogin } = useUser();
  const { toggleNotification } = useNotification();

  const togglePassword = () => {
    if (type === "password") return setType("text");
    setType("password");
  };

  const onSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>
  ) => {
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000))
    LoginValidation.validate(values)
      .then(() => {
        adminLogin({ email: values.email, password: values.password });
      })
      .catch((reason) => {
        toggleNotification({
          type: "error",
          title: "Validation Error",
          message: reason.message,
          show: true,
        });
       
      })
      .finally(() => {
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
      validateOnMount
      
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6 lg:w-[442px] w-full mx-auto  bg-white px-12 pt-20 pb-20 rounded-2xl">
          <div className="flex gap-x-2 items-center justify-center h-full mb-6">
            <Image
              alt="logo"
              src={Images.BlackLogo}
              width={120}
              height={40}
              priority
            />
            <div className="mt-4">|</div>
            <div className="mt-4">Admin Portal</div>
          </div>
          <div className="flex justify-center items-center">Login</div>
          <Field
            as={FormikNormalInput}
            name="email"
            placeholder="Your Email"
            leftIcon={<ICON.MailIcon size="14" />}
            className="w-full bg-red"
            align={-3}
            y={-14}
          />
          <Field
            as={FormikNormalInput}
            name="password"
            placeholder="Password"
            type={type}
            leftIcon={<ICON.KeyIcon size="14" />}
            rightIcon={
              <div onClick={togglePassword}>
                {type === "password" ? (
                  <ICON.EyeOffIcon size="14" />
                ) : (
                  <ICON.EyeIcon />
                )}
              </div>
            }
            align={-2}
            y={-14}
          />
          <Button
            disabled={isSubmitting}
            size="lg"
            color={isSubmitting ? "light" : "dark"}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? <Spinner /> : "Login"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
