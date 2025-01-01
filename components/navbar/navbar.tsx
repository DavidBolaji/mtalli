"use client"

import React, { useState } from 'react';
import { X, LogIn, UserPlus, HelpCircle, Map, BarChart2, User, Heart, LogOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Images } from '@/constants/image';
import { Avatar } from '../avatar/avatar';
import { AnimatePresence } from 'framer-motion';
import { UserType, useUser } from '@/hooks/use-user';



const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useUser();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: 'What is Mtalii', href: '/about' },
        { name: 'Customise package', href: '/customize' },
        { name: 'Contact us', href: '/contact' },
    ];

    const dropdownLinks = (user: UserType | null | undefined): {
        name: string;
        href: string;
        icon: any;
        onClick?: () => void
    }[] => {
        const guestLinks = [
          { name: 'Log In', href: '/auth/login', icon: LogIn },
          { name: 'Sign Up', href: '/auth/register', icon: UserPlus },
        ];
      
        const userLinks = [
          { name: 'Your Profile', href: '/profile', icon: User },
          { name: 'Booking History', href: '/history', icon: Map },
          { name: 'Saved', href: '/request', icon: Heart },
          { name: 'Sign Out', href: '/sign-out', icon: LogOut, onClick: logout },
        ];
      
        const commonLinks = [
          { name: 'Help Center', href: '/help', icon: HelpCircle },
          { name: 'Request a Destination', href: '/request', icon: Map },
        ];
      
        return user ? [...userLinks, ...commonLinks] : [...guestLinks, ...commonLinks];
      };

    return (
        <nav className="w-full bg-white shadow-sm h-24 sticky top-0 z-[9999999]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex justify-between items-center h-24">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image src={Images.BlackLogo} alt="Mtalii Logo" width={90} height={40} priority className="h-8 w-auto" />
                        </Link>
                    </div>

                    <div className='flex items-center'>
                        {/* Desktop Navigation */}
                        <div className="hidden  md:flex md:items-center md:space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-700 font-onest hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Profile and Mobile Menu Buttons */}
                        <div className="flex items-center">
                            <div className="relative ml-2">
                                <button
                                    className="p-2 rounded-full focus:outline-none"
                                >
                                    <Avatar size='lg' className='w-9 h-9' />
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence mode='wait'>
                                    {isOpen && (
                                        <div className="absolute -right-10 mt-6 py-4 w-72 z-[999] bg-white rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                                            {dropdownLinks(user).map((link, ind) => (
                                                <div key={link.name} className='p-0 m-0'>
                                                    {link.name === "Sign Out" ? <span
                                                        onClick={link.onClick}
                                                        className="flex transition-colors duration-300 items-center px-4 py-3 text-sm text-gray-700 font-onest hover:bg-gray-100"
                                                    >
                                                        <link.icon size={'28'} color='black' className="h-4 w-4 mr-3 black-100" />
                                                        {link.name}
                                                    </span>:
                                                    <Link
                                                    href={link.href}
                                                    className="flex transition-colors duration-300 items-center px-4 py-3 text-sm text-gray-700 font-onest hover:bg-gray-100"
                                                >
                                                    <link.icon size={'28'} color='black' className="h-4 w-4 mr-3 black-100" />
                                                    {link.name}
                                                </Link>
                                                    }
                                                    {ind + 1 === 2 ? <hr className='my-2' /> : null}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mobile menu button */}
                            <div className="">
                                <button
                                    onClick={toggleMenu}
                                    className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                                >
                                    {isOpen ? (
                                        <X className="h-6 w-6" />
                                    ) : (
                                        <BarChart2 className="h-6 w-6 rotate-90 font-bold" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </nav>
    );
};

export default Navbar;