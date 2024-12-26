import React from "react";
import PromotionDetailView from "./group/promotion-detail-view";
import { IPromotion } from "./types";
import { EditPromotionForm } from "@/components/form/edit-promotion-form";

export const PromotionDetail: React.FC<{
  promotion: IPromotion,
  edit?: boolean
}> = ({ promotion, edit = false }) => {

  if (!edit ) {
  return (
   <PromotionDetailView promotion={promotion || null} />
  );
  }

  return <EditPromotionForm promotion={promotion} />
};
