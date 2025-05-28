"use client"

import { useState } from "react"
import axios from "axios"
import { VideoUpload } from "@/components/video-upload/VideoUpload"
import { VideoDetails } from "@/components/video-upload/VideoDetails"
import { VideoPreview } from "@/components/video-upload/VideoPreview"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2, Upload } from "lucide-react"

export default function VideoUploadPage() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleFileSelect = (file: File) => {
        setSelectedFile(file)
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select a video file")
            return
        }

        if (!title || !description) {
            toast.error("Please fill in all required fields")
            return
        }

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append("video", selectedFile)
            formData.append("title", title)
            formData.append("description", description)
            formData.append("originalSize", selectedFile.size.toString())

            const { data } = await axios.post("/api/video", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            toast.success("Video uploaded successfully")
            // Reset form
            setTitle("")
            setDescription("")
            setSelectedFile(null)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to upload video")
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
                            Video Upload
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Upload your videos with detailed information and let us handle the optimization
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-white">Upload Video</CardTitle>
                                <CardDescription className="text-gray-300">
                                    Add your video and provide the necessary details
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <VideoUpload onUpload={handleFileSelect} isUploading={isUploading} />
                                <VideoDetails
                                    title={title}
                                    description={description}
                                    onTitleChange={setTitle}
                                    onDescriptionChange={setDescription}
                                />
                                <div className="flex justify-end">
                                    <Button
                                        onClick={handleUpload}
                                        disabled={isUploading || !selectedFile}
                                        className="bg-white text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Upload Video
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-white">Preview</CardTitle>
                                <CardDescription className="text-gray-300">
                                    Preview your video before uploading
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <VideoPreview file={selectedFile} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
