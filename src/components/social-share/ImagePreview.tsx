"use client"

import { CldImage } from "next-cloudinary"
import { socialFormats, SocialFormat } from "./FormatSelector"

interface ImagePreviewProps {
    publicId: string
    format: SocialFormat
}

export function ImagePreview({ publicId, format }: ImagePreviewProps) {
    const { width, height, aspectRatio } = socialFormats[format]

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-sm font-medium">Preview</h3>
                    <p className="text-sm text-muted-foreground">
                        {format} ({width}x{height})
                    </p>
                </div>
            </div>

            <div className="relative w-full bg-black/20 rounded-lg overflow-hidden">
                <CldImage
                    width={width}
                    height={height}
                    src={publicId}
                    alt="Social media preview"
                    className="w-full h-auto"
                    crop="fill"
                    gravity="center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Aspect Ratio: {aspectRatio}</span>
                <span>Dimensions: {width} × {height}</span>
            </div>
        </div>
    )
} 