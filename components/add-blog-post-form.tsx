'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { BlogPost } from '@/lib/db'

interface AddBlogPostFormProps {
  post?: BlogPost
  onCancel?: () => void
}

export function AddBlogPostForm({ post, onCancel }: AddBlogPostFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
  })

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
      })
    }
  }, [post])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const url = post ? `/api/blog/${post._id}` : '/api/blog'
      const method = post ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to ${post ? 'update' : 'add'} blog post`)
      }

      alert(`Blog post ${post ? 'updated' : 'added'} successfully!`)
      
      // Refresh the page to update the blog posts list
      window.location.reload()

      
      // if (post && onCancel) {
      //   onCancel()
      // } else {
      //   event.currentTarget.reset()
      //   setFormData({ title: '', excerpt: '', content: '' })
      // }

      
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
          placeholder="Title"
          required
          className="bg-[#222222] border-gray-700"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <Textarea
          name="excerpt"
          placeholder="Excerpt"
          required
          className="bg-[#222222] border-gray-700 min-h-[100px]"
          value={formData.excerpt}
          onChange={handleChange}
        />
      </div>
      <div>
        <Textarea
          name="content"
          placeholder="Content"
          required
          className="bg-[#222222] border-gray-700 min-h-[200px]"
          value={formData.content}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : (post ? 'Update Post' : 'Add Post')}
        </Button>
        {post && onCancel && (
          <Button type="button" onClick={onCancel} variant="outline">
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

