import React, { RefObject } from "react";
import { useField } from "formik";

interface RadioOption {
  id: string;        
  name: string;     
  value: string;     
  label?: string;
}

interface CustomRadioInputProps {
  name: string;
  options: RadioOption[];
  col?: boolean;
  rev?: boolean;
  onChange?: (value: string) => void;  // Optional custom onChange handler
  btnRef?: RefObject<HTMLInputElement>
}

const FormikRadioInput: React.FC<CustomRadioInputProps> = ({ name, col = false, rev = false, options, onChange, btnRef, ...rest }) => {
  const [field,, helpers] = useField(name); 
  const { setValue } = helpers;

  const handleChange = (value: string) => {

    setValue(value);  // Update Formik state
    if (onChange) {
      onChange(value);  // Call custom onChange if provided
    }
  };

  return (
    <div className={`flex ${col && 'flex-col'}`}>
      {options.map((option, idx) => (
        <div key={option.id} className={`mr-3 mt-1 ${rev && `w-full ${idx < options.length - 1 && "border-b"}`}`}>
          <input
            ref={btnRef}
            type="radio" 
            id={option.id} // Unique ID for each radio button
            name={option.name} // Unique name if needed per FieldArray item
            value={option.value}
            checked={field.value === option.value}
            onChange={() => handleChange(option.value)}
            // onClick={() => handleChange(option.value)}
            {...rest}
            className="hidden"
          />
          <label
            htmlFor={option.id} // Associate label with unique ID
            className={`cursor-pointer flex w-full gap-2 ${rev ? 'justify-between items-center': "flex-row-reverse"}`}
          >
            <span className="font-medium inline-block text-[16px] leading-5 black-100">
              {option?.label || option.value}
            </span>
            {rev && field.value === option.value && <span className="font-medium italic inline-block text-[16px] leading-5 black-300">
              Default
            </span>}
            <div
              className={`w-5 h-5  rounded-full border-2 flex items-center justify-center ${
                field.value === option.value
                  ? "border-black bg-black"
                  : "border-[#C8E0D2] bg-black-500"
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default FormikRadioInput;
