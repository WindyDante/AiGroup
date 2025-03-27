import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import AuthGuard from "@/components/auth-guard"
import { Toaster } from "@/components/ui/toaster"
import { LoadingSpinner } from "@/components/loading-spinner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Aggregation Tool",
  description: "All-in-one AI tool for chat, PPT, mind maps, and documents",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LoadingSpinner />
          <AuthGuard>
            {children}
          </AuthGuard>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'