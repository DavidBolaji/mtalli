import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Onest } from 'next/font/google';
import dynamic from "next/dynamic";
import "./globals.css";
import { NotificationDrawer } from "@/components/drawer/notification-drawer/notification-drawer";
import { Overlay } from "@/components/overlay/overlay";
import { DeleteModal } from "@/components/modal/delete-modal/delete-modal";
import BookDrawer from "@/components/drawer/book-drawer/book-drawer";
import { ItemCategoryDrawer } from "@/components/drawer/promotion-drawer/item-promotion-drawer";
import Loading from "@/components/loading";


export const metadata: Metadata = {
  title: "Mtalli",
  description:
    "",
};

const onest = Onest({
  subsets: ['latin'],
  variable: '--font-onest', // Define a CSS variable
  display: 'swap', // Optimize for performance
});

const TanstackProvider = dynamic(
  () =>
    import("../tanstack/tanstack-provider").then((mod) => mod.TanstackProvider),
  {
    ssr: false,
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      className={onest.variable}
    >
      <body>
        <AntdRegistry>
          <TanstackProvider>
            <Loading />
            {children}
            <NotificationDrawer />
            <DeleteModal />
            <Overlay />
            <BookDrawer />
            <ItemCategoryDrawer />
          </TanstackProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
