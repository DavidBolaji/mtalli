import { AnimatePresence } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';

const navHeaderLink = [
    { name: "Contact us", href: "#" },
]

const contactDetails = [
    { type: 'email', value: 'hello@mtalii.com' },
    { type: 'phone', value: '+21626096779 (Tunisia)' },
    { type: 'phone', value: '+2349060015778 (Nigeria)' },
    { type: 'phone', value: '+255743461509 (Tanzania)' },
    { type: 'phone', value: '+265880171382 (Malawi)' },
    { type: 'phone', value: '+22244023134 (Mauritania)' },
    { type: 'phone', value: '+256771425483 (Uganda)' },
];

const NavbarHeaderLink: React.FC<{ handleClick: () => void }> = ({ handleClick }) => {
    const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside() {
            if (isContactDropdownOpen) {
                setIsContactDropdownOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isContactDropdownOpen]);

    return (
        <div className="hidden md:flex md:items-center md:space-x-4">
            {navHeaderLink.map((link) => (
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
                                        onClick={handleClick}
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
    )
}

export default NavbarHeaderLink
