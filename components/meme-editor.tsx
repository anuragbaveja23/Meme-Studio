"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUploader } from "@/components/image-uploader"
import { TextControls } from "@/components/text-controls"
import { MemeCanvas } from "@/components/meme-canvas"
import { SocialShareButtons } from "@/components/social-share-buttons"
import type { MemeText } from "@/lib/types"
import { Download, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function MemeEditor() {
  const [image, setImage] = useState<string | null>(null)
  const [texts, setTexts] = useState<MemeText[]>([
    { id: "1", content: "Top Text", x: 50, y: 40, fontSize: 32, color: "#ffffff", fontFamily: "Impact" },
    { id: "2", content: "Bottom Text", x: 50, y: 80, fontSize: 32, color: "#ffffff", fontFamily: "Impact" },
  ])
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const [memeGenerated, setMemeGenerated] = useState(false)
  const [memeDataUrl, setMemeDataUrl] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (image) {
      setActiveTab("text")
    }
  }, [image])

  const handleTextChange = (updatedText: MemeText) => {
    setTexts(texts.map((text) => (text.id === updatedText.id ? updatedText : text)))
  }

  const handleAddText = () => {
    const newText: MemeText = {
      id: Date.now().toString(),
      content: "New Text",
      x: 50,
      y: 60,
      fontSize: 32,
      color: "#ffffff",
      fontFamily: "Impact",
    }
    setTexts([...texts, newText])
    setSelectedTextId(newText.id)
  }

  const handleDeleteText = (id: string) => {
    setTexts(texts.filter((text) => text.id !== id))
    if (selectedTextId === id) {
      setSelectedTextId(null)
    }
  }

  const handleDownload = () => {
    if (!canvasRef.current) return

    const dataUrl = canvasRef.current.toDataURL("image/png")
    setMemeDataUrl(dataUrl)
    setMemeGenerated(true)

    const link = document.createElement("a")
    link.download = "meme.png"
    link.href = dataUrl
    link.click()
  }

  const selectedText = texts.find((text) => text.id === selectedTextId)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <Card className="overflow-hidden border border-white/10 bg-white/5">
          <CardContent className="p-0">
            <MemeCanvas
              image={image}
              texts={texts}
              selectedTextId={selectedTextId}
              setSelectedTextId={setSelectedTextId}
              handleTextChange={handleTextChange}
              ref={canvasRef}
            />
          </CardContent>
        </Card>

        {image && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Button
                onClick={handleAddText}
                variant="outline"
                size="sm"
                className="border-white/10 hover:bg-white/10 hover:text-white text-gray-400"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Text
              </Button>
              <Button
                onClick={handleDownload}
                variant="default"
                size="sm"
                className="bg-white text-black hover:bg-gray-200"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Meme
              </Button>
            </div>

            {memeGenerated && memeDataUrl && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2 text-white">Share your meme:</h3>
                <SocialShareButtons imageUrl={memeDataUrl} />
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
            <TabsTrigger value="upload" className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400">Upload</TabsTrigger>
            <TabsTrigger value="text" disabled={!image} className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400">Text</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="space-y-4 pt-4">
            <ImageUploader setImage={setImage} />
          </TabsContent>
          <TabsContent value="text" className="space-y-4 pt-4">
            {!selectedTextId && texts.length > 0 && (
              <Alert variant="default" className="mb-4 bg-white/5 border border-white/10">
                <AlertDescription className="text-gray-400">Click on a text element in the canvas to edit it</AlertDescription>
              </Alert>
            )}

            {texts.map((text) => (
              <div
                key={text.id}
                className={`p-3 border rounded-md mb-2 cursor-pointer flex justify-between items-center ${
                  selectedTextId === text.id ? "border-white/20 bg-white/5" : "border-white/10 bg-white/5"
                }`}
                onClick={() => setSelectedTextId(text.id)}
              >
                <div className="truncate font-light" style={{ color: text.color, fontFamily: text.fontFamily }}>
                  {text.content || "(empty text)"}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/10 hover:text-white text-gray-400"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteText(text.id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {selectedText && <TextControls text={selectedText} onChange={handleTextChange} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
