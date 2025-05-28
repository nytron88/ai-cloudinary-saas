import React from 'react'
import { Video } from '@prisma/client'
import VideoCardWrapper from '@/components/home/VideoCardWrapper'
import { Button } from '@/components/ui/button'
import { Plus, Upload } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'

async function getVideos() {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/videos`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
}

export default async function HomePage() {
    const videos = await getVideos();

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto space-y-8">
                    {videos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-4 border-2 border-dashed border-gray-700 rounded-lg bg-gray-900/30">
                            <div className="p-4 bg-white/10 rounded-full">
                                <Upload className="w-8 h-8 text-white" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold tracking-tight text-white">No videos yet</h2>
                                <p className="text-gray-300 max-w-sm">
                                    Upload your first video to get started with our compression service
                                </p>
                            </div>
                            <Link href="/video-upload">
                                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Upload Video
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videos.map((video: Video) => (
                                <VideoCardWrapper
                                    key={video.id}
                                    video={video}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
