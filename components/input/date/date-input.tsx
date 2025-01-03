'use client';

import { DatePicker } from 'antd';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { DatePickerProps } from 'antd';
import { isEmpty } from 'lodash';

const StyledDatePicker = styled(DatePicker)`
  && > * {
    padding: 7px !important;
  }
  border: 0px solid red;
  border-radius: 30px;
  background-color: #F7FCFF !important;
`;

interface DateInputProps extends DatePickerProps {
  name: string;
  placeholder?: string;
}

const DateInput: FC<DateInputProps> = ({
  name,
  placeholder,
  className,
  defaultValue,
}) => {
  const { getFieldProps, setFieldTouched, setFieldValue, } = useFormikContext();

  const fieldProps = getFieldProps(name);
  const hasValue = !isEmpty(fieldProps?.value)

  if (!fieldProps) {
    return null;
  }

  const handleChange: DatePickerProps['onChange'] = (date, dateString) => {
    setFieldValue(name, dateString);
  };

  return (
    <div className="relative w-full rounded-[0.825rem] border-[#CCE2EE] border bg-black-500">
      {/* <label>hello</label> */}
      <AnimatePresence mode='wait'>
        <motion.label

          initial={{ y: 0, scale: 1, x: 0 }}
          animate={{
            y: hasValue ? -10 : 0,
            x: hasValue ? -5 : 0,
            scale: hasValue ? 0.7 : 1,
          }}
          exit={{ y: 0, scale: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className={`absolute ${hasValue ? 'z-50' : '-z-10'} left-4 black-300 top-2 text-xs pointer-events-none `}
        >
          {placeholder || 'Select date'}
        </motion.label>
      </AnimatePresence>
      <div className="rounded-[0.825rem]">
        <StyledDatePicker
          defaultValue={defaultValue}
          onBlur={() => {
            setFieldTouched(name, true);
          }}
          placeholder={placeholder}
          className={cn('w-full font-onest pt-5 outline-none placeholder:hidden placeholder:black-500', className)} // Add padding to accommodate floating label
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DateInput;
