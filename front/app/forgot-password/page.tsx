"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ForgotPasswordPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(1) // 1: 输入邮箱, 2: 输入验证码, 3: 重置密码
    const [formData, setFormData] = useState({
        email: "",
        verificationCode: "",
        newPassword: "",
        confirmPassword: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSendVerificationCode = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // 验证邮箱
        if (!formData.email) {
            toast({
                title: "错误",
                description: "请输入邮箱地址",
                variant: "destructive",
            })
            setIsLoading(false)
            return
        }

        // 模拟发送验证码
        setTimeout(() => {
            setIsLoading(false)
            toast({
                title: "验证码已发送",
                description: `验证码已发送到 ${formData.email}，请查收`,
            })
            setStep(2) // 进入下一步
        }, 1500)
    }

    const handleVerifyCode = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // 验证验证码
        if (!formData.verificationCode) {
            toast({
                title: "错误",
                description: "请输入验证码",
                variant: "destructive",
            })
            setIsLoading(false)
            return
        }

        // 模拟验证验证码
        setTimeout(() => {
            setIsLoading(false)
            toast({
                title: "验证成功",
                description: "验证码验证成功，请设置新密码",
            })
            setStep(3) // 进入下一步
        }, 1500)
    }

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // 验证密码
        if (!formData.newPassword || !formData.confirmPassword) {
            toast({
                title: "错误",
                description: "请填写所有必填字段",
                variant: "destructive",
            })
            setIsLoading(false)
            return
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast({
                title: "错误",
                description: "两次输入的密码不一致",
                variant: "destructive",
            })
            setIsLoading(false)
            return
        }

        // 模拟重置密码
        setTimeout(() => {
            setIsLoading(false)
            toast({
                title: "密码重置成功",
                description: "您的密码已成功重置，请使用新密码登录",
            })
            router.push("/login")
        }, 1500)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">AI Hub</CardTitle>
                    <CardDescription>
                        {step === 1 && "请输入您的邮箱地址，我们将向您发送验证码"}
                        {step === 2 && "请输入您收到的验证码"}
                        {step === 3 && "请设置您的新密码"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 1 && (
                        <form onSubmit={handleSendVerificationCode}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">邮箱</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "发送中..." : "发送验证码"}
                                </Button>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerifyCode}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="verificationCode">验证码</Label>
                                    <Input
                                        id="verificationCode"
                                        name="verificationCode"
                                        placeholder="请输入验证码"
                                        value={formData.verificationCode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "验证中..." : "验证"}
                                </Button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleResetPassword}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">新密码</Label>
                                    <Input
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">确认密码</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "重置中..." : "重置密码"}
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/login" className="text-sm text-muted-foreground hover:underline">
                        返回登录
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}