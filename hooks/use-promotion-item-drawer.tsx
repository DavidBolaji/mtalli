"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export const usePromotionItemDrawer = () => {
  const queryClient = useQueryClient();


  if (!queryClient.getQueryData(["PROMOTION_ITEM_DRAWER"])) {
    queryClient.setQueryData(["PROMOTION_ITEM_DRAWER"], false);
  }

  const toggleDrawer = (isOpen: boolean) => {
    queryClient.setQueryData(["PROMOTION_ITEM_DRAWER"], () => isOpen);
  };

  const { data: categoryDrawer } = useQuery({
    queryKey: ["PROMOTION_ITEM_DRAWER"],
    queryFn: () => queryClient.getQueryData(["PROMOTION_ITEM_DRAWER"]),
    staleTime: Infinity,
  });
  return { toggleDrawer, categoryDrawer };
};
