'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PortfolioItem } from '@/lib/db'

interface AddPortfolioItemFormProps {
  project?: PortfolioItem
  onCancel?: () => void
}

export function AddPortfolioItemForm({ project, onCancel }: AddPortfolioItemFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
  })

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        imageUrl: project.image_url,
      })
    }
  }, [project])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const url = project ? `/api/portfolio/${project.id}` : '/api/portfolio'
      const method = project ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to ${project ? 'update' : 'add'} portfolio item`)
      }

      alert(`Portfolio item ${project ? 'updated' : 'added'} successfully!`)
      
      if (project && onCancel) {
        onCancel()
      } else {
        event.currentTarget.reset()
        setFormData({ title: '', description: '', category: '', imageUrl: '' })
      }

      // Refresh the page to update the project list
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
        <Input
          name="title"
          placeholder="Project Title"
          required
          className="bg-[#222222] border-gray-700"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          name="category"
          placeholder="Category"
          required
          className="bg-[#222222] border-gray-700"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <div>
        <Textarea
          name="description"
          placeholder="Project Description"
          required
          className="bg-[#222222] border-gray-700 min-h-[100px]"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          name="imageUrl"
          placeholder="Image URL"
          required
          className="bg-[#222222] border-gray-700"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : (project ? 'Update Project' : 'Add Project')}
        </Button>
        {project && onCancel && (
          <Button type="button" onClick={onCancel} variant="outline">
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

