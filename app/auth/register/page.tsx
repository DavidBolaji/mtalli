
import { RegisterForm } from '@/components/form/register-form'
import { Typography } from '@/components/typography/typography'
import { Images } from '@/constants/image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function RegisterPage() {
    return (
        <div className='md:px-0 px-4'>
           
            <div className='py-10'>
                <div className='grid lg:grid-cols-12 grid-cols-6'>
                    <div className='col-span-6'>
                        <div className='flex md:items-center md:px-12 flex-col justify-center w-full h-full'>
                            <Typography align='left' size='h3' as='h3' className='mb-6 md:text-[48px] md:mt-0 mt-8 text-[23px] text-nowrap'>
                            Welcome to Mtalii
                            </Typography>

                            <RegisterForm />
                            <span className='mt-12 font-onest black-200 text-center'>
                                Already have an account? {" "}
                                <Link href="/auth/login" className='underline'>Log in</Link>
                            </span>
                        </div>
                    </div>
                    <div className='col-span-6 lg:block hidden'>
                        <div className='relative h-[90vh] overflow-hidden rounded-3xl'>
                            <Image
                                src={Images.LoginImage}
                                alt='login image'
                                width={672}
                                height={744}
                                priority
                                className='absolute object-center'
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
