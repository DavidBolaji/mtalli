"use client";
import React from "react";
import { Button } from "./button";
import { ShoppingCartIcon } from "@/constants/icons/shopping-cart";
import { CartCount } from "../header/components/cart-count";
import { useCartDrawer } from "@/hooks/use-cart-drawer";

export const CartButton = () => {
  const { toggleDrawer } = useCartDrawer();

  const handleToggle = () => {
    toggleDrawer(true);
  };
  return (
    <Button
      iconL={ShoppingCartIcon}
      className="bg-black-600 border-0"
      iconR={() => <CartCount />}
      size="lg"
      color="light"
      onClick={handleToggle}
    >
      Cart
    </Button>
  );
};
