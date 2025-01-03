"use client";

import { Card } from "@/components/ui/card";
import { errorMessage } from "@/utils/helper";
import { useNotification } from "@/hooks/use-notification";
import { useAxios } from "@/hooks/use-axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography } from "@/components/typography/typography";
import { allEventSchema } from "@/components/form/add-event/event-validation";
import { DashboardTitleHeader } from "@/components/dashboard-header/dashboard-header";
import { IcreateEvent, IEvent } from "@/components/table/event-table/types";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EventDetailsForm } from "@/components/form/add-event/event-details-form";
import { UploadImageForm } from "@/components/form/add-event/upload-image-form";
import { WYSIWYGForm } from "./wysisyg-editor";
import { EventInventoryForm } from "@/components/form/add-event/event-inventory-form";


export default function AddEvent({ event }: { event?: IEvent | null }) {
  const { toggleNotification } = useNotification();
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const isEdit = (event?.title.length ?? 0) > 0
  const queryClient = useQueryClient();
  const Axios = useAxios()
  const urls = event?.images.map(el => el.url);
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnRef2 = useRef<HTMLButtonElement>(null);
  const btnRef3 = useRef<HTMLButtonElement>(null);
  const btnRef4 = useRef<HTMLButtonElement>(null);
  const btnRef5 = useRef<HTMLButtonElement>(null);
  const btnRef6 = useRef<HTMLButtonElement>(null);
  const key = !isEdit ? "CREATE_EVENT" : "EDIT_EVENT"


  useEffect(() => {
    if (isEdit) {
      queryClient.setQueryData([key], () => ({
        id: event?.id,
        title: event?.title,
        description: event?.description,
        totalSlots: event?.totalSlots,
        location: event?.location,
        startDate: event?.startDate,
        endDate: event?.endDate,
        price: event?.price,
        serviceFee: event?.serviceFee,
        status: event?.status === "ACTIVE" || false,
        images: urls
      }));
    }
  }, [event])

  // const router = useRouter()
  const { mutate } = useMutation({
    mutationKey: [key],
    mutationFn: async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const event = queryClient.getQueryData([key]);
      allEventSchema.validate(event).then(async () => {
        if (isEdit) {
          await Axios.put(`/event`, event);
        } else {
          await Axios.post('/event', event)
        }
        toggleNotification({
          show: true,
          title: isEdit ? "Updated Event" : "Event Created",
          type: "success",
          message:
            `Event has been ${isEdit ? "updated" : "created"} succesfully`,
        });
          reset()
      }).catch((reason) => {
        console.log(reason?.message);
        const errorList = String(reason)?.split(":");
        toggleNotification({
          show: true,
          title: errorList[1],
          type: "error",
          message:
            errorMessage[errorList[1].trim() as keyof typeof errorMessage],
        });
      })
    },
    onSettled: () => {
      setLoading(false)
    },
  });


  const reset = () => {
    queryClient.setQueryData([key], null);
    btnRef.current?.click()
    btnRef2.current?.click()
    btnRef3.current?.click()
    btnRef4.current?.click()
    btnRef5.current?.click()
    btnRef6.current?.click()
    if (isEdit) {
      router.push('/dashboard/events')
    }
  }

  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      {/* Header */}
      <DashboardTitleHeader
        title={isEdit ? "Edit Event" : "Add Event"}
        discard={reset}
        addItem={mutate}
        btnText={isEdit ? "Update" : "Add Event"}
        loading={loading}
      />

      <div className="grid gap-6 grid-cols-2">
        {/* Event Details */}
        <Card className="px-4 pt-6 pb-10 col-span-2">
          <div className="flex justify-between">
          <Typography size="s1" as="p" align="left" className="mb-4 font-bold text-md ">
            Event Details
          </Typography>
            <EventInventoryForm<IcreateEvent>  
              keyz={key}
              event={event}
              btnRef={btnRef6}
              />
          </div>
          <EventDetailsForm keyz={key} btnRef={btnRef} event={event} />
        </Card>
        {/* Event Image */}
        <Card className="px-4 pt-6 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <Typography size="s1" as="p" align="left" className="text-base font-bold">
              Images
            </Typography>
          </div>
          <UploadImageForm<IcreateEvent>
            keyz={key}
            count={5}
            urls={urls}
          />
        </Card>

        {/* info */}
        <Card className="p-6 col-span-2">
          <Typography size="s1" as="p" align="left" className="mb-4 text-base font-bold">
            Important Information
          </Typography>
          <WYSIWYGForm<IcreateEvent>
            text={event?.info}
            keyz={key}
            types={"info"}
            toolbar={[{ list: "ordered" }, { list: "bullet" }, { list: "check" }]}
          />
        </Card>

        {/* rules */}
        <Card className="p-6 col-span-2">
          <Typography size="s1" as="p" align="left" className="mb-4 text-base font-bold">
            Travel Rules
          </Typography>
          <WYSIWYGForm<IcreateEvent>
            text={event?.rules}
            keyz={key}
            types={"rules"}
            toolbar={[{ list: "ordered" }, { list: "bullet" }, { list: "check" }]}
          />
        </Card>

        {/* policy */}
        <Card className="p-6 col-span-2">
          <Typography size="s1" as="p" align="left" className="mb-4 text-base font-bold">
            Travel Policy
          </Typography>
          <WYSIWYGForm<IcreateEvent>
            text={event?.policy}
            keyz={key}
            types={"policy"}
            toolbar={[{ list: "ordered" }, { list: "bullet" }, { list: "check" }]}
          />
        </Card>
       
      </div>
    </div>
  );
}
