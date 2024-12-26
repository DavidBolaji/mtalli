import React, { SelectHTMLAttributes, FocusEvent } from "react";
import { useField } from "formik";
import SelectInput from "./select-input";

interface FormikInput extends SelectHTMLAttributes<HTMLSelectElement> {
  placeholder: string;
  options: { label: string; value: string }[];
}

export default function FormikSelectInput({
  placeholder,
  options,
  ...rest
}: FormikInput) {
  const [field] = useField(rest.name!);

  const handleBlur = (e: FocusEvent<HTMLSelectElement>) => {
    field.onBlur(e); // Calls Formik's onBlur to update Formik state
    if (rest.onBlur) rest.onBlur(e); // Calls the original onBlur from SelectInput if provided
  };

  const handleChange = (e: FocusEvent<HTMLSelectElement>) => {
    field.onChange(e); 
    
    if (rest.onChange) rest.onChange(e); 
  };

  return (
    <SelectInput
      options={options}
      {...field}
      {...rest}
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}
