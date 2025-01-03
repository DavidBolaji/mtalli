"use client"
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter()
    useEffect(() => {
        router.push('/auth/login')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-nocheck
    }, [])
    return <>{children}</>
}

export default AuthLayout
