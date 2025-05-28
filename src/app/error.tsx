"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Global Error:", error)
    }, [error])

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-red-500/10 p-4">
                            <AlertCircle className="h-12 w-12 text-red-500" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-white">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-gray-300 text-lg">
                            We apologize for the inconvenience. Our team has been notified and is working to fix the issue.
                        </p>
                        {error.message && (
                            <p className="text-sm text-gray-400 bg-gray-800/50 p-4 rounded-lg">
                                {error.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={reset}
                            variant="default"
                            className="bg-white text-black hover:bg-gray-100 transition-colors"
                        >
                            Try Again
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="border-gray-700 text-white hover:bg-gray-800/50 hover:text-white transition-colors"
                        >
                            <Link href="/">
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
} 