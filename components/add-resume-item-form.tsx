'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ResumeItem } from '@/lib/db'

interface AddResumeItemFormProps {
  item?: ResumeItem
  onCancel?: () => void
}

export function AddResumeItemForm({ item, onCancel }: AddResumeItemFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: 'experience',
    title: '',
    description: '',
    date: '',
  })

  useEffect(() => {
    if (item) {
      setFormData({
        type: item.type,
        title: item.title,
        description: item.description,
        date: item.date,
      })
    }
  }, [item])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value as 'experience' | 'education' }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const url = item ? `/api/resume/${item._id}` : '/api/resume'
      const method = item ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to ${item ? 'update' : 'add'} resume item`)
      }

      alert(`Resume item ${item ? 'updated' : 'added'} successfully!`)
      window.location.reload()
      
    } catch (error) {
      alert('Error: ' + (error instanceof Error ? error.message : 'An unknown error occurred'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Select name="type" value={formData.type} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="experience">Experience</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Input
          name="title"
          placeholder="Title"
          required
          className="bg-[#222222] border-gray-700"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          name="date"
          placeholder="Date"
          required
          className="bg-[#222222] border-gray-700"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <Textarea
          name="description"
          placeholder="Description"
          required
          className="bg-[#222222] border-gray-700 min-h-[100px]"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : (item ? 'Update Item' : 'Add Item')}
        </Button>
        {item && onCancel && (
          <Button type="button" onClick={onCancel} variant="outline">
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

