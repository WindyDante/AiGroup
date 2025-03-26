"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  FileText,
  History,
  Sparkles,
  Undo,
  Redo,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link,
  Image,
} from "lucide-react"

export default function DocumentPage() {
  const [title, setTitle] = useState("Untitled Document")
  const [content, setContent] = useState("")
  const [wordCount, setWordCount] = useState([500])
  const [style, setStyle] = useState("professional")
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const editorRef = useRef<HTMLDivElement>(null)

  const handleGenerate = () => {
    if (!title) return

    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const generatedContent = `# ${title}

## Introduction
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.

## Main Points
1. First point with detailed explanation and supporting evidence.
2. Second point that builds on the first and introduces new concepts.
3. Third point that provides a different perspective or approach.

## Analysis
The analysis shows that these points are interconnected and form a cohesive argument. The data supports the conclusions drawn and provides a foundation for further research.

## Conclusion
In conclusion, this document has presented a comprehensive overview of the topic. The key takeaways are the importance of understanding the fundamentals, applying critical thinking, and continuing to explore new avenues of research.

## References
1. Author, A. (Year). Title of work. Publisher.
2. Researcher, B. (Year). Title of research paper. Journal Name, Volume(Issue), Pages.`

      setContent(generatedContent)

      // Simulate AI suggestions
      setSuggestions([
        "Consider adding more specific examples to strengthen your argument.",
        "The introduction could be more engaging with a compelling statistic or quote.",
        "Try reorganizing the main points in order of importance for better flow.",
      ])

      setIsGenerating(false)
    }, 2000)
  }

  const formatText = (format: string) => {
    if (!editorRef.current) return

    document.execCommand(format)
    editorRef.current.focus()
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Document Studio</h1>
        <p className="text-muted-foreground">Draft, edit, and enhance documents with AI suggestions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Document Settings */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="doc-title">Document Title</Label>
              <Input
                id="doc-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Target Word Count</Label>
                <span className="text-sm text-muted-foreground">{wordCount[0]} words</span>
              </div>
              <Slider value={wordCount} min={100} max={2000} step={100} onValueChange={setWordCount} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Writing Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger id="style">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerate} disabled={!title || isGenerating} className="w-full">
              {isGenerating ? "Generating..." : "Generate Document"}
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-2 flex items-center">
                <History className="h-4 w-4 mr-2" />
                Version History
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 hover:bg-muted rounded-md cursor-pointer">
                  <div>
                    <div>Current Version</div>
                    <div className="text-xs text-muted-foreground">Just now</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-muted rounded-md cursor-pointer">
                  <div>
                    <div>First Draft</div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Editor */}
        <Card className="lg:col-span-2">
          <CardContent className="pt-6 h-[calc(100vh-16rem)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => formatText("undo")}>
                        <Undo className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Undo</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => formatText("redo")}>
                        <Redo className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Redo</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <span className="border-r h-6 mx-2"></span>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => formatText("bold")}>
                        <Bold className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Bold</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => formatText("italic")}>
                        <Italic className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Italic</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <span className="border-r h-6 mx-2"></span>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => formatText("insertUnorderedList")}>
                        <List className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Bullet List</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => formatText("insertOrderedList")}>
                        <ListOrdered className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Numbered List</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <span className="border-r h-6 mx-2"></span>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => formatText("createLink")}>
                        <Link className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Insert Link</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Image className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Insert Image</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <ScrollArea className="h-full border rounded-md p-4">
              <div
                ref={editorRef}
                className="min-h-full outline-none whitespace-pre-wrap"
                contentEditable
                dangerouslySetInnerHTML={{ __html: content }}
                onInput={(e) => setContent(e.currentTarget.innerHTML)}
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Sidebar - AI Suggestions */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <Tabs defaultValue="suggestions">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
              </TabsList>

              <TabsContent value="suggestions" className="mt-4 space-y-4">
                <h3 className="font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  AI Suggestions
                </h3>

                {suggestions.length > 0 ? (
                  <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <Card key={index}>
                        <CardContent className="p-3 text-sm">
                          <p>{suggestion}</p>
                          <div className="flex justify-end mt-2 space-x-2">
                            <Button variant="ghost" size="sm">
                              Ignore
                            </Button>
                            <Button variant="outline" size="sm">
                              Apply
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="font-medium">No suggestions yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Generate content or start writing to get AI suggestions
                    </p>
                  </div>
                )}

                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate More Suggestions
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="research" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Input placeholder="Search for related information..." />
                  <Button variant="outline" className="w-full">
                    Research Topic
                  </Button>
                </div>

                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium">No research results</h3>
                  <p className="text-sm text-muted-foreground">Search for a topic to find related information</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

