
// import Loading from "@/components/loading";

import Navbar from "@/components/navbar/navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
}
