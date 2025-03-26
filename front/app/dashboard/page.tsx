"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { MessageSquare, FileIcon as FilePresentation, Network, FileText } from "lucide-react"

type User = {
  id: string
  name: string
  email: string
  avatar: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const features = [
    {
      title: "AI 聊天",
      description: "在统一的聊天界面中与多个AI模型交互",
      icon: MessageSquare,
      href: "/dashboard/chat",
      color: "bg-violet-100 text-violet-500",
    },
    {
      title: "PPT 生成器",
      description: "借助AI辅助创建专业演示文稿",
      icon: FilePresentation,
      href: "/dashboard/ppt",
      color: "bg-pink-100 text-pink-700",
    },
    {
      title: "思维导图创建器",
      description: "使用AI驱动的思维导图可视化想法和概念",
      icon: Network,
      href: "/dashboard/mindmap",
      color: "bg-orange-100 text-orange-500",
    },
    {
      title: "文档工作室",
      description: "借助AI建议起草、编辑和增强文档",
      icon: FileText,
      href: "/dashboard/document",
      color: "bg-emerald-100 text-emerald-500",
    },
  ]

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">欢迎回来，{user?.name || "用户"}</h1>
        <p className="text-muted-foreground mt-2">您可以在这里访问所有AI工具和功能</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <Link href={feature.href}>
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.color} mb-2`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">开始使用</Button>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

