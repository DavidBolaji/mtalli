// formik-normal-input.tsx

import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import NormalInput2 from "./normal-input2";

interface FormikInputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
}

export default function FormikNormalInput2({ placeholder, ...rest }: FormikInputProps) {
    const [field] = useField(rest.name!);

    return (
        <NormalInput2
            {...field}
            {...rest}
            placeholder={placeholder}
        />
    );
}
