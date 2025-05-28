import { cn } from "@/lib/utils"

interface VideoPreviewProps {
    file: File | null
    className?: string
}

export function VideoPreview({ file, className }: VideoPreviewProps) {
    if (!file) {
        return (
            <div className={cn("flex items-center justify-center h-[400px] text-gray-300 border-2 border-dashed border-gray-700 rounded-lg bg-gray-900/30", className)}>
                <div className="text-center space-y-2">
                    <p className="text-lg">No video selected</p>
                    <p className="text-sm text-gray-400">Select a video to see the preview</p>
                </div>
            </div>
        )
    }

    const videoUrl = URL.createObjectURL(file)

    return (
        <div className={cn("relative aspect-video w-full rounded-lg overflow-hidden bg-black", className)}>
            <video
                src={videoUrl}
                controls
                className="w-full h-full object-contain"
                onLoad={() => URL.revokeObjectURL(videoUrl)}
            />
        </div>
    )
} 