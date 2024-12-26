"use client";
import React, { useEffect } from "react";
import { Button } from "./button";
import { ShoppingCartIcon } from "@/constants/icons/shopping-cart";
import { ArrowUpRightIcon } from "@/constants/icons/arrow-up-right";
import { useCartData } from "@/hooks/use-cart-data";
import { IProduct } from "@/actions/get-products";
import { useRouter } from "next/navigation";

export const CardButton: React.FC<{ product: IProduct & {weight?: number} }> = ({ product }) => {
  const router = useRouter();
  const { addProduct } = useCartData();

  useEffect(() => {
    router.prefetch(`/product/${product.id}`);
  }, [product, router]);

  const handleAdd = () => {
    addProduct(product as unknown as IProduct & {weight: number});
  };

  const navigate = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <>
      <Button
        onClick={handleAdd}
        iconR={ShoppingCartIcon}
        type="button"
        size="lg"
        color="light"
        className="w-full flex items-center justify-center"
      >
        Add To Cart
      </Button>
      <Button
        onClick={navigate}
        iconR={ArrowUpRightIcon}
        type="button"
        size="lg"
        color="dark"
        className="w-full flex items-center justify-center"
      >
        Buy Now
      </Button>
    </>
  );
};
