"use client"
import { Avatar } from "@/components/avatar/avatar";

import { Typography } from "@/components/typography/typography";
import usePath from "@/hooks/use-path";
import { useUser } from "@/hooks/use-user";
import { Header } from "antd/es/layout/layout";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { MenuStyled } from "./dashboard.styles";
import { useRouter } from "next/navigation";
import { MenuProps } from "antd";
import { ICON } from "@/constants/icon";
import { LogOut, MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Images } from "@/constants/image";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/dashboard/home", <ICON.GridIcon color="#011D2E" />),
  getItem("Events", "/dashboard/events", <ICON.TagIcon />),
  getItem(
    "Bookings",
    "/dashboard/bookings",
    <div className="-ml-1">
      <ICON.ShoppingCartIcon />
    </div>
  ),
  getItem("Customers", "/dashboard/customers", <ICON.UsersIcon />),
  getItem("Promotions", "/dashboard/promotions", <ICON.GiftIcon />),
];

export const DashboardHeader = () => {
  const [visible, setVisible] = useState(false)
  const { logout } = useUser()
  const { locationCurrent } = usePath();

  const router = useRouter();
  const handleMenuClick = () => {
    setVisible(prev => !prev)
  }

  return (
    <Header
      style={{
        paddingLeft: 0,
        paddingRight: "40px",
        background: "#fff",
        height: 72,
        borderBottom: "1px solid #DDEEE5",
      }}
    >
      <div className="flex justify-between items-center w-full space-x-4 h-full md:hidden px-4">
        <Image
          width={90}
          height={40}
          src={Images.BlackLogo}
          alt="Mtalli logo"
        />
        <div className="flex items-center gap-x-2 h-full">
          {/* <Avatar size="sm" /> */}
          {/* <Typography as="p" size="s2" align="left" className="text-sm font-bold">
            Admin
          </Typography> */}
        </div>
      </div>
      <div className="flex justify-end items-center w-full space-x-4">
        <div className="items-center gap-x-2 md:flex hidden">
          <Avatar size="sm" />
          <div className="">
            <Typography as="p" size="s2" align="left">
              Admin
            </Typography>

          </div>
        </div>
        <div onClick={handleMenuClick} className="cursor-pointer relative z-50 md:hidden">
          <div className="-translate-y-11">
            {visible ? <XIcon /> : <MenuIcon />}
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {visible && <motion.div
          className="bg-white absolute left-0 top-[9.8%] w-full mt-2 h-[91.5%] z-[9999]"
          initial={{
            x: -700,
          }}
          animate={{
            x: 0,
            transition: { type: "linear" },
          }}

          exit={{
            x: -700
          }}
        >
          <div className="flex justify-end items-center">
            {/* <div className="pl-4 -translate-y-6" onClick={handleMenuClick}>
            {visible ? <XIcon /> : <MenuIcon />}
          </div> */}
          </div>
          <MenuStyled
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[locationCurrent]}
            selectedKeys={[locationCurrent]}
            onClick={(menuInfo) => {
              handleMenuClick()
              router.push(menuInfo?.key)
            }
            }
            items={items.filter(() => {
              return true;
            })}
          />
          <div className="absolute bottom-3  px-4 translate-x-0 cursor-pointer gap-3 font-bold font-satoshi pl-12 flex items-center red-100"
            onClick={() => logout(true)}
          >
            <LogOut size={16} />
            Logout
          </div>

        </motion.div>}
      </AnimatePresence>
    </Header>
  );
};
