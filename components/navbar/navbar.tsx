"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
    X,
    LogIn,
    UserPlus,
    Map,
    BarChart2,
    User,
    LogOut,
    Mail,
    Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Images } from "@/constants/image";
import { Avatar } from "../avatar/avatar";
import { AnimatePresence } from "framer-motion";
import { UserType, useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { useRequestModal } from "@/hooks/use-request-modal";
import { useLanguage } from "@/hooks/use-language";

import enFlag from "@/public/en.png";
import frFlag from "@/public/fr.png";
import { FormattedMessage } from "react-intl";

// Language dropdown items
const languageOptions = [
    { code: "en", name: "English", flag: enFlag },
    { code: "fr", name: "French", flag: frFlag },
];

const contactDetails = [
    { type: 'email', value: 'hello@mtalii.com' },
    { type: 'phone', value: '+21626096779 (Tunisia)' },
    { type: 'phone', value: '+2349060015778 (Nigeria)' },
    { type: 'phone', value: '+255743461509 (Tanzania)' },
    { type: 'phone', value: '+265880171382 (Malawi)' },
    { type: 'phone', value: '+22244023134 (Mauritania)' },
    { type: 'phone', value: '+256771425483 (Uganda)' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage()
    const { toggleModal } = useRequestModal();
    const { user, logout } = useUser();
    const router = useRouter();

    // Close the menu when the route changes
    useEffect(() => {
        setIsOpen(false);
    }, [router]);

    // Toggle menu state
    const toggleMenu = () => setIsOpen(!isOpen);

    // Dropdown links for users
    const dropdownLinks = (
        user: UserType | null | undefined,
        language: 'en' | 'fr'
    ): { name: string; href: string; icon: any; onClick?: () => void }[] => {
        // Text for guest links
        const guestLinks = [
            {
                name: language === 'fr' ? 'Se Connecter' : 'Log In',
                href: '/auth/login',
                icon: LogIn,
            },
            {
                name: language === 'fr' ? "S'inscrire" : 'Sign Up',
                href: '/auth/register',
                icon: UserPlus,
            },
        ];

        // Text for user links
        const userLinks = [
            {
                name: language === 'fr' ? 'Votre Profil' : 'Your Profile',
                href: '/profile',
                icon: User,
            },
            {
                name: language === 'fr' ? 'Historique des Réservations' : 'Booking History',
                href: '/history',
                icon: Map,
            },
            {
                name: language === 'fr' ? 'Déconnexion' : 'Sign Out',
                href: '/sign-out',
                icon: LogOut,
                onClick: logout,
            },
        ];

        // Text for common links
        const commonLinks = [
            {
                name: language === 'fr' ? 'Demander une Destination' : 'Request a Destination',
                href: '#',
                icon: Map,
            },
        ];

        return user ? [...userLinks, ...commonLinks] : [...guestLinks, ...commonLinks];
    };


    // Function to open the request modal
    const openRequestModal = useCallback(() => {
        toggleModal(true);
        setIsOpen(false);
        setIsContactDropdownOpen(false);
    }, [toggleModal]);

    // Close dropdowns when a link is clicked
    const handleLinkClick = () => {
        setIsOpen(false);
        setIsContactDropdownOpen(false);
    };

    return (
        <nav className="w-full bg-white shadow-sm h-24 sticky top-0 z-[999]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex justify-between items-center h-24">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center" onClick={handleLinkClick}>
                            <Image
                                src={Images.BlackLogo}
                                alt="Mtalii Logo"
                                width={90}
                                height={40}
                                priority
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center">
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:space-x-4">
                            {[
                                // { name: "What is Mtalii", href: "/about" },
                                { name: "Contact us", href: "#" },
                            ].map((link) => (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onClick={() => {
                                        if (link.name === "Contact us") {
                                            setIsContactDropdownOpen(!isContactDropdownOpen);
                                        }
                                    }}
                                >
                                    <span className="text-gray-700 font-onest cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium">
                                        <FormattedMessage id={link.name} />
                                    </span>

                                    {/* Contact Us Dropdown */}
                                    <AnimatePresence mode="wait">
                                        {link.name === "Contact us" && isContactDropdownOpen && (
                                            <div className="absolute z-10 mt-10 bg-white border border-gray-200 rounded-lg shadow-md w-60">
                                                {contactDetails.map((contact, ind) => (
                                                    <div
                                                        key={ind}
                                                        className="flex items-center px-4 py-3 hover:bg-orange-300 cursor-pointer"
                                                        onClick={handleLinkClick}
                                                    >
                                                        {contact.type === 'email' ? (
                                                            <Mail size={16} className="mr-3 text-gray-600" />
                                                        ) : (
                                                            <Phone size={16} className="mr-3 text-gray-600" />
                                                        )}
                                                        <span className="text-gray-700 font-onest text-sm text-nowrap">{contact.value}</span>
                                                    </div>
                                                ))}

                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center space-x-6 ml-3">
                            {/* Language Dropdown */}
                            <div className="relative">
                                <button
                                    className="flex items-center space-x-2 p-2 border border-gray-300 rounded-md focus:outline-none hover:bg-gray-100"
                                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                                >
                                    <Image
                                        src={language === "en" ? enFlag : frFlag}
                                        alt="Language Flag"
                                        width={24}
                                        height={16}
                                        className="rounded"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {language === "en" ? "English" : "French"}
                                    </span>
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {isLanguageDropdownOpen && (
                                        <div className="absolute top-16 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-40">
                                            {languageOptions.map((option) => (
                                                <div
                                                    key={option.code}
                                                    onClick={() => {
                                                        toggleLanguage(option.code as 'en' | 'fr')
                                                        setIsLanguageDropdownOpen(false)
                                                    }}
                                                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <Image
                                                        src={option.flag}
                                                        alt={`${option.name} Flag`}
                                                        width={24}
                                                        height={16}
                                                        className="rounded mr-2"
                                                    />
                                                    <span className="text-sm text-gray-700">
                                                        {option.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Profile and Mobile Menu Buttons */}
                        <div className="flex items-center">
                            <div className="relative ml-2">
                                <button
                                    className="p-2 rounded-full focus:outline-none"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {user?.pic ? (
                                        <Avatar src={user?.pic} size="lg" className="w-9 h-9" />
                                    ) : (
                                        <Avatar size="lg" className="w-9 h-9" />
                                    )}
                                </button>

                            </div>


                            {/* Dropdown Menu */}
                            <AnimatePresence mode="wait">
                                {isOpen && (
                                    <div className="absolute top-20 lg:right-20 right-6 mt-6 py-4 w-72 z-[999] bg-white rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                                        {dropdownLinks(user, language as 'fr' | 'en').map((link, ind) => (
                                            <div key={link.name} className="p-0 m-0" onClick={handleLinkClick}>
                                                {link.name === (language === 'fr' ? 'Déconnexion' : 'Sign Out') ? (
                                                    <span
                                                        onClick={link.onClick}
                                                        className="flex transition-colors cursor-pointer duration-300 items-center px-4 py-3 text-sm text-gray-700 font-onest hover:bg-gray-100"
                                                    >
                                                        <link.icon size={28} color="black" className="h-4 w-4 mr-3 black-100" />
                                                        {link.name}
                                                    </span>
                                                ) : link.name === (language === 'fr' ? 'Demander une Destination' : 'Request a Destination') ? (
                                                    <div
                                                        onClick={openRequestModal}
                                                        className="flex transition-colors cursor-pointer duration-300 items-center px-4 py-3 text-sm text-gray-700 font-onest hover:bg-gray-100"
                                                    >
                                                        <link.icon size={28} color="black" className="h-4 w-4 mr-3 black-100" />
                                                        {link.name}
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={link.href}
                                                        className="flex transition-colors cursor-pointer duration-300 items-center px-4 py-3 text-sm text-gray-700 font-onest hover:bg-gray-100"
                                                    >
                                                        <link.icon size={28} color="black" className="h-4 w-4 mr-3 black-100" />
                                                        {link.name}
                                                    </Link>
                                                )}
                                                {ind + 1 === 2 ? <hr className="my-2" /> : null}
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

        </nav >
    );
};

export default Navbar;
