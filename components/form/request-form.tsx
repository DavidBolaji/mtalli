"use client";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";

import { Button } from "../button/button";
import * as Yup from "yup";
import { useNotification } from "@/hooks/use-notification";

import { Spinner } from "../spinner";
import FormikNormalInput2 from "../input/formik-normal-input2";
import FormikTextAreaInput from "../input/formik-textarea-input";
import { useRequestModal } from "@/hooks/use-request-modal";
import { useAxios } from "@/hooks/use-axios";

const RequestValidation = Yup.object().shape({
    email: Yup.string()
        .matches(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
            "Please enter a valid email address"
        )
        .required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    body: Yup.string().required("Body is required"),
});

export const RequestForm: React.FC<{ btnTxt?: string }> = ({ btnTxt }) => {
    const { toggleNotification } = useNotification();
    const {toggleModal} = useRequestModal()
    const Axios = useAxios()

    const onSubmit = async (
        values: { email: string; subject: string, body: string },
        { setSubmitting }: FormikHelpers<{ email: string; subject: string, body: string }>
    ) => {
        const {email, subject, body} = values
        setSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000))
        RequestValidation.validate(values)
            .then(async () => {
              await Axios.post('/send-email', {email, subject, text: body })
               toggleModal(false);

               toggleNotification({
                type: "success",
                title: "Mail sent",
                message: "Request has been sent successfully",
                show: true,
            });

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
                subject: "",
                body: "",
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
                        name="subject"
                        placeholder="Your Subject"
                        label={'Subject'}
                        className="w-full"
                    />
                    <div>
                        <label htmlFor={'body'}
                            className="font-onest inline-block pl-1 mb-2 font-semibold text-base black-100"
                        >Text</label>
                        <Field
                            as={FormikTextAreaInput}
                            name="body"
                            placeholder="Enter text"
                            label={'Body'}
                            rows={4}
                        />
                    </div>
                    <Button
                        size="lg"
                        color={isSubmitting ? "light" : "dark"}
                        type="submit"
                        className="w-full translate-y-5"
                    >
                        {isSubmitting ? <Spinner /> : btnTxt ? btnTxt : "Submit Request"}
                    </Button>

                </Form>
            )}
        </Formik>
    );
};
