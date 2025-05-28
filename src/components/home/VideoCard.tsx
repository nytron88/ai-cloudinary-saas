import React, { useState, useEffect, useCallback } from "react"
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary"
import { Download, Clock, FileDown, FileUp } from "lucide-react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { filesize } from "filesize"
import { Video } from "@prisma/client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

dayjs.extend(relativeTime)

interface VideoCardProps {
    video: Video;
    onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        console.log(video.publicId);
        if (video.publicId) {
            // Get video URL with optimized settings
            const videoUrl = getCldVideoUrl({
                src: video.publicId,
                format: "auto",
                quality: "auto",
            });
            setVideoUrl(videoUrl);

            // Get thumbnail URL with smart cropping
            const thumbnailUrl = getCldImageUrl({
                src: video.publicId,
                format: "jpg",
                quality: "auto",
                crop: "fill",
                width: 400,
                height: 225,
                gravity: "auto",
                assetType: "video",
            });

            console.log(thumbnailUrl);
            setThumbnailUrl(thumbnailUrl);
        }
    }, [video.publicId]);

    const handleDownload = useCallback(async () => {
        if (!videoUrl) return;
        setIsLoading(true);
        try {
            await onDownload(videoUrl, video.title);
        } finally {
            setIsLoading(false);
        }
    }, [videoUrl, video.title, onDownload]);

    return (
        <Card
            className={cn(
                "overflow-hidden group transition-all duration-300",
                "hover:shadow-lg hover:scale-[1.02]",
                "bg-gray-900/50 border-gray-800 backdrop-blur-sm"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-full aspect-video">
                {isHovered && videoUrl ? (
                    <video
                        src={videoUrl}
                        className="w-full h-full object-cover bg-gray-900"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    thumbnailUrl && (
                        <img
                            src={thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover bg-gray-900"
                        />
                    )
                )}
            </div>
            <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-lg line-clamp-1 text-white group-hover:text-gray-300 transition-colors">
                    {video.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{dayjs(video.createdAt).fromNow()}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                        <FileUp className="w-4 h-4" />
                        <span>{filesize(video.originalSize)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FileDown className="w-4 h-4" />
                        <span>{filesize(video.compressedSize)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button
                    onClick={handleDownload}
                    disabled={isLoading}
                    className="w-full bg-white text-black cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Download className="w-4 h-4 mr-2" />
                    {isLoading ? "Downloading..." : "Download"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default VideoCard;