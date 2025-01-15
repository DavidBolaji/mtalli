'use client'

import { Button } from '@/components/button/button'
import { Images } from '@/constants/image'
import Image from 'next/image'
import { FormattedMessage } from 'react-intl'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen z-0 w-full lg:px-28 px-5 overflow-hidden bg-transparent">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-20 top-0">
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
            <FormattedMessage id="heroTitle" />
            </h1>
            <p className="max-w-lg md:text-xl text-lg tracking-wide black-100 font-medium font-onest">
            <FormattedMessage id="heroDescription" />
              {/* We&apos;re here to make planning your next adventure as delightful as the journey itself. */}
            </p>
            <div className="flex gap-4 z-[999] relative">
            <a className="" href="#travel">
              <Button size='lg' color='dark' className='font-onest h-14 md:w-56 flex justify-center items-center'>
                {/* Explore Now */}
                <FormattedMessage id="heroButton" />
              </Button>
              </a>
            </div>
          </div>

          <Image
            src={Images.HeroRight}
            width={524}
            height={435}
            alt='hero-right'
            className='md:block hidden'
          />

        </div>
      </div>
    </section>
  )
}

