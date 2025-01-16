import { Images } from '@/constants/image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavbarLogo: React.FC<{ handleClick: () => void }> = ({ handleClick }) => {
    return (
        <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" onClick={handleClick}>
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
    )
}

export default NavbarLogo
