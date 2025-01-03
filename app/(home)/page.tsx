import { fetchEvents } from "@/actions/get-events";
import HeroSection from "./components/hero-section";
import TravelPage from "./components/travel-page";
import TravellerPage from "./components/travellers";
import Footer from "@/components/footer/footer";
import { Search } from "lucide-react";
import SearchBar from "@/components/search-bar/search-bar";


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
  const limit = parseInt(searchParams.limit) || 15;


  const result = await fetchEvents(
    page,
    limit
  );
  return (
    <div className="bg-grey-200 relative">
      <SearchBar />
      <HeroSection />
      <TravellerPage />
      <TravelPage events={result} />
      <Footer />
    </div>
  );
}
