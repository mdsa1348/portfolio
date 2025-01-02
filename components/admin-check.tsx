'use client'

import { useEffect, useState } from 'react'

export function AdminCheck({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true'
      setIsLoggedIn(loggedIn)
      setIsLoading(false)
    }

    checkLoginStatus()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isLoggedIn) {
    return null
  }

  return <>{children}</>
}

