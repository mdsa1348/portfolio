import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MD. SABBIR AHAMMED - aspiring Fullstack Software Engineer',
  description: 'Professional portfolio of MD. SABBIR AHAMMED, aspiring Fullstack Software Engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1A1A1A] text-gray-100 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}

