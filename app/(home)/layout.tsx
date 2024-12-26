import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Header2 } from "@/components/header/header2";
import Loading from "@/components/loading";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-grey-200">
       <Loading />
      <Header2 />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
