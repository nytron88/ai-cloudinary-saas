"use client"

import { useState } from "react"
import axios from "axios"
import { FileUpload } from "@/components/social-share/FileUpload"
import { FormatSelector, SocialFormat } from "@/components/social-share/FormatSelector"
import { ImagePreview } from "@/components/social-share/ImagePreview"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function SocialSharePage() {
    const [publicId, setPublicId] = useState<string>("")
    const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)")
    const [isUploading, setIsUploading] = useState(false)

    const handleFileUpload = async (file: File) => {
        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append("image", file)

            const { data } = await axios.post("/api/image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            setPublicId(data.data.public_id)
            toast.success("Image uploaded successfully")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to upload image")
            } else {
                toast.error("An unexpected error occurred")
            }
            console.error("Upload error:", error)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto py-12 px-4">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Social Media Image Generator
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Transform your images for any social media platform with perfect dimensions and aspect ratios
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-white">Upload & Format</CardTitle>
                                <CardDescription className="text-gray-300">
                                    Choose your image and select the desired social media format
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FileUpload onUpload={handleFileUpload} isUploading={isUploading} />
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium text-white">Select Format</h3>
                                    <FormatSelector
                                        selectedFormat={selectedFormat}
                                        onFormatChange={setSelectedFormat}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-white">Preview</CardTitle>
                                <CardDescription className="text-gray-300">
                                    See how your image will look on social media
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isUploading ? (
                                    <div className="flex items-center justify-center h-[400px]">
                                        <div className="text-center space-y-4">
                                            <Loader2 className="h-8 w-8 animate-spin text-white mx-auto" />
                                            <p className="text-gray-300">Uploading your image...</p>
                                        </div>
                                    </div>
                                ) : publicId ? (
                                    <ImagePreview publicId={publicId} format={selectedFormat} />
                                ) : (
                                    <div className="flex items-center justify-center h-[400px] text-gray-300 border-2 border-dashed border-gray-700 rounded-lg bg-gray-900/30">
                                        <div className="text-center space-y-2">
                                            <p className="text-lg">No image uploaded yet</p>
                                            <p className="text-sm text-gray-400">Upload an image to see the preview</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
