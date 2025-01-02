import { NextResponse } from 'next/server'
import { addResumeItem, createResumeTable } from '@/lib/db'

export async function POST(request: Request) {
  try {
    await createResumeTable()
    const { type, title, description, date } = await request.json()

    const newItem = await addResumeItem(type, title, description, date)

    if (!newItem) {
      throw new Error('Failed to add resume item')
    }

    return NextResponse.json({ message: 'Resume item added successfully', item: newItem }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/resume:', error)
    return NextResponse.json({ error: 'Error adding resume item' }, { status: 500 })
  }
}

