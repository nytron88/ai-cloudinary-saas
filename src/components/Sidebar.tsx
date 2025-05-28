"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Image, Video } from "lucide-react"
import { cn } from "@/lib/utils"

const routes = [
    {
        label: "Dashboard",
        icon: Home,
        href: "/home",
    },
    {
        label: "Social Share",
        icon: Image,
        href: "/social-share",
    },
    {
        label: "Video Upload",
        icon: Video,
        href: "/video-upload",
    },
]

interface SidebarProps {
    isAuthenticated: boolean;
}

export default function Sidebar({ isAuthenticated }: SidebarProps) {
    const pathname = usePathname()

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-gradient-to-b from-black to-gray-900 border-r border-gray-800">
            <div className="px-3 py-2">
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-gray-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", pathname === route.href ? "text-white" : "text-gray-400")} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
} 