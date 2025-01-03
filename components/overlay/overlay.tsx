"use client";
import { useOverlay } from "@/hooks/use-overlay";
import React from "react";

export const Overlay = () => {
  const { overlay } = useOverlay();
  return overlay ?  <div className=" inset-0 bg-black/40" />: null;
};
