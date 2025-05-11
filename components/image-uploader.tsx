"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ImageUploaderProps {
  setImage: (image: string | null) => void
}

export function ImageUploader({ setImage }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null)
      const file = acceptedFiles[0]
      if (!file) return

      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file")
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    },
    [setImage],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  })

  const handleUrlSubmit = () => {
    setError(null)
    if (!imageUrl) {
      setError("Please enter an image URL")
      return
    }

    // Simple URL validation
    if (!imageUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
      setError("Please enter a valid image URL")
      return
    }

    setImage(imageUrl)
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-purple-500 bg-purple-500/10" : "border-border"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-medium">{isDragActive ? "Drop the image here" : "Drag & drop an image here"}</p>
          <p className="text-xs text-muted-foreground">or click to browse files</p>
        </div>
      </div>

      <div className="text-center text-sm font-medium">OR</div>

      <Card>
        <CardContent className="p-4 space-y-3">
          <Label htmlFor="image-url">Image URL</Label>
          <div className="flex gap-2">
            <Input
              id="image-url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button
              onClick={handleUrlSubmit}
              type="button"
              className="bg-white text-black hover:bg-gray-200"
            >
              Load Image
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="text-center text-sm font-medium">OR</div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="w-full border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400"
          onClick={() => setImage("/placeholder.svg?height=400&width=400")}
        >
          Blank Template
        </Button>
        <Button
          variant="outline"
          className="w-full border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400"
          onClick={() => setImage("/placeholder.svg?height=400&width=400&text=Sample+Meme")}
        >
          Sample Meme
        </Button>
      </div>
    </div>
  )
}
