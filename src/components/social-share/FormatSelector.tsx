"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
} as const

export type SocialFormat = keyof typeof socialFormats

interface FormatSelectorProps {
  onFormatChange: (format: SocialFormat) => void
  selectedFormat: SocialFormat
}

export function FormatSelector({ onFormatChange, selectedFormat }: FormatSelectorProps) {
  const selectedFormatData = socialFormats[selectedFormat]

  return (
    <div className="space-y-4">
      <Select value={selectedFormat} onValueChange={onFormatChange}>
        <SelectTrigger className="w-full bg-gray-900/50 border-gray-700 text-white hover:border-gray-600">
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700">
          {Object.entries(socialFormats).map(([format, { width, height }]) => (
            <SelectItem
              key={format}
              value={format}
              className="flex items-center gap-2 text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white"
            >
              <div className="flex items-center justify-between w-full">
                <span>{format}</span>
                <span className="text-sm text-gray-400">{width}x{height}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="rounded-lg border border-gray-700 p-4 bg-gray-900/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">Format Preview</span>
          <span className="text-sm text-gray-300">
            {selectedFormatData.width} × {selectedFormatData.height}
          </span>
        </div>
        <div
          className="w-full bg-gray-800/50 rounded-md border border-gray-700"
          style={{
            aspectRatio: selectedFormatData.width / selectedFormatData.height,
            maxHeight: '200px'
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            {selectedFormatData.aspectRatio}
          </div>
        </div>
      </div>
    </div>
  )
}

export { socialFormats } 