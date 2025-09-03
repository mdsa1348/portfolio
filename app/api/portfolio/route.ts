import { NextResponse } from "next/server"
import { addPortfolioItem, getPortfolioItems, initializeDatabase } from "@/lib/db"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { nanoid } from "nanoid"

export async function GET() {
  try {
    await initializeDatabase()
    const items = await getPortfolioItems()
    return NextResponse.json(items)
  } catch (error) {
    console.error("Error fetching portfolio items:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio items" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await initializeDatabase()
    const formData = await request.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const type = formData.get("type") as "project" | "course" | "thesis"
    const image = formData.get("image") as File

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

    const newItem = await addPortfolioItem({
      title,
      description,
      category,
      image: filename,
      type,
    })

    return NextResponse.json({ message: "Portfolio item added successfully", item: newItem }, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/portfolio:", error)
    return NextResponse.json({ error: "Error adding portfolio item" }, { status: 500 })
  }
}

