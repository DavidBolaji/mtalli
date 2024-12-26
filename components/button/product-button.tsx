"use client";
import React from "react";
import { Button } from "./button";
import { ShoppingCartIcon } from "@/constants/icons/shopping-cart";
import { useCartData } from "@/hooks/use-cart-data";
import { IProduct } from "@/actions/get-products";
import StepperTwo from "../card/product-stepper-two";
import { useQueryClient } from "@tanstack/react-query";

export const ProductButton:React.FC<{product: IProduct & { weight: number }}> = ({product}) => {
    const { addProduct } = useCartData();
    const queryClient = useQueryClient();

  const handleAdd = () => {
    const qty = queryClient.getQueryData(["CART_QTY"]);
    addProduct({...product, weight: qty as number ?? product.unit === "PER_KG" ? 0.5: 1.0});
  };

  return (
    <div className="flex gap-x-2 ">
      <StepperTwo weight={product?.weight ?? 0.5} product={product} />
      <Button
        onClick={handleAdd}
        iconR={ShoppingCartIcon}
        color="dark"
        size="lg"
      >
        Add to cart
      </Button>
    </div>
  );
};
