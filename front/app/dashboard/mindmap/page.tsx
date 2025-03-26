"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, RotateCcw, Plus, Minus } from "lucide-react"

export default function MindMapPage() {
  const [activeTab, setActiveTab] = useState("text")
  const [markdownInput, setMarkdownInput] = useState(
    "# AI Technologies\n## Machine Learning\n### Supervised Learning\n### Unsupervised Learning\n### Reinforcement Learning\n## Natural Language Processing\n### Text Generation\n### Translation\n### Sentiment Analysis\n## Computer Vision\n### Image Recognition\n### Object Detection\n### Image Generation",
  )
  const [theme, setTheme] = useState("default")
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (activeTab === "visual" && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Parse markdown and draw mind map
      const lines = markdownInput.split("\n")
      const nodes: Array<{ text: string; level: number; x: number; y: number; width: number }> = []

      // First pass: create nodes
      lines.forEach((line, index) => {
        if (!line.trim()) return

        const level = line.match(/^#+/)?.[0].length || 0
        const text = line.replace(/^#+\s*/, "")

        if (level > 0) {
          nodes.push({
            text,
            level,
            x: 0,
            y: 0,
            width: ctx.measureText(text).width + 40,
          })
        }
      })

      // Position nodes
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const levelHeight = 80
      const levelPadding = 200

      // Root node
      if (nodes.length > 0) {
        nodes[0].x = centerX
        nodes[0].y = centerY

        // Position child nodes
        let currentLevel = 1
        let nodesAtLevel = 0
        let startAngle = 0

        for (let i = 1; i < nodes.length; i++) {
          const node = nodes[i]

          if (node.level > currentLevel) {
            currentLevel = node.level
            nodesAtLevel = 0
            startAngle = 0
          }

          // Find parent node
          let parentIndex = i - 1
          while (parentIndex >= 0 && nodes[parentIndex].level >= node.level) {
            parentIndex--
          }

          if (parentIndex >= 0) {
            const parent = nodes[parentIndex]
            const radius = levelPadding * (node.level - 1)
            const angle = startAngle + (nodesAtLevel * (Math.PI * 2)) / 8

            node.x = parent.x + Math.cos(angle) * radius
            node.y = parent.y + Math.sin(angle) * radius

            nodesAtLevel++
          }
        }
      }

      // Apply zoom
      ctx.save()
      ctx.scale(zoom, zoom)

      // Draw connections
      ctx.strokeStyle = theme === "dark" ? "#6366f1" : "#2563eb"
      ctx.lineWidth = 2

      for (let i = 1; i < nodes.length; i++) {
        const node = nodes[i]

        // Find parent node
        let parentIndex = i - 1
        while (parentIndex >= 0 && nodes[parentIndex].level >= node.level) {
          parentIndex--
        }

        if (parentIndex >= 0) {
          const parent = nodes[parentIndex]

          ctx.beginPath()
          ctx.moveTo(parent.x / zoom, parent.y / zoom)
          ctx.lineTo(node.x / zoom, node.y / zoom)
          ctx.stroke()
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const x = node.x / zoom
        const y = node.y / zoom
        const width = node.width
        const height = 40
        const radius = 10

        // Node background
        ctx.fillStyle =
          node.level === 1 ? (theme === "dark" ? "#4f46e5" : "#3b82f6") : theme === "dark" ? "#1e293b" : "#f8fafc"
        ctx.strokeStyle = theme === "dark" ? "#6366f1" : "#2563eb"
        ctx.lineWidth = 2

        // Rounded rectangle
        ctx.beginPath()
        ctx.moveTo(x - width / 2 + radius, y - height / 2)
        ctx.lineTo(x + width / 2 - radius, y - height / 2)
        ctx.quadraticCurveTo(x + width / 2, y - height / 2, x + width / 2, y - height / 2 + radius)
        ctx.lineTo(x + width / 2, y + height / 2 - radius)
        ctx.quadraticCurveTo(x + width / 2, y + height / 2, x + width / 2 - radius, y + height / 2)
        ctx.lineTo(x - width / 2 + radius, y + height / 2)
        ctx.quadraticCurveTo(x - width / 2, y + height / 2, x - width / 2, y + height / 2 - radius)
        ctx.lineTo(x - width / 2, y - height / 2 + radius)
        ctx.quadraticCurveTo(x - width / 2, y - height / 2, x - width / 2 + radius, y - height / 2)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Node text
        ctx.fillStyle = node.level === 1 ? "#ffffff" : theme === "dark" ? "#ffffff" : "#1e1e1e"
        ctx.font = node.level === 1 ? "bold 14px Inter" : "14px Inter"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.text, x, y)
      })

      ctx.restore()
    }
  }, [activeTab, markdownInput, theme, zoom])

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
  }

  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement("a")
      link.download = "mindmap.png"
      link.href = canvasRef.current.toDataURL("image/png")
      link.click()
    }
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mind Map Creator</h1>
        <p className="text-muted-foreground">Visualize ideas and concepts with AI-powered mind maps</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="text">Text Input</TabsTrigger>
          <TabsTrigger value="visual">Visual Map</TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Use Markdown format with # for hierarchy levels. Each # represents a level in the mind map.
                  </p>
                  <Textarea
                    value={markdownInput}
                    onChange={(e) => setMarkdownInput(e.target.value)}
                    rows={20}
                    className="font-mono"
                    placeholder="# Main Topic
## Subtopic 1
### Detail 1
### Detail 2
## Subtopic 2
### Detail 3"
                  />
                </div>

                <div className="flex justify-between">
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMarkdownInput(
                          "# New Topic\n## Subtopic 1\n### Detail 1\n### Detail 2\n## Subtopic 2\n### Detail 3",
                        )
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        // Simulate AI generation
                        setMarkdownInput(
                          "# AI Technologies\n## Machine Learning\n### Supervised Learning\n### Unsupervised Learning\n### Reinforcement Learning\n## Natural Language Processing\n### Text Generation\n### Translation\n### Sentiment Analysis\n## Computer Vision\n### Image Recognition\n### Object Detection\n### Image Generation",
                        )
                      }}
                    >
                      Generate with AI
                    </Button>
                  </div>
                  <Button onClick={() => setActiveTab("visual")}>Visualize</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visual">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="space-x-2">
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="colorful">Colorful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={handleZoomOut}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
                    <Button variant="outline" size="icon" onClick={handleZoomIn}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className={`border rounded-lg overflow-hidden ${theme === "dark" ? "bg-slate-900" : "bg-white"}`}>
                  <canvas ref={canvasRef} width={1200} height={800} className="w-full h-[600px]" />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("text")}>
                    Edit Text
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={downloadImage}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PNG
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download SVG
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

