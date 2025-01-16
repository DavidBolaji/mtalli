import { useLanguage } from '@/hooks/use-language'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import enFlag from "@/public/en.png";
import frFlag from "@/public/fr.png";
import { AnimatePresence } from 'framer-motion';

// Language dropdown items
const languageOptions = [
    { code: "en", name: "English", flag: enFlag },
    { code: "fr", name: "French", flag: frFlag },
];


const LangDropdown = () => {
    const { language, toggleLanguage } = useLanguage()
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside() {
            
            if(isLanguageDropdownOpen) {
                setIsLanguageDropdownOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isLanguageDropdownOpen]);

    return (
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
    )
}

export default LangDropdown
