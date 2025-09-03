import { NextResponse } from "next/server"
import { addBlogPost, getBlogPosts, initializeDatabase } from "@/lib/db"

export async function GET() {
  try {
    await initializeDatabase()
    const posts = await getBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await initializeDatabase()
    const { title, excerpt, content } = await request.json()

    const newPost = await addBlogPost({
      title,
      excerpt,
      content,
    })

    return NextResponse.json({ message: "Blog post added successfully", post: newPost }, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/blog:", error)
    return NextResponse.json({ error: "Error adding blog post" }, { status: 500 })
  }
}

