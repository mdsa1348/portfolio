'use client'

import { useState } from 'react'
import { Message } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface MessageListProps {
  initialMessages: Message[]
}

export function MessageList({ initialMessages }: MessageListProps) {
  const [messages, setMessages] = useState(initialMessages)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await fetch(`/api/messages/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          setMessages(messages.filter(message => message._id !== id))
          router.refresh()
          window.location.reload()
        } else {
          throw new Error('Failed to delete message')
        }
      } catch (error) {
        console.error('Error deleting message:', error)
        alert('Failed to delete message. Please try again.')
      }
    }
  }

  return (
    <div className="space-y-4">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} className="bg-[#222222] p-4 rounded-md flex justify-between items-start">
            <div>
              <p><strong>Name:</strong> {message.name}</p>
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Message:</strong> {message.message}</p>
              <p><strong>Date:</strong> {new Date(message.created_at).toLocaleString()}</p>
            </div>
            <Button onClick={() => handleDelete(message._id)} variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        ))
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  )
}

