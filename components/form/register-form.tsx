"use client";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { Button } from "../button/button";
import * as Yup from "yup";
import { useNotification } from "@/hooks/use-notification";
import { useUser } from "@/hooks/use-user";
import { Spinner } from "../spinner";
import FormikNormalInput2 from "../input/formik-normal-input2";


export const RegisterValidation = Yup.object({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

interface IRegister {
  email: string;
  fname: string;
  lname: string;
  password: string;
  confirm_password: string;
}

export const RegisterForm: React.FC<{ btnTxt?: string }> = ({ btnTxt }) => {
  const { toggleNotification } = useNotification();
  const { register, loading } = useUser();


  const onSubmit = async (
    values: IRegister,
    { setSubmitting }: FormikHelpers<IRegister>
  ) => {
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000))

    RegisterValidation.validate(values)
      .then(async () => {
        register({ data: {email: values.email, password: values.password, fname: values.fname, lname: values.lname}, redirect: btnTxt ? false : true });
        setSubmitting(false);
      })
      .catch((reason) => {
        toggleNotification({
          type: "error",
          title: "Validation Error",
          message: reason.message,
          show: true,
        });
        setSubmitting(false);
      })
  };

  return (
    <Formik
      initialValues={{
        email: "",
        fname: "",
        lname: "",
        password: "",
        confirm_password: "",
      }}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnChange

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

          <div className="flex w-full gap-x-4">
            <div className="w-full">
              <Field
                as={FormikNormalInput2}
                name="fname"
                placeholder="First name"
                label={'First name'}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Field
                as={FormikNormalInput2}
                name="lname"
                placeholder="Last name"
                label={'Last name'}
                className="w-full"
              />
            </div>
          </div>

          <Field
            as={FormikNormalInput2}
            name="password"
            placeholder="Password"
            type={'password'}
            label={'Password'}

          />
          <Field
            as={FormikNormalInput2}
            name="confirm_password"
            placeholder="Confirm Password"
            type={'password'}
            label={'Password'}

          />
          <Button
            size="lg"
            color={isSubmitting ? "light" : "dark"}
            type="submit"
            className="w-full translate-y-5"
          >
            {isSubmitting || loading ? <Spinner /> : btnTxt ? btnTxt : "Sign Up"}
          </Button>

        </Form>
      )}
    </Formik>
  );
};
