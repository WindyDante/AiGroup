"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { Download, FileIcon as FilePresentation, Pencil, Plus, Trash } from "lucide-react"

type Slide = {
  id: string
  title: string
  content: string
}

export default function PPTPage() {
  const [activeTab, setActiveTab] = useState("requirements")
  const [topic, setTopic] = useState("")
  const [slideCount, setSlideCount] = useState("10")
  const [style, setStyle] = useState("professional")
  const [slides, setSlides] = useState<Slide[]>([
    { id: "slide-1", title: "Introduction", content: "Overview of the topic" },
    { id: "slide-2", title: "Key Points", content: "Main arguments and evidence" },
    { id: "slide-3", title: "Conclusion", content: "Summary and next steps" },
  ])
  const [selectedSlide, setSelectedSlide] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    if (!topic) return

    setIsGenerating(true)

    // Simulate generation process
    setTimeout(() => {
      const newSlides: Slide[] = []
      const count = Number.parseInt(slideCount)

      for (let i = 1; i <= count; i++) {
        newSlides.push({
          id: `slide-${i}`,
          title: i === 1 ? topic : `Slide ${i}`,
          content: `Content for slide ${i}`,
        })
      }

      setSlides(newSlides)
      setActiveTab("outline")
      setIsGenerating(false)
    }, 2000)
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(slides)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSlides(items)
  }

  const addSlide = () => {
    const newSlide: Slide = {
      id: `slide-${slides.length + 1}`,
      title: `New Slide`,
      content: "Add content here",
    }

    setSlides([...slides, newSlide])
  }

  const deleteSlide = (id: string) => {
    setSlides(slides.filter((slide) => slide.id !== id))
    if (selectedSlide === id) {
      setSelectedSlide(null)
    }
  }

  const updateSlide = (id: string, field: keyof Slide, value: string) => {
    setSlides(slides.map((slide) => (slide.id === id ? { ...slide, [field]: value } : slide)))
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">PPT Generator</h1>
        <p className="text-muted-foreground">Create professional presentations with AI assistance</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="topic">Presentation Topic</Label>
                  <Input
                    id="topic"
                    placeholder="Enter the main topic of your presentation"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="slide-count">Number of Slides</Label>
                    <Select value={slideCount} onValueChange={setSlideCount}>
                      <SelectTrigger id="slide-count">
                        <SelectValue placeholder="Select slide count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 slides</SelectItem>
                        <SelectItem value="10">10 slides</SelectItem>
                        <SelectItem value="15">15 slides</SelectItem>
                        <SelectItem value="20">20 slides</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="style">Presentation Style</Label>
                    <Select value={style} onValueChange={setStyle}>
                      <SelectTrigger id="style">
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-info">Additional Information</Label>
                  <Textarea
                    id="additional-info"
                    placeholder="Add any specific requirements or information you want to include"
                    rows={4}
                  />
                </div>

                <Button onClick={handleGenerate} disabled={!topic || isGenerating} className="w-full">
                  {isGenerating ? "Generating..." : "Generate Presentation"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outline">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Slides</h3>
                <Button size="sm" variant="outline" onClick={addSlide}>
                  <Plus className="h-4 w-4 mr-1" /> Add Slide
                </Button>
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="slides">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {slides.map((slide, index) => (
                        <Draggable key={slide.id} draggableId={slide.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${
                                selectedSlide === slide.id ? "bg-muted" : ""
                              }`}
                              onClick={() => setSelectedSlide(slide.id)}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium truncate">{slide.title}</span>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteSlide(slide.id)
                                  }}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <div className="md:col-span-2">
              {selectedSlide ? (
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="slide-title">Slide Title</Label>
                      <Input
                        id="slide-title"
                        value={slides.find((s) => s.id === selectedSlide)?.title || ""}
                        onChange={(e) => updateSlide(selectedSlide, "title", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slide-content">Slide Content</Label>
                      <Textarea
                        id="slide-content"
                        rows={10}
                        value={slides.find((s) => s.id === selectedSlide)?.content || ""}
                        onChange={(e) => updateSlide(selectedSlide, "content", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center border rounded-lg p-10 bg-muted/20">
                  <div className="text-center">
                    <FilePresentation className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No Slide Selected</h3>
                    <p className="text-muted-foreground">Select a slide from the list to edit its content</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setActiveTab("requirements")}>
              Back to Requirements
            </Button>
            <Button onClick={() => setActiveTab("preview")}>Preview Presentation</Button>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {slides.map((slide) => (
                <Card
                  key={slide.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow ${
                    selectedSlide === slide.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedSlide(slide.id)}
                >
                  <CardContent className="p-4 aspect-[16/9] flex flex-col">
                    <div className="text-center py-2 border-b mb-2 font-medium truncate">{slide.title}</div>
                    <div className="text-xs overflow-hidden flex-1">{slide.content}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedSlide && (
              <Card className="mt-6">
                <CardContent className="p-6 aspect-[16/9] max-h-[60vh]">
                  <div className="h-full flex flex-col">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                      {slides.find((s) => s.id === selectedSlide)?.title}
                    </h2>
                    <div className="flex-1 overflow-auto">
                      <p className="whitespace-pre-wrap">{slides.find((s) => s.id === selectedSlide)?.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("outline")}>
                Back to Outline
              </Button>
              <div className="space-x-2">
                <Button variant="outline">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download PPTX
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

