import { Spin } from "antd";
import { Loader } from "lucide-react";
import React from "react";

export const Spinner = () => {
  return (
    <Spin
      indicator={<Loader color="#7DBA00" className="animate-spin" />}
      spinning
      className="text-[#7DBA00]"
    />
  );
};
