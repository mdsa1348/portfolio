'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'sabbir') {
      sessionStorage.setItem('isAdminLoggedIn', 'true')
      onLogin()
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter admin password"
        className="bg-[#222222] border-gray-700"
      />
      <Button type="submit">Login as Admin</Button>
      {error && <p className="text-red-500">{error}</p>}
      
      <div style={{ height: '1.5rem' }}></div> {/* Spacer div */}
      
    </form>
  )
}

