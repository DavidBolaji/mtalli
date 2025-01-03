'use client'

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { ChevronDown } from 'lucide-react'
import { Slider } from "./slider"
import useFilter from "@/hooks/use-filter"
import { filterEventSearch } from "@/actions/get-events"

const MAX_PRICE = 1000000

export default function FilterCard({mobile = false}: {mobile?: boolean}) {
  const { selectedDestinations, priceRange, handlePriceChange, resetSearch, isChecked, handleFromInputChange, handleToInputChange } = useFilter()

  return (
    <Card className={`w-full border rounded-2xl border-[#ABD0E4] ${mobile ? "w-full border-b-0 outline-0 shadow-none rounded-b-none": "max-w-sm"}`}>
      <CardHeader className="flex flex-row items-center border-b border-[#ABD0E4] justify-between pb-2">
        <CardTitle className="text-2xl font-bold font-onest">Filter</CardTitle>
        <Button
          variant="link"
          className="text-primary hover:no-underline"
          onClick={resetSearch}
        >
          Reset all
        </Button>
      </CardHeader>
      <CardContent className="space-y-6 mt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-onest">Destination</h3>
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </div>
      
          <form onSubmit={(e) => {
            e.preventDefault()
            const f = new FormData(e.currentTarget)
            filterEventSearch(f)
          }}
          >
            <div className="space-y-3">
              {selectedDestinations.map((destination) => (
                <button
                  // type="submit"
                  key={destination.id}
                  className="flex items-center space-x-2 gap-1"
                >
                    <Checkbox
                      id={destination.label.trim()}
                      name="Destinations[]"
                      value={destination.label.trim()}
                      defaultChecked={isChecked(
                        `destinations`,
                        destination.label.trim()
                      )}

                    />
                    <label
                      htmlFor={destination.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {destination.label.trim()}
                    </label>
                  
                </button>
              ))}
            </div>
          </form>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold font-onest">Price</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 flex items-center overflow-hidden h-12 pl-4 g border border-[#4D7890] rounded-2xl">
              <label htmlFor="from" className="text-sm inline-block black-200 text-muted-foreground">
                From:
              </label>
              <Input
                id="from"
                value={`₦${priceRange[0].toLocaleString()}`}
                onChange={handleFromInputChange}
                className="border-none pl-1 focus-visible:ring-0 outline-none shadow-none w-full pb-3 font-onest font-bold"

              />
            </div>
            <div className="space-y-2 w-full flex items-center h-12 pl-4 border border-[#4D7890] rounded-2xl">
              <label htmlFor="to" className="text-sm inline-block text-nowrap black-200 text-muted-foreground">
                Up to:
              </label>
              <Input
                id="to"
                value={`₦${priceRange[1].toLocaleString()}`}
                onChange={handleToInputChange}
                className="border-none pl-1 focus-visible:ring-0 w-full outline-none shadow-none pb-3 font-onest font-bold"
              />
            </div>
          </div>
          <div className="pt-4">
            <Slider
              defaultValue={priceRange}
              max={MAX_PRICE}
              step={1}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="my-6"
            />
            <div className="mt-2 text-center">
              <span className="text-sm font-medium">₦{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

