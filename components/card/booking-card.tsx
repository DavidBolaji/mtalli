'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button as ShadBtn } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '../button/button'
import { useParams, useSearchParams } from 'next/navigation'
import { isEmpty } from 'lodash'

interface BookingCardProps {
    pricePerPerson: number
    serviceFee: number
    otherFee: number
    serviceFeeTooltip?: string
    otherFeeTooltip?: string
    onBooking?: (guests: number) => void
    maxGuests?: number
    currency?: string
    mobile?: boolean
}

export function BookingCard({
    pricePerPerson,
    serviceFee,
    otherFee,
    serviceFeeTooltip = "Service fee for booking",
    otherFeeTooltip = "Additional charges",
    onBooking,
    maxGuests = 10,
    currency = "₦",
    mobile = false
}: BookingCardProps) {
    const params = useSearchParams()
    const isEdit = !isEmpty(params.get("count"))
    let guest = params.get("count") || 2
    const [guests, setGuests] = useState(+guest)
    const [agreed, setAgreed] = useState(isEdit || false )

    const formatPrice = (amount: number) => {
        return `${currency}${amount.toLocaleString()}`
    }


    const total = (pricePerPerson * guests) + serviceFee + otherFee

    return (
        <Card className={`w-full rounded-3xl px-4 border-[#ABD0E4] ${mobile ? '': 'max-w-md'}`}>
            <CardContent className="p-6 space-y-6 mt-10">
                <div className="space-y-2">
                    <div className="text-2xl font-bold font-onest black-100 mb-8">
                        {formatPrice(pricePerPerson)}
                        <span className="text-sm font-medium black-200 font-onest"> per person</span>
                    </div>

                    <div className="w-full pb-4">
                        <Select
                            value={guests.toString()}
                            onValueChange={(value) => setGuests(parseInt(value))}
                            
                        >
                            <SelectTrigger className="w-full relative rounded-xl h-14 px-4 font-onest black-200 border-[#4D7890]">
                                <h2 className='absolute top-1 left-4 black-100 font-onest font-semibold'>Guest</h2>
                                <SelectValue placeholder="Select guests">
                                    <span className='mt-4 inline-block text-xs font-onest'>
                                        {guests} {guests === 1 ? 'Guest' : 'Guests'}

                                    </span>
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent className='absolute top-0 z-[9999]'>
                                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
                                    <SelectItem key={num} value={num.toString()} className='font-onest black-200 text-xs'>
                                        {num} {num === 1 ? 'Guest' : 'Guests'}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 py-4 border-t border-[#ABD0E4]">
                        <div className="flex justify-between items-center my-4">
                            <div className="flex items-center font-medium gap-2 font-onest black-100">
                                <span className='underline'>
                                    Service fee
                                </span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="h-4 w-4 text-[#4D7890]" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{serviceFeeTooltip}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className='font-onest black-100 font-semibold'>{formatPrice(serviceFee)}</div>
                        </div>

                        <div className="flex justify-between items-center pb-4 font-medium gap-2 font-onest black-100">
                            <div className="flex items-center gap-2 underline">
                                Other fee
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="h-4 w-4 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{otherFeeTooltip}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className='font-onest black-100 font-semibold'>{formatPrice(otherFee)}</div>
                        </div>

                        <div className="flex justify-between items-center py-6 border-y border-[#ABD0E4]">
                            <div className="font-bold black-100 font-onest text-2xl">Total</div>
                            <div className="font-bold black-100 font-onest text-2xl">{formatPrice(total)}</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-start space-x-2">
                    <Checkbox
                        id="terms"
                        checked={agreed}
                        onCheckedChange={(checked) => setAgreed(checked as boolean)}
                        className='mt-0.5'
                    />
                    <label
                        htmlFor="terms"
                        className="text-sm black-100 font-onest leading-5"
                    >
                        By booking with us, you agree to all travel rules and cancellation policies.
                    </label>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 px-6 ">
                <Button
                size='lg'
                color='dark'
                    className="w-full"
                    disabled={!agreed}
                    onClick={() => onBooking?.(guests)}
                >
                    Book Experience
                </Button>
                <ShadBtn variant="link" className="w-full">
                    Need Help with your booking?
                </ShadBtn>
            </CardFooter>
        </Card>
    )
}

