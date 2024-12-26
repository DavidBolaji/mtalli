"use client";
import React, { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";
import FormikNormalInput from "../input/formik-normal-input";
import { Field, FieldArray, Form, Formik } from "formik";
import { Button } from "../button/button";
import { ICON } from "@/constants/icon";
import { IUser } from "@/actions/get-customers";
import { Address } from "@prisma/client";

import { Typography } from "../typography/typography";
import { Plus } from "lucide-react";
import TextAreaInput from "../input/textarea-input";
import FormikRadioInput from "../input/formik-radio-input";
import FormikSelectInput from "../input/formik-select-input";
import useCountry from "@/hooks/useCountry";
import useAddress from "@/hooks/useAddress";
import { useQueryClient } from "@tanstack/react-query";
import { UserUploadComponent } from "@/app/(home)/(routes)/orders/components/user-upload-component";


const options = [{ name: true, value: true, label: "Set as default" }];

export const EditCustomerForm: React.FC<{
  user: IUser | null;
  address: Address[] | null;
  disabled?: boolean,
  order?: boolean,
  reset?: number,
  customer?: boolean
}> = ({ user, address, disabled = false, order = false, reset, customer = true }) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const { countries } = useCountry();
  const { fetchCity, states } = useAddress();
  const queryClient = useQueryClient();
  const [processedAddresses, setProcessedAddresses] = useState<
    Array<Address & { cityOption: unknown }>
  >([]);

  
  useEffect(() => {
    const processAddresses = async () => {
      if (address) {
        const processed = await Promise.all(
          address.map(async (el) => ({
            ...el,
            cityOption: await fetchCity(el?.state) ?? [],
          }))
        );
        setProcessedAddresses(processed);
      }
    };

    processAddresses();
  }, []);

  useEffect(() => {
    if (user) {
      
      const userCopy = {...user};

      delete (userCopy as { orders?: unknown }).orders
  
      // Update the query data in the query client
      queryClient.setQueryData(['EDIT_CUSTOMER'], userCopy);
    }
  }, [user, queryClient]);

  return (
    <Formik
    initialValues={{
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      fname: user?.fname ?? "",
      lname: user?.lname ?? "",
      address: processedAddresses,
    }}
      onSubmit={() => {}}
      validate={(values) => {
        const errors = {};
        queryClient.setQueryData(['EDIT_CUSTOMER'], (old: IUser | undefined) => {
          if (old) {
            return {
              ...old,
              ...values,
              address: [...values.address], // Ensure the latest address array is used
              userId: user?.id,
            };
          }
      
          return {
            ...values,
            userId: user?.id,
          };
        });
      
        return errors
      }}
      validateOnChange
      enableReinitialize
      key={user?.id ?? reset ?? 0}
    >
      {({ values, setFieldValue, handleBlur, setFieldTouched }) => (
        <Form className="w-full">
          <div className="bg-white w-full py-6 px-4 rounded-2xl space-y-4">
            <Field
              as={FormikNormalInput}
              name="email"
              placeholder="Email Address"
              align={-9}
              y={-14}
              disabled={disabled}
              focus
            />
            <Field
              as={FormikNormalInput}
              name="phone"
              placeholder="Phone number"
              align={-11}
              y={-14}
            />
            <div className="flex justify-between items-center gap-x-4">
              <Field
                as={FormikNormalInput}
                name="fname"
                placeholder="First name"
                align={-7}
                y={-14}
              />
              <Field
                as={FormikNormalInput}
                name="lname"
                placeholder="Last name"
                align={-7}
                y={-14}
              />
            </div>
          </div>
          {!order ? customer ?  <div className="bg-white mt-6 px-4 lg:hidden block py-6 rounded-2xl">
            <UserUploadComponent view customer={customer} />
          </div>: null: null}
          <div className="bg-white mt-6 py-6 px-4 rounded-2xl space-y-4">
            <div className="flex lg:flex-row flex-col justify-between items-start lg:items-center">
              <Typography
                as="p"
                size="s1"
                align="left"
                className="mb-[14px] black-100"
              >
                Delivery Information
              </Typography>
              <Button
                className="h-9 flex items-center justify-center"
                size="lg"
                color="light"
                type="button"
                onClick={() => order && values.address.length === 1 ? {}: btnRef.current?.click()}
              >
                <span className="border border-black l-2 rounded-full h-5 w-5 flex items-center justify-center">
                  <Plus className="h-4 w-4" color="black" />
                </span>
                <span className="ml-2">Add Delivery Address</span>
              </Button>
            </div>
            <FieldArray name="address">
              {({ push, remove }) => (
                <>
                  {values.address.map((_, ind) => {
                    return (
                      <div
                        key={ind}
                        className="relative bg-grey-200 p-4 rounded-2xl space-y-6"
                      >
                        <div className="flex mb-[14px] justify-between items-center">
                          <Typography
                            as="p"
                            size="s1"
                            align="left"
                            className="black-100"
                          >
                            Delivery address {ind + 1}
                          </Typography>

                          <span
                            className="cursor-pointer"
                            onClick={() => remove(ind)}
                          >
                            <ICON.TrashIcon color="#E83B3B" />
                          </span>
                        </div>
                        <Field
                          name={`address[${ind}].country`}
                          options={countries ?? []}
                          defaultValue={values.address[ind]?.country}
                          as={FormikSelectInput}
                          placeholder={"Country"}
                          align={-5}
                          y={9}
                          onChange={async (
                            e: ChangeEvent<HTMLSelectElement>
                          ) => {
                            const country = e.target.value;
                            setFieldValue(`address[${ind}].country`, country);
                            setFieldValue(`address[${ind}].state`, "");
                            setFieldValue(`address[${ind}].city`, "");
                            // fetchState(country);
                          }}
                          onBlur={(e: ChangeEvent<HTMLSelectElement>) => {
                            handleBlur(e);
                            setFieldTouched(`address[${ind}].country`);
                          }}
                        />
                        <Field
                          name={`address[${ind}].address`}
                          as={FormikNormalInput}
                          placeholder="House number and street name"
                          align={-27}
                          y={-15}
                        />
                        <div className="flex items-center justify-between gap-x-4">
                          <Field
                            name={`address[${ind}].state`}
                            as={FormikSelectInput}
                            placeholder="State"
                            defaultValue={values.address[ind].state}
                            align={-3}
                            y={9}
                            options={states ?? []}
                            onChange={async (
                              e: ChangeEvent<HTMLSelectElement>
                            ) => {
                              const state = e.target.value;
                              setFieldValue(`address[${ind}].state`, state);

                              const city = await fetchCity(state);
                              setFieldValue(`address[${ind}].cityOption`, city);
                            }}
                            onBlur={(e: FocusEvent<HTMLSelectElement>) => {
                              handleBlur(e);
                              setFieldTouched(`address[${ind}].state`);
                            }}
                          />

                          <Field
                            name={`address[${ind}].city`}
                            as={FormikSelectInput}
                            placeholder={"Town / City"}
                            defaultValue={values.address[ind].city}
                            align={-9}
                            y={9}
                            options={values?.address[ind]?.cityOption ?? []}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                              setFieldValue(
                                `address[${ind}].city`,
                                e.target.value
                              );
                            }}
                            onBlur={(e: FocusEvent<HTMLSelectElement>) => {
                              handleBlur(e);
                              setFieldTouched(`address[${ind}].city`);
                            }}
                          />
                        </div>
                        <Field
                          name={`address[${ind}].info`}
                          as={TextAreaInput}
                          placeholder="Additional information about the delivery"
                          rows={3}
                          align={-41}
                        />
                        <div className="flex justify-end">
                          <Field
                            name={`address[${ind}].active`}
                            as={FormikRadioInput}
                            defaultValue={values.address[ind].active}
                            value={values.address[ind].active}
                            options={options.map((option) => ({
                              ...option,
                              id: `${option.value}-${ind}`,
                              name: `address[${ind}].active`,
                            }))}
                            onChange={() => {
                              // Set the current address as active and reset others

                              values.address.forEach((_, i) =>
                                setFieldValue(`address[${i}].active`, i === ind)
                              );
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <button
                    className="hidden"
                    ref={btnRef}
                    onClick={() => {
                      const hasActive = values.address.find((el) => el.active);
                      push({
                        country: "",
                        state: "",
                        city: "",
                        address: "",
                        info: "",
                        active: hasActive ? false : true,
                        cityOption: [],
                      });
                    }}
                  >
                    h
                  </button>
                </>
              )}
            </FieldArray>
            {values.address.length > 0 && (
              <div className="flex items-center justify-center w-full">
                <Button
                  disabled={order && values.address.length === 1}
                  className=" flex items-center justify-center"
                  size="lg"
                  color="light"
                  type="button"
                  onClick={() => order && values.address.length === 1 ? {}: btnRef.current?.click()}
                >
                  <span className="border border-black rounded-full h-5 w-5 flex items-center justify-center">
                    <Plus className="h-4 w-4" color="black" />
                  </span>
                  <span className="ml-2">Add Delivery Address</span>
                </Button>
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};
