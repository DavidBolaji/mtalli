// formik-normal-input.tsx

import React, { InputHTMLAttributes, FocusEvent } from "react";
import { useField } from "formik";
import NormalInput from "./normal-input";

interface FormikInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  naira?: boolean
}

export default function FormikNormalInput({ placeholder, naira, ...rest }: FormikInputProps) {
  const [field] = useField(rest.name!);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    field.onBlur(e);
    if (rest.onBlur) rest.onBlur(e);
  };

  return (
    <NormalInput
    {...field}
    {...rest}
      naira={naira}
      onBlur={handleBlur}
      placeholder={placeholder}
    />
  );
}
