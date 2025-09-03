import { NextResponse } from "next/server"
import { addResumeItem, getResumeItems, initializeDatabase } from "@/lib/db"

export async function GET() {
  try {
    await initializeDatabase()
    const items = await getResumeItems()
    return NextResponse.json(items)
  } catch (error) {
    console.error("Error fetching resume items:", error)
    return NextResponse.json({ error: "Failed to fetch resume items" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await initializeDatabase()
    const { type, title, description, date } = await request.json()

    const newItem = await addResumeItem({
      type,
      title,
      description,
      date,
    })

    return NextResponse.json({ message: "Resume item added successfully", item: newItem }, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/resume:", error)
    return NextResponse.json({ error: "Error adding resume item" }, { status: 500 })
  }
}

