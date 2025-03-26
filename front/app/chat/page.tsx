"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PaperclipIcon, Send, Trash, MoreHorizontal, Sparkles, Thermometer, Maximize2 } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  model: string
}

type Conversation = {
  id: string
  title: string
  messages: Message[]
  lastUpdated: Date
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "General Questions",
      messages: [
        {
          id: "m1",
          content: "Hello! How can I help you today?",
          role: "assistant",
          timestamp: new Date(),
          model: "gpt-4o",
        },
      ],
      lastUpdated: new Date(),
    },
  ])

  const [activeConversation, setActiveConversation] = useState<string>("1")
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState("gpt-4o")
  const [temperature, setTemperature] = useState([0.7])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversations])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    setIsLoading(true)

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
      model: selectedModel,
    }

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation
          ? {
              ...conv,
              messages: [...conv.messages, newUserMessage],
              lastUpdated: new Date(),
            }
          : conv,
      ),
    )

    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "This is a simulated response from the AI model. In a real implementation, this would be the response from the selected AI model.",
        role: "assistant",
        timestamp: new Date(),
        model: selectedModel,
      }

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversation
            ? {
                ...conv,
                messages: [...conv.messages, aiResponse],
                lastUpdated: new Date(),
              }
            : conv,
        ),
      )

      setIsLoading(false)
    }, 1500)
  }

  const createNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [],
      lastUpdated: new Date(),
    }

    setConversations((prev) => [...prev, newConv])
    setActiveConversation(newConv.id)
  }

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== id))
    if (activeConversation === id && conversations.length > 1) {
      setActiveConversation(conversations.find((conv) => conv.id !== id)?.id || "")
    }
  }

  const currentConversation = conversations.find((conv) => conv.id === activeConversation)

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Conversation List */}
      <div className="w-64 border-r bg-muted/20 hidden md:block">
        <div className="p-4">
          <Button className="w-full" onClick={createNewConversation}>
            New Chat
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-2 p-2">
            {conversations.map((conv) => (
              <Card
                key={conv.id}
                className={`cursor-pointer hover:bg-muted transition-colors ${
                  activeConversation === conv.id ? "bg-muted" : ""
                }`}
                onClick={() => setActiveConversation(conv.id)}
              >
                <CardContent className="p-3 flex justify-between items-center">
                  <div className="truncate">
                    <p className="font-medium truncate">{conv.title}</p>
                    <p className="text-xs text-muted-foreground">{conv.lastUpdated.toLocaleDateString()}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteConversation(conv.id)
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            {currentConversation?.messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8">
                    {message.role === "user" ? (
                      <>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>U</AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>AI</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-xs font-medium">{message.role === "user" ? "You" : message.model}</span>
                      <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex flex-wrap gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                    <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                  </SelectContent>
                </Select>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted">
                        <Thermometer className="h-4 w-4" />
                        <span className="text-sm">{temperature[0]}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Temperature: Controls randomness</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="w-24">
                  <Slider value={temperature} min={0} max={1} step={0.1} onValueChange={setTemperature} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Sparkles className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Textarea
                placeholder="Type your message here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" size="icon">
                <PaperclipIcon className="h-4 w-4" />
              </Button>
              <Button onClick={handleSendMessage} disabled={isLoading}>
                {isLoading ? "Thinking..." : "Send"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

