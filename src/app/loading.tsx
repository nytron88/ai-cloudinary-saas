import { Loader2 } from "lucide-react"

export default function GlobalLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <div className="rounded-full bg-gray-800/50 p-4">
                        <Loader2 className="h-12 w-12 text-white animate-spin" />
                    </div>
                </div>
                <p className="text-gray-300 text-lg">Loading...</p>
            </div>
        </div>
    )
} 