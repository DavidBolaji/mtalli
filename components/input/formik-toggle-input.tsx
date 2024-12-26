import * as React from "react";
import { useField } from "formik";
import { Switch } from "antd";
import { cn } from "@/lib/utils";

interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLButtonElement>, "type"> {
  name: string;
  label?: string;
}

export default function FormikToggleInput({
  name,
  label,
  className,
//   ...props
}: ToggleProps) {
  const [field, , helpers] = useField(name);
//   const {onChange, ...rest} = props

  return (
    <div className="flex items-center space-x-2">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <Switch 
       id={name}
       checked={field.value}
       style={{
        backgroundColor: field.value ? "#DDEEE5" : "#E7E7E7",
      }}
      className={cn(
        "relative inline-flex items-center border border-[#92B09F] rounded-full cursor-pointer",
        "transition-colors duration-300 ease-in-out",
        className
      )}
      onChange={(checked: boolean) => {
          helpers.setValue(checked);
        }}
     
        />
     
    </div>
  );
}
