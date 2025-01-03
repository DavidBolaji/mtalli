'use client'

import { useEffect, useState } from 'react'

import { filterEventSearch, getUniqueEventsByLocation, resetSearchFilter } from '@/actions/get-events'
import { useSearchParams } from 'next/navigation'

const useFilter = () => {
  const [selectedDestinations, setSelectedDestinations] = useState<{id: string, label:string}[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([0, 789238])
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getUniqueEventsByLocation();
        setSelectedDestinations(data.locations)
        console.log(data)
        const min = searchParams.get("minPrice") || data?.lowestPricedEvent
        const max = searchParams.get("maxPrice") || data?.highestPricedEvent
        setPriceRange([+min, +max])
      } catch (error: any) {
        console.log(error?.message)
      }
    }
    fetchDestinations()
  }, [])

  const handlePriceChange = (values: number[]) => {
    const minPrice = values[0];
    const maxPrice = values[1];
    
    const params = new URLSearchParams(
      searchParams as unknown as Record<string, string>
    );

    const formData = new FormData();
    if(minPrice) {
      formData.append("minPrice", String(values[0]));
    }

    if (maxPrice) {
      formData.append("maxPrice", String(values[1]));
    }

    filterEventSearch(formData, params)
    setPriceRange(values)
  }

  const isChecked = (name: string, value: string) => {
    // console.log(name, value)
    const paramValues = searchParams.getAll(name); // Get all values for the parameter
    // console.log(paramValues)
    return paramValues.includes(value); // Check if the value is in the list
  };

  const handleFromInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0;

    const minPrice = value;
    
    const params = new URLSearchParams(
      searchParams as unknown as Record<string, string>
    );

    const formData = new FormData();
    if(minPrice) {
      formData.append("minPrice", String(minPrice));
    }

    if(priceRange[1]) {
      formData.append("maxPrice", String(priceRange[1]));
    }

    filterEventSearch(formData, params)
    setPriceRange(prev => ([+minPrice, prev[1]]))
  }

  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0
    const maxPrice = value;
    
    const params = new URLSearchParams(
      searchParams as unknown as Record<string, string>
    );

    const formData = new FormData();
    if(priceRange[0]) {
      formData.append("minPrice", String(priceRange[0]));
    }

    if(maxPrice) {
      formData.append("maxPrice", String(maxPrice));
    }


    filterEventSearch(formData, params)
    setPriceRange(prev => ([prev[0], +maxPrice]))
  }

  const handleFilter = (formData: FormData) => {
    if (priceRange) {
      const adjustedFrom = priceRange[0];
      const adjustedTo = priceRange[1];

      formData.append("minPrice", String(adjustedFrom) || "");
      formData.append("maxPrice", String(adjustedTo) ?? "");
    }
    filterEventSearch(formData, searchParams);
  };

  const resetSearch = () => {
    resetSearchFilter()
  }

  return {
    selectedDestinations,
    priceRange,
    handlePriceChange,
    resetSearch,
    isChecked,
    handleFromInputChange,
    handleToInputChange,
    handleFilter
  }
}

export default useFilter
