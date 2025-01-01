"use client";

import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

// Define InputProps, adding optional rightIcon, leftIcon, and align props.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const NormalInput2: React.FC<InputProps> = ({
    label,
    ...rest
}) => {


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, placeholder, onBlur, ...props } = rest;
    props.required = props.required ?? false; // Use nullish coalescing to ensure `required` is true if not provided.

    // Optimize input style classes with classNames utility.
    const inputStyle = classNames(
        "w-full h-12 pl-4 font-onest placeholder:font-medium placeholder:black-300 placeholder:leading-4 bg-transparent flex items-center focus:outline-none",
        className
    );

    return (
        <div>
            <label htmlFor={rest.name}
                className="font-onest inline-block pl-1 mb-2 font-semibold text-base black-100"
            >{label}</label>

            <div
                className={`relative h-12 w-full overflow-hidden border border-[#CCE2EE] rounded-2xl`}>
                <input
                    type="text"
                    className={inputStyle}
                    placeholder={placeholder}
                    {...props}
                />

            </div>
        </div>
    );
};

export default NormalInput2;
