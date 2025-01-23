'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to send message`)
      }
      alert(`Your message has been sent successfully!!`)
      
      // Reload the page
      window.location.reload()

    } catch (error) {
      console.error('Error sending message:', error)
      setMessage({ text: error instanceof Error ? error.message : 'Failed to send message. Please try again.', type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {message.text}
        </div>
      )}
      <div>
        <Input
          name="name"
          placeholder="Your Name"
          required
          className="bg-[#222222] border-gray-700"
        />
      </div>
      <div>
        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          className="bg-[#222222] border-gray-700"
        />
      </div>
      <div>
        <Textarea
          name="message"
          placeholder="Your Message"
          required
          className="bg-[#222222] border-gray-700 min-h-[150px]"
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}

