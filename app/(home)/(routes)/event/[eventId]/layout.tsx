import MobileBook from '@/app/(home)/components/single-event/mobile-book'
import Footer from '@/components/footer/footer'
import React, { PropsWithChildren } from 'react'

const EventLayout:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className='relative'>
      {children}
      <Footer />
      <MobileBook />
    </div>
  )
}

export default EventLayout
