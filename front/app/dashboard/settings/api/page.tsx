"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2 } from "lucide-react"

type ApiProvider = {
  id: string
  name: string
  logo: string
  isActive: boolean
  usagePercent: number
  usageCount: number
  usageLimit: number
}

export default function SettingsPage() {
  const [providers, setProviders] = useState<ApiProvider[]>([
    {
      id: "openai",
      name: "OpenAI",
      logo: "/placeholder.svg?height=40&width=40",
      isActive: true,
      usagePercent: 65,
      usageCount: 650,
      usageLimit: 1000,
    },
    {
      id: "anthropic",
      name: "Anthropic Claude",
      logo: "/placeholder.svg?height=40&width=40",
      isActive: true,
      usagePercent: 30,
      usageCount: 300,
      usageLimit: 1000,
    },
    {
      id: "gemini",
      name: "Google Gemini",
      logo: "/placeholder.svg?height=40&width=40",
      isActive: false,
      usagePercent: 0,
      usageCount: 0,
      usageLimit: 1000,
    },
  ])

  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    openai: "sk-••••••••••••••••••••••••••••••",
    anthropic: "sk-ant-••••••••••••••••••••••",
    gemini: "",
  })

  const handleApiKeyChange = (providerId: string, value: string) => {
    setApiKeys((prev) => ({
      ...prev,
      [providerId]: value,
    }))
  }

  const testConnection = (providerId: string) => {
    if (!apiKeys[providerId]) return

    // Simulate API test
    setProviders((prev) =>
      prev.map((provider) => (provider.id === providerId ? { ...provider, isActive: true } : provider)),
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">API Settings</h1>
        <p className="text-muted-foreground">Manage your AI provider connections and monitor usage</p>
      </div>

      <Tabs defaultValue="providers" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="providers">API Providers</TabsTrigger>
          <TabsTrigger value="usage">Usage Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="providers">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <Card key={provider.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={provider.logo || "/placeholder.svg"}
                        alt={provider.name}
                        className="w-10 h-10 rounded-md"
                      />
                      <CardTitle className="text-xl">{provider.name}</CardTitle>
                    </div>
                    <Badge
                      variant={provider.isActive ? "default" : "outline"}
                      className={provider.isActive ? "bg-green-500" : ""}
                    >
                      {provider.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <CardDescription>Configure your {provider.name} API credentials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${provider.id}-api-key`}>API Key</Label>
                    <div className="flex space-x-2">
                      <Input
                        id={`${provider.id}-api-key`}
                        type="password"
                        value={apiKeys[provider.id]}
                        onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                        placeholder="Enter your API key"
                        className={provider.isActive ? "border-green-500 breathing-effect" : ""}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          const input = document.getElementById(`${provider.id}-api-key`) as HTMLInputElement
                          input.type = input.type === "password" ? "text" : "password"
                        }}
                      >
                        👁️
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Status</Label>
                      <div className="flex items-center">
                        {provider.isActive ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-500">Connected</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-muted-foreground mr-1" />
                            <span className="text-sm text-muted-foreground">Not connected</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Usage</Label>
                      <span className="text-sm text-muted-foreground">
                        {provider.usageCount} / {provider.usageLimit}
                      </span>
                    </div>
                    <Progress value={provider.usagePercent} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => testConnection(provider.id)}
                    disabled={!apiKeys[provider.id]}
                  >
                    Test Connection
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>API Usage Statistics</CardTitle>
              <CardDescription>Monitor your API usage across all providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {providers.map((provider) => (
                  <div key={provider.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <img
                          src={provider.logo || "/placeholder.svg"}
                          alt={provider.name}
                          className="w-6 h-6 rounded-md"
                        />
                        <span className="font-medium">{provider.name}</span>
                      </div>
                      <span className="text-sm">
                        {provider.usageCount} / {provider.usageLimit} calls
                      </span>
                    </div>
                    <Progress value={provider.usagePercent} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}