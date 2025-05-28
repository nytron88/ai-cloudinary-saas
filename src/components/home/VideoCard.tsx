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
import { toast } from "sonner"

dayjs.extend(relativeTime)

interface VideoCardProps {
    video: Video;
    onDownload: (url: string, title: string) => void;
}

// Helper to format seconds to mm:ss
function formatDuration(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
    const [isHovered, setIsHovered] = useState(false);
    const [previewReady, setPreviewReady] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (video.publicId) {
            // Preview video with transformation
            const previewUrl = getCldVideoUrl({
                src: video.publicId,
                width: 400,
                height: 225,
                rawTransformations: [
                    "e_preview:duration_15:max_seg_9:min_seg_dur_1"
                ],
                format: "auto",
                quality: "auto",
            });
            setPreviewUrl(previewUrl);

            // Check if preview is ready
            fetch(previewUrl, { method: "HEAD" })
                .then(res => {
                    if (isMounted) setPreviewReady(res.ok);
                    if (isMounted && !res.ok) {
                        toast.info("Preview is still processing. Showing thumbnail for now.");
                    }
                })
                .catch(() => {
                    if (isMounted) setPreviewReady(false);
                    toast.info("Preview is still processing. Showing thumbnail for now.");
                });

            // Thumbnail
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
            setThumbnailUrl(thumbnailUrl);
        }
        return () => { isMounted = false; }
    }, [video.publicId]);

    const handleDownload = useCallback(async () => {
        if (!previewUrl) return;
        setIsLoading(true);
        try {
            await onDownload(previewUrl, video.title);
        } finally {
            setIsLoading(false);
        }
    }, [previewUrl, video.title, onDownload]);

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
                {isHovered && previewReady && previewUrl ? (
                    <video
                        src={previewUrl}
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
                    {video.duration && (
                        <>
                            <span>•</span>
                            <span>{formatDuration(video.duration)}</span>
                        </>
                    )}
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