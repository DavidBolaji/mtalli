"use client";
import React, { useEffect } from "react";
import FormikNormalInput from "../input/formik-normal-input";
import { Field, Form, Formik } from "formik";


import * as Yup from "yup";
import { Typography } from "../typography/typography";

import { useQueryClient } from "@tanstack/react-query";

import { Toggle } from "../input/toggle";
import { Promotion } from "../table/promotions-table/types";
import { IPromotion } from "@/app/dashboard/(routes)/promotions/[promotionId]/components/types";
import { format } from "date-fns";
export const promotionSchema = Yup.object().shape({
    name: Yup.string().required("First name is required"),
    code: Yup.string().required("Last name is required"),
    discount: Yup.string().required("Phone is required"),
    startDate: Yup.array().optional(),
    startTime: Yup.array().optional(),
    endDate: Yup.array().optional(),
    endTime: Yup.array().optional(),
});

const initial = (promotion?: IPromotion) => ({
    name: promotion?.name ?? "",
    type: "Item",
    code: promotion?.code ?? "",
    discount: String(promotion?.discount) ?? "",
    startDate: format(promotion?.startDate ?? "", "yyyy-MM-dd") ?? "", 
    startTime: format(promotion?.startDate ?? "", "HH:mm") ?? "",
    endDate: format(promotion?.endDate ?? "", "yyyy-MM-dd") ?? "", 
    endTime: format(promotion?.endDate ?? "", "HH:mm") ?? "",
    status: promotion?.status ?? true,
});

export const EditPromotionForm: React.FC<{
    promotion: IPromotion
}> = ({ promotion }) => {
    const queryClient = useQueryClient();
    const initialValues = initial(promotion)

    useEffect(() => {
        if (promotion) {
            const userCopy = { ...promotion };
            queryClient.setQueryData(["CREATE_PROMOTION"], userCopy);
        }


    }, [promotion, queryClient]);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={() => { }}
            validate={(values: typeof initialValues) => {
                const errors = {};
                queryClient.setQueryData(
                    ["CREATE_PROMOTION"],
                    (old: Promotion | undefined) => {
                        if (old) {
                            return {
                                ...old,
                                ...values,
                            };
                        }

                        return {
                            ...values,
                        };
                    }
                );
                return errors;
            }}
            validateOnChange
            enableReinitialize
            key={promotion?.id}
        >
            {({ values }) => (
                <Form className="w-full bg-white rounded-2xl p-6">
                    <div className="flex justify-between">
                        <Typography
                            as="p"
                            size="s1"
                            align="left"
                            className="mb-[14px] black-100"
                        >
                            Promotion Details
                        </Typography>
                        <div className="">
                            <Field as={Toggle} name="status" label="Activate" />
                        </div>
                    </div>
                    <div className=" w-full space-y-4">

                        <Field
                            as={FormikNormalInput}
                            name="name"
                            placeholder="Promotion name"
                            align={-12}
                            y={-14}
                        />
                        <Field
                            as={FormikNormalInput}
                            name="code"
                            placeholder="Promotion code"
                            align={-11}
                            y={-14}
                        />
                        <Field
                            as={FormikNormalInput}
                            name="discount"
                            placeholder="Percentage discount"
                            align={-15}
                            y={-14}
                        />
                        <div className="flex gap-x-4">
                            <Field
                                as={FormikNormalInput}
                                name="startDate"
                                placeholder="Start date"
                                defaultValue={values.startDate}
                                type="date"
                                align={-3}
                                y={-14}
                            />
                            <Field
                                as={FormikNormalInput}
                                name="endDate"
                                placeholder="End date"
                                defaultValue={values.endDate}
                                type="date"
                                align={-3}
                                y={-14}
                            />
                        </div>
                        <div className="flex gap-x-4">
                            <Field
                                as={FormikNormalInput}
                                name="startTime"
                                placeholder="Start time"
                                defaultValue={values.startTime}
                                type="time"
                                align={-5}
                                y={-16}
                            />
                            <Field
                                as={FormikNormalInput}
                                name="endTime"
                                placeholder="End time"
                                defaultValue={values.endTime}
                                type="time"
                                align={-5}
                                y={-16}
                            />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
