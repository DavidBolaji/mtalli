"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type INotification = {
    show: boolean;
    message: string;
    title: string;
    type: "error" | "success" | "info"
  }

export const useNotification = () => {
  const queryClient = useQueryClient();

  if (!queryClient.getQueryData(["NOTIFICATION_DRAWER"])) {
    queryClient.setQueryData(["NOTIFICATION_DRAWER"], {
      show: false,
      title: "",
      message: "",
      type: "error"
    });
  }

  const toggleNotification = (data:INotification) => {
    queryClient.setQueryData(["NOTIFICATION_DRAWER"], () => data);
  };

  const close = () => {
    queryClient.setQueryData(["NOTIFICATION_DRAWER"], {
        show: false,
        title: "",
        message: "",
        type: "error"
      });
  }

  const { data: notificationDrawer } = useQuery({
    queryKey: ["NOTIFICATION_DRAWER"],
    queryFn: () => queryClient.getQueryData(["NOTIFICATION_DRAWER"]) as INotification,
    staleTime: Infinity,
  });
  return { toggleNotification, notificationDrawer, close };
};
