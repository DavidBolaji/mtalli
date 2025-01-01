import { fetchEvents } from "@/actions/get-events";
import HeroSection from "./components/hero-section";
import TravelPage from "./components/travel-page";
import TravellerPage from "./components/travellers";
import Footer from "@/components/footer/footer";
import { Search } from "lucide-react";


export const revalidate = 0;

interface HomeSearchParams {
  [key: string]: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: HomeSearchParams;
}) {

  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 5;


  const result = await fetchEvents(
    page,
    limit
  );
  return (
    <div className="bg-grey-200 relative">
      <div className="sticky bg-transparent top-20 hidden lg:block max-w-[787px] mx-auto z-[999]">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center gap-4 rounded-full border border-[#ABD0E4] bg-white p-2 shadow-lg">
            <div className="flex-1 px-4">
              <label className="text-sm black-100 font-onest">Location</label>
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full border-none bg-transparent text-sm outline-none placeholder:font-onest placeholder:text-[#4D7890]"
              />
            </div>
            <div className="flex-1 border-l border-[#ABD0E4] px-4">
              <label className="text-sm black-100 font-onest">When</label>
              <input
                type="text"
                placeholder="When do you want to go?"
                className="w-full border-none bg-transparent text-sm outline-none placeholder:font-onest placeholder:text-[#4D7890]"
              />
            </div>
            <div className="flex-1 border-l border-[#ABD0E4] px-4">
              <label className="text-sm black-100 font-onest">Who</label>
              <input
                type="text"
                placeholder="Who are you going with?"
                className="w-full border-none bg-transparent text-sm outline-none placeholder:font-onest placeholder:text-[#4D7890]"
              />
            </div>
            <button className="rounded-full bg-[#001F3F] p-4 text-white hover:bg-[#001F3F]/90 font-onest">
              <Search className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <HeroSection />
      <TravellerPage />
      <TravelPage events={result} />
      <Footer />
    </div>
  );
}
