"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export const useBookDrawer = () => {
  const queryClient = useQueryClient();

  if (!queryClient.getQueryData(["BOOK_DRAWER"])) {
    queryClient.setQueryData(["BOOK_DRAWER"], false);
  }

  const toggleDrawer = (isOpen: boolean) => {
    queryClient.setQueryData(["BOOK_DRAWER"], () => isOpen);
  };

  const { data: bookDrawer } = useQuery({
    queryKey: ["BOOK_DRAWER"],
    queryFn: () => queryClient.getQueryData(["BOOK_DRAWER"]),
    staleTime: Infinity,
  });
  return { toggleDrawer, bookDrawer };
};
