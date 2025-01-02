import { NextResponse } from 'next/server'
import { addBlogPost, createBlogTable } from '@/lib/db'

export async function POST(request: Request) {
  try {
    await createBlogTable()
    const { title, excerpt, content } = await request.json()

    const newPost = await addBlogPost(title, excerpt, content)

    if (!newPost) {
      throw new Error('Failed to add blog post')
    }

    return NextResponse.json({ message: 'Blog post added successfully', post: newPost }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/blog:', error)
    return NextResponse.json({ error: 'Error adding blog post' }, { status: 500 })
  }
}

