"use client"
import { TrashIcon } from "@/constants/icons/trash";
import { useCartData } from "@/hooks/use-cart-data";
import React from "react";

export const CartDeleteButton: React.FC<{ productId: string }> = ({
  productId,
}) => {
  const { deleteProduct } = useCartData();
  return (
    <div className="cursor-pointer" onClick={() => deleteProduct(productId)}>
      <TrashIcon color="#6E8C7B" />
    </div>
  );
};
