"use client";

import { useField } from "formik";
import { useEffect, useState } from "react";

interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLButtonElement>, "type"> {
  name: string;
  label?: string;
  valuez?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ name, label, valuez }) => {
  const [, , helpers] = useField(name);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSlide = () => {
    setIsEditing((prev: boolean) => {
      console.log(!prev);
      helpers.setValue(!prev);
      return !prev;
    });
  };

  useEffect(() => {
    console.log(valuez || true);
    if (valuez) {
      setIsEditing(valuez);
    } else {
      setIsEditing(false);
    }
  }, [valuez]);

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
      <div
        onClick={handleSlide}
        className={`relative h-4 w-8 border border-[#92B09F] overflow-hidden transition-colors delay-100 duration-300 rounded-full snap-both ${
          isEditing ? "bg-[#DDEEE5]" : "bg-[#E7E7E7]"
        }`}
      >
        <div
          className={`w-3 h-3 absolute top-[1px]  bg-[#066932] transition-transform duration-300 rounded-full shadow-inner ${
            isEditing ? "translate-x-4" : "translate-x-0.5"
          }`}
        ></div>
      </div>
    </div>
  );
};
