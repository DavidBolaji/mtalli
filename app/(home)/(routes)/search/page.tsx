
import { getEventSearch } from "@/actions/get-events";
import FilterCard from "@/components/card/filter-card/filter-card";
import React from "react";
import TravelPage from "../../components/travel-page";
import SearchBar from "@/components/search-bar/search-bar";
import { Empty } from "antd";

export const revalidate = 0;

interface SearchPageSearchParams {
    searchParams: { [key: string]: string | undefined };
}

export default async function SearchPage({
    searchParams,
}: SearchPageSearchParams) {

    const destinations = Array.isArray(searchParams.destinations)
        ? searchParams.destinations
        : searchParams.destinations
            ? [searchParams.destinations]
            : [];
    const minPrice = searchParams?.minPrice || "";
    const maxPrice = searchParams?.maxPrice || "";
    const location = searchParams?.location || "";

    const startDate = searchParams?.startDate || "";
    const endDate = searchParams?.endDate || "";

    const result = await getEventSearch({
        destinations: destinations.map((el) => el.toLowerCase()),
        minPrice,
        maxPrice,
        location,
        startDate,
        endDate
    });

    return (
        <div>
            <SearchBar />
            <div className="relative grid grid-cols-12 max-w-6xl mx-auto md:mt-8 mt-56">
                <div className="col-span-4 lg:block lg:mb-20 hidden">
                    <FilterCard />
                </div>
                <div className="lg:col-span-8 col-span-12 md:mt-16">
                    {result?.items?.length ? <TravelPage events={result} search /> : <Empty />}
                </div>
            </div>
        </div>
    );
}
