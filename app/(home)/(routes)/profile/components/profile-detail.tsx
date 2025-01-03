"use client"
import ProfileForm from '@/components/form/profileForm'
import React from 'react'

const ProfileDetail = () => {
  return (
    <div>
      <h1 className='font-onest text-2xl black-100 mb-6 font-normal'>
        Personal Details
      </h1>
      <ProfileForm />
    </div>
  )
}

export default ProfileDetail
