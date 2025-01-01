"use client";

import { Button } from "@/components/button/button";
import { allPromotionSchema } from "@/components/form/promotion-schema";
import { Spinner } from "@/components/spinner";
import { IEvent } from "@/components/table/event-table/types";
import { useAxios } from "@/hooks/use-axios";
import { useNotification } from "@/hooks/use-notification";
import { errorMessage } from "@/utils/helper";

import { Promotion } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";



export default function ViewPromotion({ promotion, edit = false }: { promotion: Promotion | null, edit?: boolean }) {
  const router = useRouter()
  const queryClient = useQueryClient();
  const { toggleNotification } = useNotification()
  const Axios = useAxios();
  queryClient.removeQueries({
    queryKey: ['SELECT_ITEM', 'SELECT_CATEGORY', 'CREATE_PROMOTION']
  })
  
  const [loading, setLoading] = useState(false)
  const params = useParams()


  const getPath = () =>
    queryClient.getQueryData(["CREATE_PROMOTION"]) as Promotion & {
      type: string;
    };

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
          await Axios.put("/promotion", { ...promotion, ids, promoId: params.promotionId });
          toggleNotification({
            show: true,
            title: "Promotion Updated",
            type: "success",
            message:
              "Promotion updated successfully",
          });
          queryClient.setQueryData(['SELECT_ITEM'], [])
          queryClient.setQueryData(['SELECT_CATEGORY'], [])
          router.push('/dashboard/promotions')
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
        }).finally(() =>{
            console.log('[FINALLY]');
            queryClient.setQueryData(['SELECT_ITEM'], [])
            queryClient.setQueryData(['SELECT_CATEGORY'], [])
         
           setLoading(false)
          });
    },
  });

  const handleClick = () => {
    if (edit) {
      console.log('CLICKED');
      
      mutate()
    } else {
      router.push(`/dashboard/promotions/${promotion?.id}/edit`)
    }
  }

  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      {/* Header */}
      <div className="flex lg:flex-row flex-col lg:items-center justify-between mb-8 bg-white px-4 py-[19px] rounded-2xl border border-[#DDEEE5]">
        <h1 className="text-2xl font-semibold text-left font-onest  lg:mb-0 mb-4">
          {promotion?.name}
        </h1>
        <div className="flex gap-3">
          <Button size="lg" color="light" className="h-9 font-onest text-sm flex items-center">
            Stop Promotion
          </Button>
          <div className="w-auto">
            {!loading ? <Button size="lg" color="dark" className="h-9 font-onest text-sm flex items-center" onClick={handleClick}>
              {edit ? "Update" : "Edit Promotion"}
            </Button> : <Button disabled size="lg" color="dark" className="h-9 w-28 flex justify-center items-center text-sm font-onest">
              <Spinner />
            </Button>}

          </div>
        </div>
      </div>
    </div>
  );
}
