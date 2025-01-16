import { useLanguage } from '@/hooks/use-language'
import { useRequestModal } from '@/hooks/use-request-modal'
import { useUser } from '@/hooks/use-user'
import { dropdownLinks } from '@/utils/helper'
import { Grid } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const { useBreakpoint } = Grid

const HamburgerDropdown: React.FC<{ open: boolean }> = ({ open }) => {
    const { language } = useLanguage()
    const { user, logout } = useUser()
    const { toggleModal } = useRequestModal()
    const screens = useBreakpoint()
    const isMobile = !screens.lg // Check if screen is not 'lg'

    const [contactOpen, setContactOpen] = useState(false) // State to toggle Contact Us dropdown

    const contactDetails = [
        { type: 'email', value: 'hello@mtalii.com' },
        { type: 'phone', value: '+21626096779 (Tunisia)' },
        { type: 'phone', value: '+2349060015778 (Nigeria)' },
        { type: 'phone', value: '+255743461509 (Tanzania)' },
        { type: 'phone', value: '+265880171382 (Malawi)' },
        { type: 'phone', value: '+22244023134 (Mauritania)' },
        { type: 'phone', value: '+256771425483 (Uganda)' },
    ];


    return (
        <AnimatePresence mode="wait">
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute  top-20 lg:right-20 right-6 mt-6 py-4 w-72 z-[999] bg-white rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5"
                >
                    {dropdownLinks(user, language as 'fr' | 'en', logout).map((link, ind) => (
                        <div key={link.name} className="p-0 m-0 ">
                            {link.name === (language === 'fr' ? 'Déconnexion' : 'Sign Out') ? (
                                <span
                                    onClick={link.onClick}
                                    className="flex transition-colors cursor-pointer duration-300 items-center px-4 py-3 text-sm text-gray-700 font-onest hover:bg-orange-300"
                                >
                                    <link.icon size={28} color="black" className="h-4 w-4 mr-3 black-100" />
                                    {link.name}
                                </span>
                            ) : link.name === (language === 'fr' ? 'Demander une Destination' : 'Request a Destination') ? (
                                <div
                                    onClick={() => toggleModal(true)}
                                    className="flex transition-colors cursor-pointer duration-300 items-center px-4 py-3 text-sm text-gray-700 font-onest hover:bg-orange-300"
                                >
                                    <link.icon size={28} color="black" className="h-4 w-4 mr-3 black-100" />
                                    {link.name}
                                </div>
                            ) : (
                                <Link
                                    href={link.href}
                                    className="flex transition-colors cursor-pointer duration-300 items-center px-4 py-3 text-sm text-gray-700 font-onest hover:bg-orange-300"
                                >
                                    <link.icon size={28} color="black" className="h-4 w-4 mr-3 black-100" />
                                    {link.name}
                                </Link>
                            )}
                            {ind + 1 === 2 ? <hr className="my-2" /> : null}
                        </div>
                    ))}

                    {/* Add Contact Us Dropdown when screen is not 'lg' */}
                    {isMobile && (
                        <div
                            className="relative"
                            onMouseEnter={() => setContactOpen(true)}
                            onMouseLeave={() => setContactOpen(false)}
                        >
                            <button className="flex w-full transition-colors cursor-pointer duration-300 items-center px-4 py-3 text-sm text-gray-700 font-onest hover:bg-orange-300">
                                <Phone size={16} className='mr-3' /> Contact Us
                            </button>
                            <AnimatePresence>
                                {contactOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-lg overflow-hidden"
                                    >
                                        {contactDetails.map((contact, index) => (
                                  
                                                <div
                                                    key={index}
                                                    className="flex items-center px-4 py-3 hover:bg-orange-300 cursor-pointer"
                                                    // onClick={handleClick}
                                                >
                                                    {contact.type === 'email' ? (
                                                        <Mail size={16} className="mr-3 text-gray-600" />
                                                    ) : (
                                                        <Phone size={16} className="mr-3 text-gray-600" />
                                                    )}
                                                    <span className="text-gray-700 font-onest text-sm text-nowrap">{contact.value}</span>
                                                </div>
                                          
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default HamburgerDropdown
