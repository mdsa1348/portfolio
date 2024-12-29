import { NextResponse } from 'next/server'
import { addPortfolioItem, createPortfolioTable } from '@/lib/db'

export async function POST(request: Request) {
  try {
    await createPortfolioTable()
    const { title, description, category, imageUrl } = await request.json()

    const newItem = await addPortfolioItem(title, description, category, imageUrl)

    if (!newItem) {
      throw new Error('Failed to add portfolio item')
    }

    return NextResponse.json({ message: 'Portfolio item added successfully', item: newItem }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/portfolio:', error)
    return NextResponse.json({ error: 'Error adding portfolio item' }, { status: 500 })
  }
}

