import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Images } from "@/constants/image"

const destinations = [
    {
        name: "Nigeria",
        image: Images.Nigeria,
        alt: "Dramatic waterfall in Nigeria"
    },
    {
        name: "Explore",
        image: Images.Explore,
        alt: "Monument with water features"
    },
    {
        name: "South Africa",
        image: Images.SouthAfrica,
        alt: "Lighthouse in South Africa"
    },
    {
        name: "Maldives",
        image: Images.Medieves,
        alt: "Aerial view of Maldives beach and palm trees"
    }
]

export default function TravellerPage() {
    return (
        <div className="min-h-screen md:-translate-y-36 relative -translate-y-80 px-4 py-10 md:px-8">
            
            <div className="mx-auto max-w-7xl">
                <h2 className="text-[41px] font-extrabold bg-transparent mb-14 font-onest black-100 text-center "> For the Curious Traveller</h2>

                {/* Mobile: Horizontal scroll, Desktop: Offset grid */}
                <div className="scrollbar-hide flex gap-4 overflow-x-auto lg:pb-8 pb-20  lg:overflow-visible">
                    {destinations.map((destination, index) => (
                        <Card
                            key={destination.name}
                            className={`relative min-w-[304px] h-[360px] overflow-hidden ${index % 2 === 1 ? 'translate-y-16' : ''
                                }`}
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
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 md:-top-10 md:translate-y-4 translate-y-10">
                <Image
                    src={Images.Union}
                    alt="Background pattern"
                    width={1920}
                    height={1280}
                    className="h-full w-full object-cover bg-transparent"
                />
                 <div className="absolute -left-6 inset-0 -z-10 md:-top-10 md:translate-y-2 translate-y-2">

                    <Image
                        src={Images.Bg}
                        alt="Background pattern"
                        width={1920}
                        height={1280}
                        className="h-full absolute  w-full object-cover"
                    />
                 </div>
               
            </div>
        </div>
    )
}

