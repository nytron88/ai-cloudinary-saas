import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function GlobalNotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-gray-800/50 p-4">
                            <FileQuestion className="h-12 w-12 text-gray-400" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-white">
                            404 - Page Not Found
                        </h1>
                        <p className="text-gray-300 text-lg">
                            The page you&#39;re looking for doesn&#39;t exist or has been moved.
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Button
                            asChild
                            variant="default"
                            className="bg-white text-black hover:bg-gray-100 transition-colors"
                        >
                            <Link href="/home">
                                Go to Home Page
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
} 