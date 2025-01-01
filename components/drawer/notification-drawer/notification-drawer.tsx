"use client";

import React from "react";
import { CloseIcon } from "@/constants/icons/close";
import { Grid } from "antd";
import { Typography } from "@/components/typography/typography";
import { useNotification } from "@/hooks/use-notification";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/button/button";
import { ICON } from "@/constants/icon";
import classNames from "classnames";

const { useBreakpoint } = Grid;

export const NotificationDrawer = () => {
  const { notificationDrawer, close } = useNotification();
  const screen = useBreakpoint();

  const notificationStyle = classNames(
    "border-b-4 bg-white relative z-40 shadow-2xl rounded-e-sm md:w-[600px] h-[152px] p-4 flex gap-4 items-start relative",
    {
      "border-b-[#E83B3B]": notificationDrawer?.type === "error",
    },
    {
      "border-b-[#7DBA00]": notificationDrawer?.type === "success",
    },
    {
      "border-b-[#23342A]": notificationDrawer?.type === "info",
    }
  );

  const notificationStyleMobile = classNames(
    "border-b-4 bg-white w-11/12 z-40 shadow-2xl rounded-e-sm h-[152px] p-4 flex gap-4 items-start relative",
    {
      "border-b-[#E83B3B]": notificationDrawer?.type === "error",
    },
    {
      "border-b-[#7DBA00]": notificationDrawer?.type === "success",
    },
    {
      "border-b-[#23342A]": notificationDrawer?.type === "info",
    }
  );

  return (
    <AnimatePresence mode="wait">
      {screen.lg && notificationDrawer?.show && (
        <motion.div
          initial={{
            position: "fixed",
            bottom: 48,
            right: -50,
            x: 0,
          }}
          animate={{
            x: -68,
            transition: { type: "spring", stiffness: 200, duration: 600 },
          }}
          exit={{
            x: 700,
          }}
          className={notificationStyle}
        >
          <div
            className="cursor-pointer absolute right-4 top-4"
            onClick={close}
          >
            <CloseIcon size="24" color="#92B09F" />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-grey-200">
            <ICON.ExclamationIcon />
          </div>
          <div>
            <Typography
              size="s1"
              as="p"
              align="left"
              className="black-100 font-bold pb-2 font-onest"
            >
              {notificationDrawer.title}
            </Typography>
            <Typography
              size="s1"
              as="p"
              align="left"
              className="black-200 text-[15px] font-onest leading-5 mb-4 max-w-[472px]"
            >
              {notificationDrawer.message}
            </Typography>
            <Button
              onClick={close}
              color="light"
              size="lg"
              className="border-0 font-onest bg-black-400 p-2 h-8 flex items-center justify-center"
            >
              Button
            </Button>
          </div>
        </motion.div>
      )}

      {!screen.lg && notificationDrawer?.show && (
        <div className="">
          <motion.div
            initial={{
              position: "fixed",
              bottom: 48,
              right: -50,
              x: 0,
            }}
            animate={{
              x: -68,
              transition: { type: "spring", stiffness: 200, duration: 600 },
            }}
            exit={{
              x: 700,
            }}
            className={notificationStyleMobile}
          >
            <div
              className="cursor-pointer absolute right-4 top-4"
              onClick={close}
            >
              <CloseIcon size="24" color="#92B09F" />
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-grey-200">
              <ICON.ExclamationIcon />
            </div>
            <div>
              <Typography
                size="s1"
                as="p"
                align="left"
                className="black-100 font-bold pb-2"
              >
                {notificationDrawer.title}
              </Typography>
              <Typography
                size="s1"
                as="p"
                align="left"
                className="black-300 font-medium text-[15px] leading-5 mb-3 max-w-[472px]"
              >
                {notificationDrawer.message}
              </Typography>
              <Button
                onClick={close}
                color="light"
                size="lg"
                className="border-0 font-onest bg-black-400 p-2 h-8 flex items-center justify-center"
              >
                Button
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
