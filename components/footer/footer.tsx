"use client"

import { FacebookIcon } from '@/constants/icons/facebook';
import { InstagramIcon } from '@/constants/icons/instagram';
import { LinkedInIcon } from '@/constants/icons/linkedin';
import { TwitterIcon } from '@/constants/icons/twitter';
import { Images } from '@/constants/image';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

export default function Footer() {
    const destinations = [
        { country: 'Italy', landmark: 'Colosseum, Rome' },
        { country: 'Japan', landmark: 'Shibuya Crossing, Tokyo' },
        { country: 'Australia', landmark: 'Sydney Opera House, Sydney' },
        { country: 'France', landmark: 'Eiffel Tower, Paris' },
        { country: 'South Africa', landmark: 'Table Mountain, Cape Town' },
        { country: 'Thailand', landmark: 'Grand Palace, Bangkok' },
        { country: 'Greece', landmark: 'Acropolis, Athens' },
        { country: 'Brazil', landmark: 'Christ the Redeemer, Rio de Janeiro' },
    ];

    const socialLinks = [
        { href: 'https://www.facebook.com/share/mfyCa4FWYC9ZoYCX/?mibextid=LQQJ4d', icon: FacebookIcon, label: 'Facebook' },
        { href: '#', icon: InstagramIcon, label: 'Instagram' },
        { href: '#', icon: LinkedInIcon, label: 'LinkedIn' },
        { href: '#', icon: TwitterIcon, label: 'Twitter' },
    ];

    const footerLinks = [
        { href: '/terms', label: 'Terms' },
        { href: '/privacy', label: 'Privacy' },
        { href: '/help-center', label: 'Help Center' },
        { href: '/faq', label: 'FAQ' },
    ];

    return (
        <footer
            className="bg-black relative py-8 border-t border-[#ABD0E4] bg-cover bg-center px-4 sm:px-6 lg:px-20"
        >
            <div className="absolute inset-0 z-1 top-1">
                <Image
                    src={Images.WorldMap}
                    alt="Background pattern"
                    width={1920}
                    height={1680}
                    className="h-full w-full object-cover object-left opacity-30"
                />
            </div>
            <div className="container mx-auto px-4 md:px-0 relative z-3 mt-[56px]">
                <h2 className="text-2xl font-medium mb-[18px] font-onest text-white">
                <FormattedMessage id="footerTitle" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {destinations.map(({ country, landmark }) => (
                        <div key={country}>
                            <h3 className="font-bold text-white text-sm font-onest mb-2">{country}</h3>
                            <p className='font-onest text-sm font-medium text-orange-200'>{landmark}</p>
                        </div>
                    ))}
                </div>
                <div className="border-t border-white mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center md:w-auto w-full space-x-4 mt-4 md:mt-0">
                        <p className="font-bold text-white text-sm font-onest md:mr-5 md:w-auto w-full flex md:flex-row flex-col">© {new Date().getFullYear()} Mtalii</p>
                        {socialLinks.map(({ href, icon: Icon, label }) => (
                            <Link key={label} href={href} className="bg-orange-500 rounded-full p-2 md:block hidden" aria-label={label}>
                                <Icon size="20" color='white' />
                            </Link>
                        ))}
                    </div>
                    <div className='flex gap-x-3 flex-start w-full mt-3 md:hidden'>

                    {socialLinks.map(({ href, icon: Icon, label }) => (
                            <Link key={label} href={href} className="bg-orange-500 rounded-full p-2" aria-label={label}>
                                <Icon size="20" color='white' />
                            </Link>
                        ))}
                    </div>
                    <div className="flex space-x-4 mt-4 md:mt-0 md:w-auto w-full text-sm font-onest text-white">
                        {footerLinks.map(({ href, label }) => (
                            <Link key={label} href={href} className="hover:underline font-onest">
                                <FormattedMessage id={label} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
