import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Video Chat App',
   description: 'A simple video chat app built with Next.js and Twilio.',
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang='en'>
         <body
            className={cn(
               'container bg-gradient-to-br to-blue-500/20 from-red-300/20 ',
               inter.className
            )}
         >
            {children}
         </body>
      </html>
   )
}
