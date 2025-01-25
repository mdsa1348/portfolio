import { NextResponse } from "next/server"
import { updateBlogPost, deleteBlogPost, initializeDatabase } from "@/lib/db"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await initializeDatabase()
    const id = params.id
    const { title, excerpt, content } = await request.json()

    const updatedPost = await updateBlogPost(id, {
      title,
      excerpt,
      content,
    })

    // if (!updatedPost) {
    //   return NextResponse.json({ error: "Failed to update blog post" }, { status: 404 })
    // }

    return NextResponse.json({ message: "Blog post updated successfully", post: updatedPost }, { status: 200 })
  } catch (error) {
    console.error("Error in PUT /api/blog/[id]:", error)
    return NextResponse.json({ error: "Error updating blog post" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await initializeDatabase()
    const id = params.id
    console.log("id :", id)
    await deleteBlogPost(id)

    // if (!deleted) {
    //   return NextResponse.json({ error: "Failed to delete blog post" }, { status: 404 })
    // }

    return NextResponse.json({ message: "Blog post deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error in DELETE /api/blog/[id]:", error)
    return NextResponse.json({ error: "Error deleting blog post" }, { status: 500 })
  }
}

