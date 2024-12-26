"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export const useCategoryDrawer = () => {
  const queryClient = useQueryClient();

  if (!queryClient.getQueryData(["CATEGORY_DRAWER"])) {
    queryClient.setQueryData(["CATEGORY_DRAWER"], false);
  }

  const toggleDrawer = (isOpen: boolean) => {
    queryClient.setQueryData(["CATEGORY_DRAWER"], () => isOpen);
  };

  const { data: categoryDrawer } = useQuery({
    queryKey: ["CATEGORY_DRAWER"],
    queryFn: () => queryClient.getQueryData(["CATEGORY_DRAWER"]),
    staleTime: Infinity,
  });
  return { toggleDrawer, categoryDrawer };
};
