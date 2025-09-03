'use client'

import { useState } from 'react'
import { AddBlogPostForm } from './add-blog-post-form'
import { Button } from '@/components/ui/button'
import { BlogPost } from '@/lib/db'

export function AdminPanel({ blogPosts }: { blogPosts: BlogPost[] }) {
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
        if (response.ok) {
          alert('Blog post deleted successfully')
          window.location.reload()
        } else {
          throw new Error('Failed to delete blog post')
        }
      } catch (error) {
        console.error('Error deleting blog post:', error)
        alert('Failed to delete blog post. Please try again.')
      }
    }
  }

  return (
    <div className="space-y-6">
      {editingPost ? (
        <AddBlogPostForm post={editingPost} onCancel={() => setEditingPost(null)} />
      ) : (
        <AddBlogPostForm />
      )}

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Manage Blog Posts</h4>
        {blogPosts.map((post) => (
          <div key={post._id} className="flex justify-between items-center bg-[#222222] p-4 rounded-md">
            <span>{post.title}</span>
            <div>
              <Button onClick={() => handleEdit(post)} className="mr-2">Edit</Button>
              <Button onClick={() => handleDelete(post._id)} variant="destructive">Delete</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4"></div>
    </div>
  )
}

