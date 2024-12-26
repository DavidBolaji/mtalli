import React, { useState, FocusEvent, TextareaHTMLAttributes } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  align?: number 
}

const TextAreaInput: React.FC<InputProps> = ({
  rightIcon,
  leftIcon,
  align =  -15,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!rest.value);

  const { className, onBlur, ...prop } = rest;
  prop.required = prop.required ? prop.required : false

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    setHasValue(Boolean(e.target.value)); // Update `hasValue` only if a value is selected.
    if (onBlur) onBlur(e); // Call external onBlur if provided
  };


  const inputStyle = classNames(
    "w-full pl-4 pt-1 bg-transparent font-onest resize-none placeholder:text-transparent translate-y-4 flex items-center focus:outline-none",
    {
      "pl-10": leftIcon,
      "pl-3": !leftIcon,
    },
    {
      "pr-10": rightIcon,
      "pr-3": !rightIcon,
    },
    {
      "placeholder:text-transparent": isFocused || hasValue,
    },
    className
  );

  return (
    <div className={`relative w-full border pb-5 bg-black-500 border-[#CCE2EE] bg-grey-200 rounded-2xl`}>
      {/* Left Icon */}
      {leftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {leftIcon}
        </div>
      )}

      {/* Input Field */}
      <textarea
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={inputStyle}
        {...prop}
      />

      {/* Floating Label */}
      <motion.label
        initial={{ y: 20, scale: 1 }}
        animate={{
          y: isFocused || hasValue ? -10 : 0,
          x: isFocused || hasValue ? align : 0,
          scale: isFocused || hasValue ? 0.7 : 1,
        }}
        transition={{ type: "linear", stiffness: 200 }}
        className={`absolute left-${
          leftIcon ? 20 : 3
        } top-3 black-300 text-nowrap pointer-events-none black-300 font-medium ${
          isFocused || hasValue ? "text-[16px]" : "text-sm"
        }`}
      >
        {prop.placeholder} {prop.required && "*"}
      </motion.label>

      {/* Right Icon */}
      {rightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default TextAreaInput;
