"use client"
import { useFilterDrawer } from '@/hooks/use-filter-drawer'
import { useOverlay } from '@/hooks/use-overlay'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const SearchBar:React.FC<{filter?: boolean}> = ({filter}) => {
    const params = useSearchParams()
    const router = useRouter()
    const [where, setWhere] = useState("")
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
    const [startDate, endDate] = dateRange
    const location = params.get("location") || ""
    const startDateParam = params.get("startDate")
    const endDateParam = params.get("endDate")

    const {toggleDrawer} = useFilterDrawer()
    const {toggleOverlay} = useOverlay()

    useEffect(() => {
        if (location) {
            setWhere(location)
        }

        if (startDateParam && endDateParam) {
            setDateRange([new Date(startDateParam), new Date(endDateParam)])
        }
    }, [location, startDateParam, endDateParam])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWhere(e.target.value)
    }

    const handleClick = () => {
        // Create a new URLSearchParams object without the previous search parameters
        const param = new URLSearchParams()
        
        // Only add parameters if they have values
        if (where.trim()) {
            param.append('location', where.trim())
        }
        
        const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : '';
        const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';
        
        if (formattedStartDate) {
            param.append('startDate', formattedStartDate)
        }
        
        if (formattedEndDate) {
            param.append('endDate', formattedEndDate)
        }

        // Create the search URL only with present parameters
        const searchParams = param.toString()
        const searchUrl = searchParams ? `/search?${searchParams}` : '/search'
        
        router.push(searchUrl)
    }

    return (
        <>
        <div className="sticky bg-transparent top-20 hidden lg:block max-w-[787px] mx-auto z-[99]">
            <div className="mx-auto max-w-7xl px-4 py-6">
                <div className="flex items-center gap-4 rounded-full border border-[#ABD0E4] bg-white p-2 shadow-lg">
                    <div className="flex-1 px-4">
                        <label className="text-sm black-100 font-onest">Location</label>
                        <input
                            type="text"
                            value={where}
                            onChange={handleChange}
                            placeholder="Where do you want to go?"
                            className="w-full border-none bg-transparent text-sm outline-none placeholder:font-onest placeholder:text-[#4D7890]"
                        />
                    </div>
                    <div className="flex-1 border-l border-[#ABD0E4] px-4">
                        <label className="text-sm black-100 font-onest">When</label>
                        <DatePicker
                            selectsRange={true}
                            startDate={startDate || undefined}
                            endDate={endDate || undefined}
                            onChange={(update) => {
                                setDateRange(update)
                            }}
                            // isClearable={true}
                            placeholderText="Select date range"
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
                    <button
                        onClick={handleClick}
                        className="rounded-full bg-[#001F3F] p-4 text-white hover:bg-[#001F3F]/90 font-onest">
                        <Search className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>

        <div className="relative z-10 p-4 lg:hidden">
                <div className="relative">
                    <input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleClick}
                        placeholder="Search for an experience"
                        className="w-full focus-visible:ring-0 focus-visible:outline-none rounded-full border bg-white px-12 py-3 shadow-lg"
                    />
                    
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <SlidersHorizontal onClick={() => {
                        toggleOverlay(true)
                        toggleDrawer(true)
                    }} color='black' className="absolute rotate-90 right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            
                </div>
            </div>
        </>
    )
}

export default SearchBar