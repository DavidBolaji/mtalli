"use client";
import { deleteHash } from "@/utils/data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "./use-notification";

import { useSearchParams } from "next/navigation";
import { filterEvent } from "@/actions/get-events";


export const useDeleteModal = () => {
    const queryClient = useQueryClient();
    const { toggleNotification } = useNotification()
    const searchParams = useSearchParams();

    if (!queryClient.getQueryData(["DELETE_MODAL"])) {
        queryClient.setQueryData(["DELETE_MODAL"], {
            shown: false,
            key: "DELETE_PRODUCT",
            data: []
        });
    }

    const toggleModal = (
        isOpen: boolean,
        key: string,
        data: Set<string>
    ) => {
        if (isOpen) {
            // toggleOverlay(true)
            queryClient.setQueryData(["OVERLAY"], () => isOpen);
        }
        queryClient.setQueryData(["DELETE_MODAL"], () => ({
            shown: isOpen,
            key,
            data: data
        }));
    };

    const { data: deleteModal } = useQuery({
        queryKey: ["DELETE_MODAL"],
        queryFn: () =>
            queryClient.getQueryData(["DELETE_MODAL"]) as {
                shown: boolean;
                key: keyof typeof deleteHash;
                data: Set<string>
            },

    });

    const { mutate: deleteItem, isPending } = useMutation({
        mutationKey: ["DELETE_ITEM"],
        mutationFn: async () => {
            const item = queryClient.getQueryData(["DELETE_MODAL"]) as {
                shown: boolean;
                key: keyof typeof deleteHash;
                data: Set<string>
            }
            if (!Array.from(item?.data)?.length) {
                toggleNotification({
                    type: "error",
                    show: true,
                    title: "Delete Error",
                    message: "Item to be deleted has not been selected"
                })
                throw new Error("Item to be deleted has not been selected");
            }
            return await deleteHash[item.key](item.data)
        },
        onSuccess: async () => {
            const formData = new FormData();
            const params = new URLSearchParams(searchParams);
            const item = queryClient.getQueryData(["DELETE_MODAL"]) as {
                shown: boolean;
                key: keyof typeof deleteHash;
                data: Set<string>
            }

            toggleNotification({
                type: "success",
                show: true,
                title: "Delete Successfull",
                message: "Item deeted successfully"
            })

            if (item.key === "DELETE_EVENTS") return filterEvent(formData, params)
            //    if (item.key === "DELETE_ORDERS") return filterOrder(formData, params)
            //    if (item.key === "DELETE_PROMOTIONS") return filterPromotions(formData, params)
            //    if (item.key === "DELETE_BLOGS") return filterContent(formData, params)
            //    if (item.key === "DELETE_FAQS") return filterContentFaq(formData, params, "/dashboard/contents?tab=FAQs")
        },
        onError: (error) => {
            toggleNotification({
                type: "error",
                show: true,
                title: "Delete Error",
                message: error.message || "An error occurred during deletion"
            });
        },
        onSettled: () => {
            toggleModal(false, "DELETE_PRODUCT", new Set([]))
            queryClient.setQueryData(["OVERLAY"], () => false);
        }

    });
    return { toggleModal, deleteModal, deleteItem, isPending };
};
