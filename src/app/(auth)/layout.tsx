import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    )
}