import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { UserButton, SignInButton, SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export default async function Navbar() {
    const { userId } = await auth()

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/home" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Cloudinary SAAS
                        </span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        {userId ? (
                            <>
                                <Link href="/home">
                                    <Button className="bg-white text-black hover:bg-gray-100 cursor-pointer">
                                        Dashboard
                                    </Button>
                                </Link>
                                <UserButton afterSignOutUrl="/" />
                            </>
                        ) : (
                            <>
                                <SignInButton mode="modal">
                                    <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                                        Sign In
                                    </Button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <Button className="bg-white text-black hover:bg-gray-100">
                                        Sign Up
                                    </Button>
                                </SignUpButton>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
} 