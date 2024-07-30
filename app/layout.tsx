import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import AuthProvider from '@/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Video-Meet-App',
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
               'container h-svh bg-gradient-to-br to-blue-500/20 from-red-300/20 ',
               inter.className
            )}
         >
            <AuthProvider>{children}</AuthProvider>
         </body>
      </html>
   )
}
