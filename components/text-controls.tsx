"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { MemeText } from "@/lib/types"

interface TextControlsProps {
  text: MemeText
  onChange: (text: MemeText) => void
}

const FONT_OPTIONS = [
  { value: "Impact", label: "Impact" },
  { value: "Arial", label: "Arial" },
  { value: "Comic Sans MS", label: "Comic Sans" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier New", label: "Courier New" },
  { value: "Verdana", label: "Verdana" },
]

export function TextControls({ text, onChange }: TextControlsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text-content">Text Content</Label>
        <Input
          id="text-content"
          value={text.content}
          onChange={(e) => onChange({ ...text, content: e.target.value })}
          placeholder="Enter text"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="font-family">Font</Label>
        <Select value={text.fontFamily} onValueChange={(value) => onChange({ ...text, fontFamily: value })}>
          <SelectTrigger id="font-family" className="border-purple-500/30 focus:ring-purple-500/50">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {FONT_OPTIONS.map((font) => (
              <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="font-size">Font Size: {text.fontSize}px</Label>
        </div>
        <Slider
          id="font-size"
          min={12}
          max={72}
          step={1}
          value={[text.fontSize]}
          onValueChange={(value) => onChange({ ...text, fontSize: value[0] })}
          className="[&>.relative>.bg-primary]:bg-purple-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="text-color">Text Color</Label>
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded border cursor-pointer" style={{ backgroundColor: text.color }} />
          <Input
            id="text-color"
            type="color"
            value={text.color}
            onChange={(e) => onChange({ ...text, color: e.target.value })}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="position-x">X Position: {text.x}%</Label>
          <Slider
            id="position-x"
            min={0}
            max={100}
            step={1}
            value={[text.x]}
            onValueChange={(value) => onChange({ ...text, x: value[0] })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position-y">Y Position: {text.y}%</Label>
          <Slider
            id="position-y"
            min={0}
            max={100}
            step={1}
            value={[text.y]}
            onValueChange={(value) => onChange({ ...text, y: value[0] })}
          />
        </div>
      </div>
    </div>
  )
}
