"use client"

import type React from "react"

import { forwardRef, useEffect, useRef, useState } from "react"
import type { MemeText } from "@/lib/types"

interface MemeCanvasProps {
  image: string | null
  texts: MemeText[]
  selectedTextId: string | null
  setSelectedTextId: (id: string | null) => void
  handleTextChange: (text: MemeText) => void
}

export const MemeCanvas = forwardRef<HTMLCanvasElement, MemeCanvasProps>(function MemeCanvas(
  { image, texts, selectedTextId, setSelectedTextId, handleTextChange },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // Set up canvas dimensions based on container
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height: width * 0.75 }) // 4:3 aspect ratio
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Draw on canvas when image or texts change
  useEffect(() => {
    const canvas = ref as React.RefObject<HTMLCanvasElement>
    if (!canvas?.current || !image) return

    const ctx = canvas.current.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = image

    img.onload = () => {
      setIsImageLoaded(true)

      // Clear canvas
      ctx.clearRect(0, 0, canvas.current!.width, canvas.current!.height)

      // Draw image
      ctx.drawImage(img, 0, 0, canvas.current!.width, canvas.current!.height)

      // Draw texts
      texts.forEach((text) => {
        const x = (text.x / 100) * canvas.current!.width
        const y = (text.y / 100) * canvas.current!.height

        ctx.font = `${text.fontSize}px ${text.fontFamily}`
        ctx.fillStyle = text.color
        ctx.textAlign = "center"

        // Add stroke to make text readable on any background
        ctx.strokeStyle = "black"
        ctx.lineWidth = text.fontSize / 15
        ctx.strokeText(text.content, x, y)

        // Fill text
        ctx.fillText(text.content, x, y)
      })
    }
  }, [image, texts, dimensions, ref])

  if (!image) {
    return (
      <div
        ref={containerRef}
        className="flex items-center justify-center bg-muted/30 text-muted-foreground"
        style={{ height: "400px" }}
      >
        Upload an image to create your meme
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative bg-muted/30" style={{ height: dimensions.height }}>
      <canvas
        ref={ref}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute top-0 left-0 w-full h-full"
      />

      {isImageLoaded && (
        <div className="absolute top-0 left-0 w-full h-full">
          {texts.map((text) => {
            const isSelected = text.id === selectedTextId
            const xPos = (text.x / 100) * dimensions.width - 50 // Center the handle
            const yPos = (text.y / 100) * dimensions.height - 15 // Adjust for text height

            return (
              <div
                key={text.id}
                className={`absolute cursor-move w-24 h-8 flex items-center justify-center ${
                  isSelected ? "border-2 border-primary" : "border border-transparent"
                }`}
                style={{
                  left: `${xPos}px`,
                  top: `${yPos}px`,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedTextId(text.id)
                }}
                onMouseDown={(e) => {
                  if (!isSelected) return

                  const startX = e.clientX
                  const startY = e.clientY
                  const startPosX = xPos
                  const startPosY = yPos

                  const handleMouseMove = (moveEvent) => {
                    const deltaX = moveEvent.clientX - startX
                    const deltaY = moveEvent.clientY - startY

                    const newX = Math.max(0, Math.min(100, ((startPosX + deltaX + 50) / dimensions.width) * 100))
                    const newY = Math.max(0, Math.min(100, ((startPosY + deltaY + 15) / dimensions.height) * 100))

                    handleTextChange({
                      ...text,
                      x: newX,
                      y: newY,
                    })
                  }

                  const handleMouseUp = () => {
                    document.removeEventListener("mousemove", handleMouseMove)
                    document.removeEventListener("mouseup", handleMouseUp)
                  }

                  document.addEventListener("mousemove", handleMouseMove)
                  document.addEventListener("mouseup", handleMouseUp)
                }}
              >
                <div className="w-full h-full opacity-50 bg-background" />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
})
