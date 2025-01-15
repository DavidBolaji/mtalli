"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export const useRequestModal = () => {
  const queryClient = useQueryClient();


  if (!queryClient.getQueryData(["REQUEST_MODAL"])) {
    queryClient.setQueryData(["REQUEST_MODAL"], false);
  }

  const toggleModal = (isOpen: boolean) => {
    queryClient.setQueryData(["REQUEST_MODAL"], () => isOpen);
  };

  const { data: requestModal } = useQuery({
    queryKey: ["REQUEST_MODAL"],
    queryFn: () => queryClient.getQueryData(["REQUEST_MODAL"]) as boolean,
    staleTime: Infinity,
  });
  return { toggleModal, requestModal };
};