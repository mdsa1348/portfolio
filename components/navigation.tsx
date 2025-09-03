'use client'

import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Lazy load to avoid hydration mismatch warnings
const LoadingOverlay = dynamic(() => import('@/components/LoadingOverlay'), { ssr: false })

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const links = [
    { href: '/', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/resume', label: 'Resume' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/admin', label: 'Admin' },
  ]

  const handleClick = (href: string) => {
    if (pathname === href) return
    setLoading(true)
    router.push(href)
  }

  return (
    <>
      {loading && <LoadingOverlay />}
      <nav className="flex gap-8 items-center z-10 relative">
        {links.map((link) => (
          <button
            key={link.href}
            onClick={() => handleClick(link.href)}
            className={cn(
              "text-sm font-medium transition-colors hover:text-yellow-500",
              pathname === link.href ? "text-yellow-500" : "text-gray-400"
            )}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </>
  )
}
