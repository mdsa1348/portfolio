import { NextResponse } from 'next/server'
import { updatePortfolioItem, deletePortfolioItem } from '@/lib/db'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { title, description, category, imageUrl } = await request.json()
    const id = parseInt(params.id, 10)

    const updatedItem = await updatePortfolioItem(id, title, description, category, imageUrl)

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

