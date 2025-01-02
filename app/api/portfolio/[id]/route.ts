import { NextResponse } from 'next/server'
import { updatePortfolioItem, deletePortfolioItem, getPortfolioItems } from '@/lib/db'
import { writeFile, unlink, mkdir } from 'fs/promises'
import { join } from 'path'
import { nanoid } from 'nanoid'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10)

    const formData = await request.formData()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const type = formData.get('type') as 'project' | 'course'
    const image = formData.get('image') as File | null

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

      // Delete old image if it exists
      const oldItem = (await getPortfolioItems()).find(item => item.id === id)
      if (oldItem && oldItem.image) {
        const oldImagePath = join(process.cwd(), 'public', 'portfolio-images', oldItem.image)
        await unlink(oldImagePath).catch(() => {}) // Ignore error if file doesn't exist
      }
    } else {
      // If no new image is uploaded, keep the existing image filename
      const oldItem = (await getPortfolioItems()).find(item => item.id === id)
      filename = oldItem?.image || ''
    }

    const updatedItem = await updatePortfolioItem(id, title, description, category, filename, type)

    if (!updatedItem) {
      return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Portfolio item updated successfully', item: updatedItem }, { status: 200 })
  } catch (error) {
    console.error('Error in PUT /api/portfolio/[id]:', error)
    return NextResponse.json({ error: 'Error updating portfolio item' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10)

    // Get the item before deleting to retrieve the image filename
    const items = await getPortfolioItems()
    const itemToDelete = items.find(item => item.id === id)

    if (itemToDelete && itemToDelete.image) {
      const imagePath = join(process.cwd(), 'public', 'portfolio-images', itemToDelete.image)
      await unlink(imagePath).catch(() => {}) // Ignore error if file doesn't exist
    }

    const deleted = await deletePortfolioItem(id)

    if (!deleted) {
      return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Portfolio item deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/portfolio/[id]:', error)
    return NextResponse.json({ error: 'Error deleting portfolio item' }, { status: 500 })
  }
}

