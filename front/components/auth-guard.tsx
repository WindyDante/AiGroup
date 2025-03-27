'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

const publicPaths = [
    '/login',
    '/',
    '/forgot-password',
]

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const { toast } = useToast()

    useEffect(() => {
        const user = localStorage.getItem('user')
        const isPublicPath = publicPaths.includes(pathname)

        if (!user && !isPublicPath) {
            toast({
                title: '请先登录',
                description: '您需要登录后才能访问此页面',
                variant: 'destructive',
            })
            router.push('/login')
        }
    }, [pathname, router, toast])

    return <>{children}</>
}