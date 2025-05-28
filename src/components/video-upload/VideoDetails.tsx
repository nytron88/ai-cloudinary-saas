import { ChangeEvent } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface VideoDetailsProps {
    title: string
    description: string
    onTitleChange: (value: string) => void
    onDescriptionChange: (value: string) => void
    className?: string
}

export function VideoDetails({
    title,
    description,
    onTitleChange,
    onDescriptionChange,
    className
}: VideoDetailsProps) {
    return (
        <div className={`space-y-4 ${className}`}>
            <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onTitleChange(e.target.value)}
                    placeholder="Enter video title"
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onDescriptionChange(e.target.value)}
                    placeholder="Enter video description"
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
                />
            </div>
        </div>
    )
} 