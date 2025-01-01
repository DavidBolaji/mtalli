"use client"

import { useMutation } from "@tanstack/react-query";
import { useAxios } from "./use-axios";
import { Booking } from "@prisma/client";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotification } from "./use-notification";



export const useBooking = () => {
    const Axios = useAxios();
    const router = useRouter();
    const {toggleNotification} = useNotification()
    const [load, setLoad] = useState(false)

    const { mutate: createBooking } = useMutation({
        mutationKey: ["CREATE_BOOKING"],
        mutationFn: async (booking: Pick<Booking, "bookingCount" | "eventId" | "totalPrice">) => {
            setLoad(true)
            return await Axios.post('/booking', booking)
        },
        onSuccess: (data: AxiosResponse<{ booking: Booking }>) => {
            router.push(`/success/${data.data.booking.id}`)
        },
        onSettled: () => {
            setLoad(false)
        }
    });

    const { mutate: updateBooking } = useMutation({
        mutationKey: ["UPDATE_BOOKING"],
        mutationFn: async (booking: Partial<Booking>) => {
            setLoad(true)
            return await Axios.put('/booking', booking)
        },
        onSuccess: (data: AxiosResponse<{ booking: Booking }>) => {
            toggleNotification({
                show: true,
                type: "success",
                title: "Booking updated",
                message: "Booking has successfully been updated",
              });
        },
        onSettled: () => {
            setLoad(false)
        }
    });


    return { createBooking, load, updateBooking };
};
