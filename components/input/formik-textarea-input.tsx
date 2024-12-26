import React, {  TextareaHTMLAttributes } from "react";
import { useField } from "formik";
import TextAreaInput from "./textarea-input";

type FormikInput = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function FormikTextAreaInput({ placeholder ,...rest }: FormikInput) {
  const [field] = useField(rest.name!);

  return <TextAreaInput {...field} {...rest}  placeholder={placeholder} />;
}