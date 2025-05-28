import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: "Social Share",
    description: "The page to upload the image and have the ability to get it in different format and size.",
}

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default layout
