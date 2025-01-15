"use client"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Images } from "@/constants/image"
import { FormattedMessage } from "react-intl"

const destinations = [
    { name: "Nigeria", image: Images.Nigeria, alt: "Dramatic waterfall in Nigeria" },
    { name: "Explore", image: Images.Explore, alt: "Monument with water features" },
    { name: "South Africa", image: Images.SouthAfrica, alt: "Lighthouse in South Africa" },
    { name: "Maldives", image: Images.Medieves, alt: "Aerial view of Maldives beach and palm trees" },
]

export default function TravellerPage() {
    return (
        <div className="relative min-h-screen px-4 py-10 md:px-8 lg:-translate-y-40 -translate-y-72">
            {/* Wavy Background */}
            <div className="bg-gradient-to-t absolute left-0 h-full lg:h-[405px] w-full from-[#ff9a68] to-transparent" />
            <div className="absolute inset-x-0 lg:-bottom-40 -bottom-32 -z-10 transform rotate-180 ">
                <svg
                    className="w-full h-[130px] md:h-[400px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#ff9a68"
                        d="M0,192L60,176C120,160,240,128,360,106.7C480,85,600,75,720,96C840,117,960,171,1080,181.3C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    />
                </svg>
            </div>

            <div className="mx-auto max-w-7xl">
                <h2 className="text-[41px] font-extrabold bg-transparent mb-14 md:leading-none leading-10 font-onest black-100 text-center">
                <FormattedMessage id="travellerTitle" />
                </h2>

                {/* Mobile: Horizontal scroll, Desktop: Offset grid */}
                <div className="scrollbar-hide flex gap-4 overflow-x-auto lg:pb-8 pb-20 lg:overflow-visible">
                    {destinations.map((destination, index) => (
                        <Card
                            key={destination.name}
                            className={`relative min-w-[304px] bg-transparent h-[360px] overflow-hidden border-0 ${index % 2 === 1 ? 'translate-y-16' : ''}`}
                        >
                            <div className="aspect-square">
                                <Image
                                    src={destination.image}
                                    alt={destination.alt}
                                    fill
                                    className="object-cover"
                                />
                                {destination.name !== "Explore" && (
                                    <div className="absolute right-3 top-3">
                                        <span className="rounded-full font-onest black-100 bg-white px-4 py-1 text-sm font-medium shadow-sm">
                                            {destination.name}
                                        </span>
                                    </div>
                                )}
                                {destination.name === "Explore" && (
                                    <div className="absolute bottom-4 left-4">
                                        <span className="text-xl font-semibold text-white">
                                            {destination.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
