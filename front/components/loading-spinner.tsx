"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function LoadingSpinner() {
    const [isLoading, setIsLoading] = useState(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const showTimerRef = useRef<NodeJS.Timeout | null>(null)
    const hideTimerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        // 清除之前的计时器
        if (showTimerRef.current) clearTimeout(showTimerRef.current)
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)

        // 设置延迟显示loading状态
        showTimerRef.current = setTimeout(() => {
            setIsLoading(true)
            // 设置隐藏loading状态的计时器
            hideTimerRef.current = setTimeout(() => {
                setIsLoading(false)
            }, 500) // 最短显示时间为500ms
        }, 50) // 添加50ms延迟，避免快速路由变化时的闪烁

        return () => {
            if (showTimerRef.current) clearTimeout(showTimerRef.current)
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
            setIsLoading(false) // 确保在组件卸载时清除loading状态
        }
    }, [pathname, searchParams])

    if (!isLoading) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
    )
}