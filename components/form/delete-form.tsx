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

const DeleteValidation = Yup.object().shape({
    text: Yup.string()
        .matches(
            /^DELETE$/,
            "Please enter DELETE to confirm"
        )
        .required("text is required"),
});

export const DeleteForm = () => {
    const { deleteUser } = useUser();
    const { toggleNotification } = useNotification();

    const onSubmit = async (
        values: { text: string },
        { setSubmitting }: FormikHelpers<{ text: string }>
    ) => {
        setSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log(values)
        DeleteValidation.validate(values)
            .then(() => {
                deleteUser(true)
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
                text: "",
            }}
            onSubmit={onSubmit}
            validateOnChange
            enableReinitialize
        >
            {({ isSubmitting }) => (
                <Form className="space-y-6 w-full">
                    <Field
                        as={FormikNormalInput2}
                        name="text"
                        label={<FormattedMessage id="Type 'DELETE' to delete account" />}
                        className="w-full"
                    />

                    <div className="flex ml-auto w-72">
                        <Button
                            size="lg"
                            color={isSubmitting ? "light" : "dark"}
                            type="submit"
                            className="w-full translate-y-5 text-sm"
                        >
                            {isSubmitting ? <Spinner /> : <FormattedMessage id="Confirm Account Deletion" />}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
