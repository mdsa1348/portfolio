import { NextResponse } from 'next/server'
import { addPortfolioItem, createPortfolioTable } from '@/lib/db'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { nanoid } from 'nanoid'

export async function POST(request: Request) {
  try {
    await createPortfolioTable()

    const formData = await request.formData()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const type = formData.get('type') as 'project' | 'course'
    const image = formData.get('image') as File

    let filename = ''
    if (image) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const ext = image.name.split('.').pop() || 'jpg'
      filename = `${nanoid()}.${ext}`
      const imageDir = join(process.cwd(), 'public', 'portfolio-images')
      const imagePath = join(imageDir, filename)

      // Create the directory if it doesn't exist
      await mkdir(imageDir, { recursive: true })

      await writeFile(imagePath, buffer)
    }

    const newItem = await addPortfolioItem(title, description, category, filename, type)

    if (!newItem) {
      throw new Error('Failed to add portfolio item')
    }

    return NextResponse.json({ message: 'Portfolio item added successfully', item: newItem }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/portfolio:', error)
    return NextResponse.json({ error: 'Error adding portfolio item' }, { status: 500 })
  }
}

