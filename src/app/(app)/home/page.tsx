"use client"

import React, { useEffect, useState } from 'react'
import { Video } from '@prisma/client'
import VideoCard from '@/components/home/VideoCard'
import { Button } from '@/components/ui/button'
import { Plus, Upload } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

const HomePage = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('/api/videos');
                const data = await response.json();
                if (data.success) {
                    setVideos(data.data);
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const handleDownload = async (url: string, title: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${title}.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading video:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto p-6 space-y-8">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-10 w-40" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-video w-full" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto py-12 px-4">
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
                            {videos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                    onDownload={handleDownload}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
