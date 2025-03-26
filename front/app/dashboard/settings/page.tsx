"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Bell, Sun, Globe, Shield, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    theme: "system",
    language: "zh_CN",
    notifications: {
      email: true,
      push: true,
      updates: false,
      marketing: false,
    },
    privacy: {
      shareData: false,
      collectUsage: true,
    },
    display: {
      compactMode: false,
      highContrast: false,
    },
  })

  const handleThemeChange = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      theme: value,
    }))
  }

  const handleLanguageChange = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      language: value,
    }))
  }

  const handleSwitchChange = (category: string, setting: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: checked,
      },
    }))
  }

  const handleSaveSettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "设置已保存",
        description: "您的偏好设置已成功更新",
      })
    }, 1000)
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">设置</h1>
        <p className="text-muted-foreground">管理您的应用程序偏好设置和账户选项</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="mb-6">
          <TabsTrigger value="general">常规</TabsTrigger>
          <TabsTrigger value="notifications">通知</TabsTrigger>
          <TabsTrigger value="privacy">隐私与安全</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sun className="mr-2 h-5 w-5" />
                  <span>外观</span>
                </CardTitle>
                <CardDescription>自定义应用程序的外观和感觉</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>主题</Label>
                  <RadioGroup
                    value={settings.theme}
                    onValueChange={handleThemeChange}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="theme-light" />
                      <Label htmlFor="theme-light" className="cursor-pointer">
                        浅色
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="theme-dark" />
                      <Label htmlFor="theme-dark" className="cursor-pointer">
                        深色
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="theme-system" />
                      <Label htmlFor="theme-system" className="cursor-pointer">
                        跟随系统
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>紧凑模式</Label>
                      <p className="text-sm text-muted-foreground">减少界面元素之间的间距</p>
                    </div>
                    <Switch
                      checked={settings.display.compactMode}
                      onCheckedChange={(checked) => handleSwitchChange("display", "compactMode", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>高对比度</Label>
                      <p className="text-sm text-muted-foreground">增加界面元素之间的对比度</p>
                    </div>
                    <Switch
                      checked={settings.display.highContrast}
                      onCheckedChange={(checked) => handleSwitchChange("display", "highContrast", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  <span>语言与区域</span>
                </CardTitle>
                <CardDescription>设置您的语言和区域偏好</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">语言</Label>
                  <Select value={settings.language} onValueChange={handleLanguageChange}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="选择语言" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh_CN">简体中文</SelectItem>
                      <SelectItem value="en_US">English (US)</SelectItem>
                      <SelectItem value="ja_JP">日本語</SelectItem>
                      <SelectItem value="ko_KR">한국어</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="timezone">时区</Label>
                  <Select defaultValue="Asia/Shanghai">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="选择时区" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Shanghai">中国标准时间 (GMT+8)</SelectItem>
                      <SelectItem value="America/New_York">东部标准时间 (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">格林威治标准时间 (GMT)</SelectItem>
                      <SelectItem value="Asia/Tokyo">日本标准时间 (GMT+9)</SelectItem>
                      <SelectItem value="Australia/Sydney">澳大利亚东部标准时间 (GMT+10)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="date-format">日期格式</Label>
                  <Select defaultValue="yyyy-MM-dd">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="选择日期格式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                      <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                <span>通知设置</span>
              </CardTitle>
              <CardDescription>配置您希望接收的通知类型和方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>电子邮件通知</Label>
                    <p className="text-sm text-muted-foreground">接收重要更新和活动的电子邮件</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => handleSwitchChange("notifications", "email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>推送通知</Label>
                    <p className="text-sm text-muted-foreground">在您的设备上接收实时通知</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => handleSwitchChange("notifications", "push", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>产品更新</Label>
                    <p className="text-sm text-muted-foreground">接收有关新功能和改进的通知</p>
                  </div>
                  <Switch
                    checked={settings.notifications.updates}
                    onCheckedChange={(checked) => handleSwitchChange("notifications", "updates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>营销信息</Label>
                    <p className="text-sm text-muted-foreground">接收促销和特别优惠的通知</p>
                  </div>
                  <Switch
                    checked={settings.notifications.marketing}
                    onCheckedChange={(checked) => handleSwitchChange("notifications", "marketing", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                <span>隐私与安全</span>
              </CardTitle>
              <CardDescription>管理您的隐私偏好和安全设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>数据共享</Label>
                    <p className="text-sm text-muted-foreground">允许与第三方服务共享您的使用数据</p>
                  </div>
                  <Switch
                    checked={settings.privacy.shareData}
                    onCheckedChange={(checked) => handleSwitchChange("privacy", "shareData", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>使用统计</Label>
                    <p className="text-sm text-muted-foreground">允许收集匿名使用数据以改进服务</p>
                  </div>
                  <Switch
                    checked={settings.privacy.collectUsage}
                    onCheckedChange={(checked) => handleSwitchChange("privacy", "collectUsage", checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>会话安全</Label>
                  <RadioGroup defaultValue="30min" className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="15min" id="session-15" />
                      <Label htmlFor="session-15" className="cursor-pointer">
                        15分钟不活动后注销
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="30min" id="session-30" />
                      <Label htmlFor="session-30" className="cursor-pointer">
                        30分钟不活动后注销
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1hour" id="session-60" />
                      <Label htmlFor="session-60" className="cursor-pointer">
                        1小时不活动后注销
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="never" id="session-never" />
                      <Label htmlFor="session-never" className="cursor-pointer">
                        永不自动注销
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-medium">隐私控制</h3>
                  </div>
                  <Button variant="outline" className="w-full justify-start">
                    <EyeOff className="mr-2 h-4 w-4" />
                    查看和管理您的数据
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading ? "保存中..." : "保存所有设置"}
        </Button>
      </div>
    </div>
  )
}

