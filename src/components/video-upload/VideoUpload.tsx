import { ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB in bytes

interface VideoUploadProps {
    onUpload: (file: File) => void
    isUploading: boolean
    className?: string
}

export function VideoUpload({ onUpload, isUploading, className }: VideoUploadProps) {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Check file type
        if (file.type !== 'video/mp4') {
            toast.error("Only MP4 files are allowed")
            return
        }

        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            toast.error("File size must be less than 100MB")
            return
        }

        onUpload(file)
    }

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="video-upload"
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer",
                        "bg-gray-900/30 border-gray-700 hover:bg-gray-900/50 transition-colors",
                        isUploading && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-300">
                            <span className="font-semibold">Click to select</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">MP4 only (MAX. 100MB)</p>
                    </div>
                    <input
                        id="video-upload"
                        type="file"
                        className="hidden"
                        accept="video/mp4"
                        onChange={handleFileChange}
                        disabled={isUploading}
                    />
                </label>
            </div>
        </div>
    )
} 