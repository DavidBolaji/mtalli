import Footer from "@/components/footer/footer";


export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      {children}
      <Footer />
    </div>
  );
}
