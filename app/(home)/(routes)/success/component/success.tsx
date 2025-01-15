"use client"
import React from 'react'
import { FormattedMessage } from 'react-intl'

const Success = () => {
    return (
        <h3 className="text-center font-onest font-medium lg:text-5xl text-2xl black-100 mb-10">
            <FormattedMessage id="Booking Confirmed!" />  🎉
        </h3>
    )
}

export default Success
