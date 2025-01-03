'use client'

import { Button } from '@/components/button/button'
import { Images } from '@/constants/image'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
    return (
        <section className="relative min-h-screen z-[30] w-full lg:px-28 px-5 overflow-hidden bg-transparent">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-10 top-0">
                <Image
                    src={Images.WorldMap}
                    alt="Background pattern"
                    width={1920}
                    height={1980}
                    className="h-full w-full object-cover"
                />
            </div>

          
            <div className="relative z-10 mx-auto py-12 md:py-12">
                <div className="grid gap-12 md:grid-cols-2">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center space-y-6 ">
                        <h1 className="text-4xl font-extrabold font-onest tracking-tight text-[#001F3F] md:text-7xl">
                            Discover Your Next Adventure
                        </h1>
                        <p className="max-w-lg md:text-xl text-lg tracking-wide black-100 font-medium font-onest">
                            We&apos;re here to make planning your next adventure as delightful as the journey itself.
                        </p>
                        <div className="flex gap-4">
                            <Button size='lg' color='dark' className='font-onest h-14 md:w-56 flex justify-center items-center'>
                                Explore Now

                            </Button>
                            <Link
                                href="#learn"
                                className="px-6 py-3 black-100 transition-colors font-bold font-onest text-nowrap text-base"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    <Image
                        src={Images.HeroRight}
                        width={524}
                        height={435}
                        alt='hero-right'
                        className='md:block hidden'
                    />

                    {/* Right Content - Circular Images */}
                    {/* <div className="relative hidden md:block">
            <div className="absolute right-0 top-0 h-96 w-96">
              <div className="absolute right-0 top-0 h-72 w-72 overflow-hidden rounded-full bg-[#B8E1E3]">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Travel destination 1"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-12 -left-12 h-48 w-48 overflow-hidden rounded-full bg-[#E3F4F5]">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Travel destination 2"
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 h-60 w-60 overflow-hidden rounded-full bg-[#B8E1E3]">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Travel destination 3"
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div> */}
                </div>
                {/* <TravellerPage /> */}

                {/* Experience Cards - Desktop Only */}
                {/* <div className="hidden md:block">
          <div className="absolute right-4 top-1/2 space-y-4">
            <div className="w-64 rounded-full border bg-white p-4 shadow-lg">
              <h3 className="font-semibold">Discover</h3>
              <p className="text-sm text-gray-600">When do you want to go?</p>
            </div>
            <div className="w-64 rounded-full border bg-white p-4 shadow-lg">
              <h3 className="font-semibold">Book</h3>
              <p className="text-sm text-gray-600">When do you want to go?</p>
            </div>
            <div className="w-64 rounded-full border bg-white p-4 shadow-lg">
              <h3 className="font-semibold">Dive</h3>
              <p className="text-sm text-gray-600">When do you want to go?</p>
            </div>
          </div>
        </div> */}
            </div>
        </section>
    )
}

