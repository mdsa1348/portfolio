import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/sidebar'
import { Navigation } from '@/components/navigation'

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
      <body className={`${inter.className} bg-[#1A1A1A] text-gray-100 min-h-screen overflow-hidden`}>
        <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-[5px]">
            <div className="md:sticky md:top-8 md:self-start">
              <Sidebar />
            </div>
            <main className="space-y-8 px-6 overflow-y-auto h-[calc(100vh-4rem)]">
              <Navigation />
              <div className="pb-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

