'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function DatabaseStatus() {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'loading'>('loading')
  const [message, setMessage] = useState('')

  const checkConnection = async () => {
    setStatus('loading')
    try {
      const response = await fetch('/api/test-db')
      const data = await response.json()
      if (data.status === 'connected') {
        setStatus('connected')
      } else {
        setStatus('disconnected')
      }
      setMessage(data.message)
    } catch (error) {
      console.error("Error in DELETE :", error)
      setStatus('disconnected')
      setMessage('An error occurred while checking the database connection')
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <div className="p-4 rounded-md mb-6">
      <div className={`p-4 rounded-md ${
        status === 'connected' ? 'bg-green-500' : 
        status === 'disconnected' ? 'bg-red-500' : 
        'bg-yellow-500'
      }`}>
        <p className="text-white font-semibold">
          Database status: {status === 'loading' ? 'Checking...' : status}
        </p>
        {message && <p className="text-white mt-2">{message}</p>}
      </div>
      <Button onClick={checkConnection} className="mt-4">
        Check Connection
      </Button>
    </div>
  )
}

