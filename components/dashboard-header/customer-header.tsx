"use client";
import React, { useState } from "react";
import { Button } from "../button/button";
import { useMutation } from "@tanstack/react-query";
import { Grid } from "antd";
import { useAxios } from "@/hooks/use-axios";
import { useParams } from "next/navigation";
import { useNotification } from "@/hooks/use-notification";
import { AxiosError } from "axios";
import { Spinner } from "../spinner";

const { useBreakpoint } = Grid;

export const CustomerTitleHeader: React.FC<{
  title: string;
  discardKey?: string;
  addItem: () => void;
  save: boolean;
  load?: boolean;
}> = ({ title, addItem, save, load }) => {
  const screen = useBreakpoint();
  const {toggleNotification} = useNotification()
  const [loading, setLoading] = useState(false)

  const param = useParams()
  const Axios = useAxios()

  const {mutate: handleDeactivate } = useMutation({
    mutationKey: ['UPDATE_USER'],
    mutationFn: async () => {
      setLoading(true)
      return await Axios.put('/user/deactivate', {id: param?.customerId})
    },
    onSuccess: () => {
      toggleNotification({
        type: "success",
        title: "Deactivation successfull",
        message: "User has been deactivated successfully",
        show: true
      })
    },
    onError: (error) => {
      toggleNotification({
        type: "success",
        title: "Deactivation Error",
        message: (error as AxiosError<{message: string}>).response?.data.message ?? "Something went wrong",
        show: true
      })
    },
    onSettled: () => setLoading(false)
  })

  const discard = () => {
   handleDeactivate()
  };

  const add = () => {
    addItem();
  };

  return (
    <div className="flex lg:flex-row flex-col lg:items-center justify-between mb-8 bg-white px-4 py-[19px] rounded-2xl border border-[#DDEEE5]">
      <h1 className="text-2xl font-semibold text-left lg:mb-0 mb-4">{title}</h1>
      <div className="flex gap-3">
        <Button disabled={loading || load} size="lg" color="light" className="text-sm font-medium flex items-center justify-center border border-[#011D2E] black-100" onClick={discard}>
          { loading ? <Spinner /> : screen.lg ? "Deactivate Customer Account" : "Deactivate"}
        </Button>
        <Button
          size="lg"
          color={!save ? "light" : "dark"}
          className=" font-onest text-sm font-medium flex items-center text-white justify-center border border-[#011D2E]"
          onClick={add}
        >
          {!save
            ? screen.lg
              ? "Edit Customer Details"
              : "Edit Details"
            : load
            ? <Spinner /> : screen.lg ? "Save Customer Details"
            : "Save Details"}
        </Button>
      </div>
    </div>
  );
};
