"use client"

import { CldImage } from "next-cloudinary"
import { socialFormats, SocialFormat } from "./FormatSelector"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { toast } from "sonner"

interface ImagePreviewProps {
    publicId: string
    format: SocialFormat
}

export function ImagePreview({ publicId, format }: ImagePreviewProps) {
    const { width, height, aspectRatio } = socialFormats[format]

    const handleDownload = async () => {
        try {
            // Get the Cloudinary URL with the correct transformations
            const url = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_${width},h_${height},g_center/${publicId}`

            // Fetch the image
            const response = await fetch(url)
            const blob = await response.blob()

            // Create a download link
            const downloadUrl = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadUrl

            // Create a filename based on the format
            const formatName = format.toLowerCase().replace(/[^a-z0-9]/g, '-')
            link.download = `social-media-image-${formatName}.jpg`

            // Trigger download
            document.body.appendChild(link)
            link.click()

            // Cleanup
            document.body.removeChild(link)
            window.URL.revokeObjectURL(downloadUrl)

            toast.success("Image downloaded successfully")
        } catch (error) {
            console.error("Download error:", error)
            toast.error("Failed to download image")
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-white">Preview</h3>
                    <p className="text-sm text-gray-400">
                        {format} ({width}x{height})
                    </p>
                </div>
                <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="bg-gray-900/50 border-gray-700 text-white hover:bg-gray-800 hover:text-white"
                >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                </Button>
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

            <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Aspect Ratio: {aspectRatio}</span>
                <span>Dimensions: {width} × {height}</span>
            </div>
        </div>
    )
} 