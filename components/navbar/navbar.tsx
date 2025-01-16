"use client";

import React, { useEffect, useState } from "react";
import {
    X,
    BarChart2,
} from "lucide-react";

import { Avatar } from "../avatar/avatar";
import { useUser } from "@/hooks/use-user";
import NavbarLogo from "./navbar-logo";
import NavbarHeaderLink from "./navbar-header-link";
import LangDropdown from "./lang-dropdown";
import HamburgerDropdown from "./hamburger-dropdown";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        function handleClickOutside() {
            if(isOpen) {
                setIsOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);

    // Toggle menu state
    const toggleMenu = () => setIsOpen(!isOpen);
    // Close dropdowns when a link is clicked
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <nav className="w-full bg-white shadow-sm h-24 sticky top-0 z-[999]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex justify-between items-center h-24">
                    {/* Logo */}
                    <NavbarLogo handleClick={handleLinkClick} />

                    <div className="flex items-center">
                        {/* Desktop Navigation */}
                        <NavbarHeaderLink handleClick={handleLinkClick} />
                        <LangDropdown />

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
                            <HamburgerDropdown open={isOpen} />
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
