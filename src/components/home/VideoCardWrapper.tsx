'use client'

import React from 'react'
import { Video } from '@prisma/client'
import VideoCard from './VideoCard'

interface VideoCardWrapperProps {
    video: Video;
}

export default function VideoCardWrapper({ video }: VideoCardWrapperProps) {
    const handleDownload = async (url: string, title: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${title}.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading video:', error);
        }
    };

    return (
        <VideoCard
            video={video}
            onDownload={handleDownload}
        />
    );
} 