"use client"
import Image from "next/image"

import { Button as ShadBtn } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"


import { FeeItem } from "./fee-item"
import { useParams, useRouter } from "next/navigation"
import { CaretLeftIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/button/button"
import { formatDateDShort, formatToNaira } from "@/utils/helper"
import { useUser } from "@/hooks/use-user"
import { useState } from "react"
import { LoginForm } from "@/components/form/login-form"
import { useBooking } from "@/hooks/use-booking"
import { RegisterForm } from "@/components/form/register-form"
import { Spinner } from "@/components/spinner"
import PaymentComponent from "@/components/paystack/paystack"
import { useQueryClient } from "@tanstack/react-query"
import { paystackKey } from "@/hooks/use-paystack"
import { FormattedMessage } from "react-intl"


interface BookingConfirmationProps {
  tripName: string
  startDate: Date
  endDate: Date
  basePrice: number
  guestCount: number
  serviceFee: number
  otherFee: number
  thumbnailUrl: string
  discount: number
}

export function BookingConfirmation({
  tripName,
  startDate,
  endDate,
  basePrice,
  guestCount,
  serviceFee,
  otherFee,
  thumbnailUrl,
  discount
}: BookingConfirmationProps) {
  const router = useRouter()
  const params = useParams()
  const { user } = useUser()
  const queryClient = useQueryClient();

  const { createBooking, load } = useBooking()
  const [open, setOpen] = useState({
    shown: true,
    key: 'LOGIN'
  })

  const waver = basePrice * discount * 0.01;
  const tripFee = (basePrice - waver) * guestCount
  const total = (tripFee + serviceFee + otherFee) || 1;

  const data = {
    totalPrice: total,
    eventId: params.eventId as string,
    bookingCount: guestCount
  }


  const onBack = () => {
    router.back();
  }

  const onComplete = async () => {
    queryClient.setQueryData(["PAYSTACK_MODAL"], () => ({
      amount: 0 * 100,
      email: "",
      shown: false,
      publicKey: paystackKey,
      reference: Date.now().toString(),
      // currency: "USD"
    }));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    queryClient.setQueryData(["PAYSTACK_MODAL"], () => ({
      amount: total * 100,
      email: user?.email,
      shown: true,
      publicKey: paystackKey,
      reference: Date.now().toString(),
      // currency: "USD",
    }));
  }

  const onChangeGuests = () => {
    router.push(`/event/${params.eventId}?count=${guestCount}`);
  }

  return (
    <div className="container max-w-6xl mx-auto p-4 px-0">
      <div className="flex items-center gap-4 mb-6">
        <ShadBtn
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <CaretLeftIcon className="w-10 h-10 text-lg" />
        </ShadBtn>
        <h4 className="md:text-[40px] text-2xl font-onest font-extrabold black-100">
          <FormattedMessage id="Complete booking" />
        </h4>
      </div>

      <div className="grid md:grid-cols-12 grid-cols-7 gap-6">
        {/* Left Column - Trip Details */}
        <div className="space-y-6 col-span-7 md:pr-16">
          <Card className="border border-orange-300 rounded-[32px] mb-10">
            <CardHeader className="p-2">
              <div className="flex gap-4 items-center">
                <Image
                  src={thumbnailUrl}
                  alt={tripName}
                  width={140}
                  height={140}
                  priority
                  className="rounded-3xl h-full object-cover"
                />
                <div className="space-y-1">
                  <h2 className="font-onest text-sm font-bold black-100 mb-2">{tripName}</h2>
                  <p className="text-sm black-200 font-medium font-onest mb-2">
                    {formatDateDShort(startDate)} - {formatDateDShort(endDate)}
                  </p>
                  <p className="font-onest font-bold text-xl">
                    ₦{basePrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-none p-0">
            <CardContent className="p-0 space-y-4">
              <div className="flex justify-between items-center">
                <div className="w-full">
                  <h3 className="font-medium font-onest black-100">
                  <FormattedMessage id="Guests" />
                  </h3>
                  <div className="flex text-base w-full pb-4 justify-between items-center border-b border-orange-300 font-onest">
                    <p className="text-base black-200">
                      {guestCount} {" "}
                      <FormattedMessage id="guest" />(s)
                    </p>
                    <ShadBtn
                      variant="link"
                      onClick={onChangeGuests}
                      className="font-onest underline black-100"
                    >
                      <FormattedMessage id="Change" />
                      
                    </ShadBtn>

                  </div>
                </div>
              </div>

              <div className="border-b border-orange-300 pb-2">
                <h3 className="font-medium font-onest black-100 mb-2">Date</h3>
                <p className="flex text-base w-full pb-4 justify-between items-center  font-onest black-200">
                  {formatDateDShort(startDate)} - {formatDateDShort(endDate)}
                </p>
              </div>
              <div className="pt-10">
                {!user ?
                  <>
                    <h2 className="font-onest font-medium text-2xl black-100 mb-4">
                      <FormattedMessage id="instruction" />
                    </h2>
                    {
                      open.shown ? open.key === "LOGIN" ?
                        <>
                          <LoginForm btnTxt={'Continue'} />
                          <div className="font-onest w-full text-center font-medium text-sm mt-10 black-100">
                            <FormattedMessage id="Don't have an account?" />
                             {" "} <ShadBtn variant={'link'} className="underline  capitalize font-onest font-bold text-sm black-200"
                              onClick={() => {
                                setOpen({
                                  shown: true,
                                  key: "REGISTER"
                                })
                              }}
                            >
                              <FormattedMessage id="Sign up" />
                            </ShadBtn>
                          </div>
                        </>
                        :
                        <>
                          <RegisterForm btnTxt="Continue" />
                          <div className="font-onest w-full text-center font-medium text-sm mt-10 black-100">
                          <FormattedMessage id="Already have an account" />
                            
                            <ShadBtn variant={'link'} className="underline  capitalize font-onest font-bold text-sm black-200"
                              onClick={() => {
                                setOpen({
                                  shown: true,
                                  key: "LOGIN"
                                })
                              }}
                            >
                              <FormattedMessage id="Log in" />
                            </ShadBtn>
                          </div>
                        </>
                        : null
                    }
                  </> :
                  <>
                    <Button
                      className="w-full"
                      size="lg"
                      color="dark"
                      onClick={onComplete}
                    >
                      {load ? <Spinner /> : "Complete Booking"}
                    </Button>
                  </>
                }

              </div>
            </CardContent>
          </Card>


        </div>

        {/* Right Column - Pricing Details */}
        <div className="md:col-span-5 col-span-7 md:order-last order-first w-full">
          <Card className="border border-orange-300 rounded-3xl">
            <CardContent className="w-full px-0">
              <div className="pt-10 pb-8 border-b border-orange-300 w-full">
                <div className={`flex  items-center justify-between`}>
                  <div className="flex items-center pl-6 gap-2 font-onest">
                    <span className="font-onest black-100 font-medium text-base">
                      <FormattedMessage id="Trip fee" />
                    </span>
                    <span className="font-onest black-200 font-medium text-base">
                      x {guestCount}
                      {" "} <FormattedMessage id="guest" />(s)
                    </span>
                  </div>
                  <span className="font-bold text-base font-onest pr-6">{formatToNaira(basePrice)}</span>
                </div>
              </div>
              <div className="py-8 border-b border-orange-300">
                <div className="pl-6 mb-4">
                  <FeeItem
                    label="Service fee"
                    amount={serviceFee}
                    tooltip="This helps us run our platform and offer services like 24/7 support on your trip."
                  />
                </div>
                <div className="pl-6">
                  <FeeItem
                    label="Other fee"
                    amount={otherFee}
                    tooltip="Additional charges including taxes and processing fees."
                  />
                </div>
                <div className="pl-6">
                  <FeeItem
                    label="Discount"
                    amount={discount}
                    tooltip="Additional charges including taxes and processing fees."
                    className="mt-4"
                  />
                </div>
              </div>
              <div className="pl-6 py-8">
                <FeeItem
                  label="Total"
                  amount={total}
                  className="font-semibold text-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <PaymentComponent
        onSuccess={async () => {
          createBooking(data)

          queryClient.setQueryData(["PAYSTACK_MODAL"], () => ({
            amount: 0 * 100,
            email: "",
            shown: false,
            publicKey: paystackKey,
            reference: Date.now().toString(),
            // "currency": "USD",  
          }));
        }}
      />
    </div>
  )
}

