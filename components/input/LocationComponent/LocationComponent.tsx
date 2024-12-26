import useAddress from "@/hooks/useAddress";
import useCountry from "@/hooks/useCountry";
import { Field, useFormikContext } from "formik";
import React, { ChangeEvent, FocusEvent } from "react";
import FormikNormalInput from "../formik-normal-input";
import FormikSelectInput from "../formik-select-input";
import { Grid } from "antd";
import FormikTextAreaInput from "../formik-textarea-input";

const { useBreakpoint } = Grid;

const LocationComponent: React.FC<{
  city: string;
  state: string;
  country: string;
  address: string;
  disabled?: boolean;
  align?: number;
}> = ({
  country,
  city: cName,
  state: sName,
  address,
  disabled = false,
  align,
}) => {
  const { countries } = useCountry();
  const { city, fetchCity, states } = useAddress();
  const { lg } = useBreakpoint();
  const { handleBlur, handleChange, setFieldValue, setFieldTouched } =
    useFormikContext();

  return (
    <>
      <div className="grid grid-cols-10 lg:pb-6 gap-x-6">
        <div className="col-span-5">
          <Field
            name={country}
            options={countries ?? []}
            as={FormikSelectInput}
            placeholder={"Select Country"}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
              setFieldValue(sName, "");
              setFieldValue(country, e.target.value);
            }}
            onBlur={(e: ChangeEvent<HTMLSelectElement>) => {
              handleBlur(e);
              setFieldTouched(country);
            }}
            disabled={disabled}
            align={align}
            y={7}
          />
        </div>

        <div className="col-span-5">
          <Field
            name={sName}
            options={states ?? []}
            as={FormikSelectInput}
            placeholder={"Select state"}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
              setFieldValue(cName!, "");
              fetchCity(e.target.value);
              setFieldValue(sName, e.target.value);
            }}
            onBlur={(e: FocusEvent<HTMLSelectElement>) => {
              handleBlur(e);
              setFieldTouched(sName);
            }}
            disabled={disabled}
            align={align}
            y={7}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-10 grid-cols-5 pb-6 gap-x-6">
        <div className="col-span-5">
          <Field
            name={cName}
            disabled={disabled}
            options={city ?? []}
            as={FormikSelectInput}
            placeholder={"Select City/Town"}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
              setFieldValue(cName!, e.target.value);
            }}
            onBlur={(e: FocusEvent<HTMLSelectElement>) => {
              handleBlur(e);
              setFieldTouched(cName!);
            }}
            align={align}
            y={7}
          />
        </div>

        <div className="col-span-5 lg:mt-0 mt-6">
          <Field
            name={address}
            as={lg ? FormikNormalInput : FormikTextAreaInput}
            placeholder={"House number and street name"}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
            }}
            onBlur={(e: FocusEvent<HTMLSelectElement>) => {
              handleBlur(e);
            }}
            align={lg ? -25 : -30}
            rows={-2}
            y={-14}
          />
        </div>
      </div>
    </>
  );
};

export default LocationComponent;
