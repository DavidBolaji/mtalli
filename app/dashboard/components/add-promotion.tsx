"use client";

import { Card } from "@/components/ui/card";

import { DashboardTitleHeader } from "@/components/dashboard-header/dashboard-header";

import { Typography } from "@/components/typography/typography";

import { Button } from "@/components/button/button";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorMessage } from "@/utils/helper";
import { useNotification } from "@/hooks/use-notification";
import { useAxios } from "@/hooks/use-axios";

import { PromotionForm } from "@/components/form/promotion-form";
import { usePromotionItemDrawer } from "@/hooks/use-promotion-item-drawer";

import { Promotion } from "@/components/table/promotions-table/types";

import { SelectPromotionType } from "./select-promotion-type";
import { allPromotionSchema } from "@/components/form/promotion-schema";

import { useEffect, useState } from "react";
import { IEvent } from "@/components/table/event-table/types";
// Promotion & { product: (Product & {images: Image[]})[] | null } & {category: Category[] | null} | null
export default function AddPromotions() {
  const { toggleNotification } = useNotification();
  const { toggleDrawer: toggleItemDrawer } = usePromotionItemDrawer();
  const queryClient = useQueryClient();
  const Axios = useAxios();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    queryClient.setQueryData(["SELECT_CATEGORY"], [])
    queryClient.setQueryData(["SELECT_ITEM"], [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const router = useRouter()
  const { mutate } = useMutation({
    mutationKey: ["CREATE_PROMOTION"],
    mutationFn: async () => {
      setLoading(true)
      const path = getPath();
      const ids: string[] = [];
      const promotion = queryClient.getQueryData(["CREATE_PROMOTION"]) as Promotion;
      const isCat = path.type.toLocaleLowerCase() === "category";
      if (isCat) {
        const catData = queryClient.getQueryData(["SELECT_CATEGORY"]) as {
          label: string;
          value: string;
          key: string;
        }[];

        if (!catData.length) {
          setLoading(false)
          return toggleNotification({
            type: "error",
            title: "Validation Error",
            message:
              "Promotion cannot be applied to null product. Please select product",
            show: true,
          });
        }
        catData?.forEach((el) => ids.push(el.value));
      } else {
        const catData = queryClient.getQueryData([
          "SELECT_ITEM",
        ]) as (IEvent & {
          weight: number;
        })[];
        catData?.forEach((el) => ids.push(el.id));
      }

      allPromotionSchema
        .validate(promotion)
        .then(async () => {
          await Axios.post("/promotion", {...promotion, ids: ids ?? []});
          toggleNotification({
            show: true,
            title: "Promotion Created",
            type: "success",
            message:
              "Promotion created successfully",
          });
        })
        .catch((reason) => {
          console.log(reason?.message);
          const errorList = String(reason)?.split(":");
          toggleNotification({
            show: true,
            title: errorList[1],
            type: "error",
            message:
              errorMessage[errorList[1].trim() as keyof typeof errorMessage],
          });
        }).finally(() => setLoading(false));
    },
  });

  const getPath = () =>
    queryClient.getQueryData(["CREATE_PROMOTION"]) as Promotion & {
      type: string;
    };

  const open = () => {
    const path = getPath();
    return toggleItemDrawer(true);
  };

  const discard = () => {

  }

  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      {/* Header */}
      <DashboardTitleHeader
        title={"Create New Promotion"}
        discard={discard}
        addItem={mutate}
        btnText="Create Promotion"
        loading={loading}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <PromotionForm user={null} />

        {/* Inventory */}
        <Card className="p-6">
          <div className="flex justify-between items-center">
            <Typography size="s1" as="p" align="left" className="font-onest text-base">
              Select promotion events
            </Typography>
            <Button
              size="lg"
              color="light"
              className="border-0 h-9 bg-black-400 font-onest justify-center items-center text-sm text-white"
              onClick={() => open()}
            >
              Select Events
            </Button>
          </div>
          <SelectPromotionType />
        </Card>
      </div>
    </div>
  );
}
