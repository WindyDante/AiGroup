"use client"

import type React from "react"
import Navigation from "@/components/navigation"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen">
            <Navigation />
            <main className="flex-1 overflow-auto pt-14">{children}</main>
        </div>
    )
}