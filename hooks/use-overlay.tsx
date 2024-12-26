"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useOverlay = () => {
  const queryClient = useQueryClient();

  if (!queryClient.getQueryData(["OVERLAY"])) {
    queryClient.setQueryData(["OVERLAY"], false);
  }

  const toggleOverlay = (isOpen: boolean) => {
    queryClient.setQueryData(["OVERLAY"], () => isOpen);
  };

  const { data: overlay } = useQuery({
    queryKey: ["OVERLAY"],
    queryFn: () => queryClient.getQueryData(["OVERLAY"]),
    staleTime: Infinity,
  });
  return { toggleOverlay, overlay };
};
