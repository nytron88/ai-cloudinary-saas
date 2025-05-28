import Sidebar from "@/components/Sidebar"
import { auth } from "@clerk/nextjs/server"
import { cn } from "@/lib/utils"

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = await auth()
    const isAuthenticated = !!userId

    return (
        <div className="h-full relative">
            {isAuthenticated && (
                <div className="hidden h-[calc(100vh-4rem)] md:flex md:w-72 md:flex-col md:fixed md:inset-y-16 z-[80]">
                    <Sidebar isAuthenticated={isAuthenticated} />
                </div>
            )}
            <main className={cn(
                "pt-16",
                isAuthenticated && "md:pl-72"
            )}>
                {children}
            </main>
        </div>
    )
} 