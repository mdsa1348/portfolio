import { NextResponse } from "next/server"
import { updateResumeItem, deleteResumeItem, initializeDatabase } from "@/lib/db"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await initializeDatabase()
    const id = params.id

    
    const { type, title, description, date } = await request.json()

    const updatedItem = await updateResumeItem(id, {
      type,
      title,
      description,
      date,
    })

    // if (!updatedItem) {
    //   return NextResponse.json({ error: "Failed to update resume item" }, { status: 404 })
    // }

    return NextResponse.json({ message: "Resume item updated successfully", item: updatedItem }, { status: 200 })
  } catch (error) {
    console.error("Error in PUT /api/resume/[id]:", error)
    return NextResponse.json({ error: "Error updating resume item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await initializeDatabase()
    const id = params.id

    const deleted = await deleteResumeItem(id)

    if (!deleted) {
      return NextResponse.json({ error: "Failed to delete resume item" }, { status: 404 })
    }

    return NextResponse.json({ message: "Resume item deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error in DELETE /api/resume/[id]:", error)
    return NextResponse.json({ error: "Error deleting resume item" }, { status: 500 })
  }
}

