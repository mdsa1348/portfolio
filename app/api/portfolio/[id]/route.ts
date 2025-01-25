import { NextResponse } from "next/server"
import { updatePortfolioItem, deletePortfolioItem, initializeDatabase } from "@/lib/db"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { nanoid } from "nanoid"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await initializeDatabase()
    const id = params.id
    const formData = await request.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const type = formData.get("type") as "project" | "course" | "thesis"
    const image = formData.get("image") as File | null

    let filename = ""
    if (image) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const ext = image.name.split(".").pop() || "jpg"
      filename = `${nanoid()}.${ext}`
      const imageDir = join(process.cwd(), "public", "portfolio-images")
      const imagePath = join(imageDir, filename)

      await mkdir(imageDir, { recursive: true })
      await writeFile(imagePath, buffer)
    }

    const updatedItem = await updatePortfolioItem(id, {
      title,
      description,
      category,
      type,
      ...(filename && { image: filename }),
    })

    // if (!updatedItem) {
    //   return NextResponse.json({ error: "Failed to update portfolio item" }, { status: 404 })
    // }

    return NextResponse.json({ message: "Portfolio item updated successfully", item: updatedItem }, { status: 200 })
  } catch (error) {
    console.error("Error in PUT /api/portfolio/[id]:", error)
    return NextResponse.json({ error: "Error updating portfolio item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await initializeDatabase()
    const id = params.id

    await deletePortfolioItem(id)

    // if (!deleted) {
    //   return NextResponse.json({ error: "Failed to delete portfolio item" }, { status: 404 })
    // }

    return NextResponse.json({ message: "Portfolio item deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error in DELETE /api/portfolio/[id]:", error)
    return NextResponse.json({ error: "Error deleting portfolio item" }, { status: 500 })
  }
}

