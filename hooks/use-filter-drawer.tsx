"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export const useFilterDrawer = () => {
  const queryClient = useQueryClient();

  if (!queryClient.getQueryData(["FILTER_DRAWER"])) {
    queryClient.setQueryData(["FILTER_DRAWER"], false);
  }

  const toggleDrawer = (isOpen: boolean) => {
    queryClient.setQueryData(["FILTER_DRAWER"], () => isOpen);
  };

  const { data: filterDrawer } = useQuery({
    queryKey: ["FILTER_DRAWER"],
    queryFn: () => queryClient.getQueryData(["FILTER_DRAWER"]),
    staleTime: Infinity,
  });
  return { toggleDrawer, filterDrawer };
};
