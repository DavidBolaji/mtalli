"use client";

import { IUser } from "@/actions/get-customers";
import { CustomerTitleHeader } from "@/components/dashboard-header/customer-header";
import { useAxios } from "@/hooks/use-axios";
import { useNotification } from "@/hooks/use-notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ViewCustomer({
  customer,
  save = false,
}: {
  customer: IUser | null;
  save?: boolean;
}) {
  const router = useRouter();
  const Axios = useAxios();
  const queryClient = useQueryClient()
  const {toggleNotification} = useNotification()
  const [loading, setLoading] = useState(false)

  const {mutate} = useMutation({
    mutationKey: ['UPDATE_USER'],
    mutationFn: async() => {
      setLoading(true)
      const user = queryClient.getQueryData(['EDIT_CUSTOMER'])
      return await Axios.patch('/user/admin', user)
    },
    onSuccess: () => {
      toggleNotification({
        type: "success",
        message: "Customer details udated successfully",
        show: true,
        title: "Update Successfull"
      })
    },
    onError: (error) => {
      toggleNotification({
        type: "error",
        message: (error as AxiosError<{message: string}>).response?.data.message ?? "Somthing went wrong",
        show: true,
        title: "Update Error"
      })
    },
    onSettled: () => setLoading(false)
  })

  const action = () => {
    if (!save) {
      return router.push(`/dashboard/customers/${customer?.id}/edit`);
    }
    mutate()
  };

  const detail = (customer?.fname && customer?.fname?.length) && (customer?.lname && customer?.lname?.length) ?` ${customer?.fname} ${customer?.lname}` : customer?.email

  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      {/* Header */}
      <CustomerTitleHeader
        title={detail}
        discardKey="ADD_PRODUCT"
        addItem={action}
        save={save}
        load={loading}
      />
    </div>
  );
}
