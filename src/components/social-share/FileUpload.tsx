"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Upload, Loader2 } from "lucide-react"

interface FileUploadProps {
    onUpload: (file: File) => void
    isUploading: boolean
}

export function FileUpload({ onUpload, isUploading }: FileUploadProps) {
    const [dragActive, setDragActive] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file')
            return
        }

        onUpload(file)
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const file = e.dataTransfer.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file')
            return
        }

        onUpload(file)
    }

    return (
        <div className="space-y-4">
            <Label htmlFor="picture" className="text-white">Upload Image</Label>
            <div
                className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${dragActive
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-700 hover:border-gray-600 bg-gray-900/30"
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="rounded-full bg-gray-800 p-3">
                        {isUploading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-white" />
                        ) : (
                            <Upload className="h-6 w-6 text-white" />
                        )}
                    </div>
                    <div className="text-center space-y-2">
                        <p className="text-white font-medium">
                            {isUploading ? "Uploading..." : "Drag and drop your image here"}
                        </p>
                        <p className="text-sm text-gray-400">
                            or click to browse
                        </p>
                    </div>
                    <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isUploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
            </div>
            <p className="text-sm text-gray-400">
                Supported formats: JPG, PNG, GIF (max 10MB)
            </p>
        </div>
    )
} 