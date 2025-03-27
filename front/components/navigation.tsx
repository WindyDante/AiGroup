"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  FileIcon as FilePresentation,
  Network,
  FileText,
  Settings,
  Menu,
  X,
  User,
  LogOut,
  Home,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

type UserType = {
  id: string
  name: string
  email: string
  avatar: string
}

const Navigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [user, setUser] = useState<UserType | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const routes = [
    {
      label: "仪表盘",
      icon: Home,
      href: "/dashboard",
      color: "text-blue-500",
    },
    {
      label: "聊天",
      icon: MessageSquare,
      href: "/dashboard/chat",
      color: "text-violet-500",
    },
    {
      label: "PPT",
      icon: FilePresentation,
      href: "/dashboard/ppt",
      color: "text-pink-700",
    },
    {
      label: "思维导图",
      icon: Network,
      href: "/dashboard/mindmap",
      color: "text-orange-500",
    },
    {
      label: "文档",
      icon: FileText,
      href: "/dashboard/document",
      color: "text-emerald-500",
    },
    {
      label: "API设置",
      icon: Settings,
      href: "/dashboard/settings/api",
      color: "text-gray-500",
    },
  ]

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem("user")

    toast({
      title: "已登出",
      description: "您已成功退出登录",
    })

    // Redirect to login page
    router.push("/login")
  }

  return (
    <>
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 h-14 border-b bg-white z-50 flex items-center px-4 justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="mr-2">
            {isCollapsed ? <Menu /> : <X />}
          </Button>
          <Link href="/dashboard" className="flex items-center">
            <span className="font-bold text-xl text-primary">AI Hub</span>
          </Link>
        </div>

        {/* Breadcrumb */}
        <div className="hidden md:flex">
          {pathname !== "/" && (
            <div className="flex items-center text-sm text-muted-foreground">
              <span>首页</span>
              <span className="mx-2">/</span>
              <span className="font-medium text-foreground capitalize">
                {pathname.split("/")[1] === "dashboard"
                  ? pathname.split("/")[2]
                    ? pathname.split("/")[2]
                    : "仪表盘"
                  : pathname.split("/")[1]}
              </span>
            </div>
          )}
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} alt={user?.name || "User"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || "用户"}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email || "user@example.com"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>个人资料</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>设置</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Side Navigation */}
      <div
        className={cn(
          "fixed left-0 top-14 h-full bg-white border-r pt-4 transition-all duration-300 z-40",
          isCollapsed ? "w-[60px]" : "w-[200px]",
        )}
      >
        <div className="flex flex-col space-y-2 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center justify-center py-2 px-2 rounded-lg group hover:bg-secondary transition",
                pathname === route.href
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.color)} />
              {!isCollapsed && <span className="ml-2 text-sm flex-1">{route.label}</span>}
            </Link>
          ))}
        </div>
      </div>

      {/* Main content padding to account for top and side nav */}
      <div className={cn("pt-16 transition-all duration-300", isCollapsed ? "pl-[60px]" : "pl-[200px]")} />
    </>
  )
}

export default Navigation

