"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

type User = {
  id: string
  name: string
  email: string
  avatar: string
  phone?: string
  company?: string
  position?: string
  bio?: string
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    bio: "",
  })

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        company: parsedUser.company || "",
        position: parsedUser.position || "",
        bio: parsedUser.bio || "",
      })
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Update user in localStorage
      const updatedUser = {
        ...user,
        ...formData,
      }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      setIsLoading(false)
      toast({
        title: "个人资料已更新",
        description: "您的个人资料信息已成功保存",
      })
    }, 1000)
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">个人资料</h1>
        <p className="text-muted-foreground">管理您的个人信息和账户设置</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user?.avatar || "/placeholder.svg?height=96&width=96"} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-lg">{user?.name || "用户名"}</h3>
            <p className="text-sm text-muted-foreground mb-4">{user?.email || "email@example.com"}</p>
            <Button variant="outline" className="w-full mb-2">
              更换头像
            </Button>
          </CardContent>
          <Separator />
          <CardContent className="pt-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">账户信息</h4>
              <p className="text-xs text-muted-foreground">账户创建于: 2023年10月15日</p>
              <p className="text-xs text-muted-foreground">上次登录: 2023年11月20日</p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>编辑个人资料</CardTitle>
            <CardDescription>更新您的个人信息和偏好设置</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">个人信息</TabsTrigger>
                <TabsTrigger value="account">账户设置</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">姓名</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="您的姓名"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">邮箱</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="您的邮箱"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">电话</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="您的电话号码"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">公司</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="您的公司名称"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">职位</Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="您的职位"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">个人简介</Label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="关于您自己的简短介绍"
                        className="w-full min-h-[100px] p-2 rounded-md border border-input bg-transparent text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "保存中..." : "保存更改"}
                      </Button>
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="account">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">更改密码</h3>
                    <p className="text-sm text-muted-foreground">定期更改密码可以提高您账户的安全性</p>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">当前密码</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">新密码</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-new-password">确认新密码</Label>
                        <Input id="confirm-new-password" type="password" />
                      </div>
                      <Button>更新密码</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">账户删除</h3>
                    <p className="text-sm text-muted-foreground">删除您的账户将永久移除所有数据，此操作无法撤销</p>
                    <Button variant="destructive" className="mt-4">
                      删除账户
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

