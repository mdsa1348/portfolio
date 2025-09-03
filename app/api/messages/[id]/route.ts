import { NextResponse } from "next/server"
import { deleteMessage, initializeDatabase } from "@/lib/db"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await initializeDatabase()
    const id = params.id
    await deleteMessage(id)

    // if (!deleted) {
    //   return NextResponse.json({ error: "Message not found" }, { status: 404 })
    // }

    return NextResponse.json({ message: "Message deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error in DELETE :", error)
    return NextResponse.json({ error: "Error deleting message" }, { status: 500 })
  }
}

