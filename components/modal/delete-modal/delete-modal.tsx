"use client";


import React from "react";

import { Grid } from "antd";
import { CloseIcon } from "@/constants/icons/close";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { Typography } from "@/components/typography/typography";
import { useQueryClient } from "@tanstack/react-query";
import { StyledDeleteModalDrawer, StyledDeleteModalMobileDrawer } from "./delete.modal.style";
import { Button } from "@/components/button/button";
import { Spinner } from "@/components/spinner";

const { useBreakpoint } = Grid;

export const DeleteModal = () => {
    const queryClient = useQueryClient()
    const { deleteModal, toggleModal, deleteItem, isPending } = useDeleteModal();
    // const {toggleOverlay} = useOverlay()
    const screen = useBreakpoint();

    const close = () => {
        queryClient.setQueryData(["OVERLAY"], () => false);
        toggleModal(false, "DELETE_MODAL", new Set([]))
        // toggleOverlay(false)
    }

    const deleteAll = async () => {
        await deleteItem()
    }

    return (
        <>
            {screen.lg && (
                <StyledDeleteModalDrawer
                    open={deleteModal?.shown}
                    closeIcon={null}
                    footer={null}
                >
                    <div
                        className="cursor-pointer absolute top-6 right-6 z-20"
                        onClick={close}
                    >
                        <CloseIcon size="24" color="#92B09F" />
                    </div>
                    <div className="flex-col flex justify-center items-center  h-[200px]">
                        <Typography
                            align="center"
                            size="h6"
                            as="h6"
                            className="font-bold mb-4 font-onest text-xl"
                        >
                            Are you sure you want to delete??
                        </Typography>
                        <div className="gap-x-2 flex">
                            <Button disabled={isPending} size="lg" color="light" onClick={close} className="h-9 w-24 flex items-center justify-center text-sm">No</Button>
                            <Button disabled={isPending} size="lg" color="dark" onClick={deleteAll} className="h-9 w-24 flex items-center justify-center text-sm">{isPending ? <Spinner /> : "Yes"}</Button>

                        </div>
                    </div>
                </StyledDeleteModalDrawer>
            )}
            {!screen.lg && (
                <StyledDeleteModalMobileDrawer
                    open={deleteModal?.shown}
                    onClose={close}
                    placement="bottom"
                    height={"30%"}
                    closeIcon={null}
                    width={485}
                    footer={null}
                    className="scrollbar-hide"
                >
                    <div
                        className="cursor-pointer  absolute top-[26px] right-[15px] z-20"
                        onClick={close}
                    >
                        <CloseIcon size="24" color="#92B09F" />
                    </div>
                    <div className="flex-col flex justify-center items-center  h-full">
                        <Typography
                            align="center"
                            size="h6"
                            as="h6"
                            className="font-bold mb-4 font-onest text-xl"
                        >
                            Are you sure you want to delete??
                        </Typography>
                        <div className="gap-x-2 flex">
                            <Button size="lg" color="light" onClick={close} className="h-9 w-24 items-center justify-center text-sm">No</Button>
                            <Button size="lg" color="dark" onClick={deleteAll} className="h-9 w-24 items-center justify-center text-sm">Yes</Button>

                        </div>
                    </div>
                </StyledDeleteModalMobileDrawer>
            )}
        </>
    );
};
