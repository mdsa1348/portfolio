import { NextResponse } from 'next/server'
import { deleteMessage } from '@/lib/db'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10)
    const deleted = await deleteMessage(id)

    if (!deleted) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Message deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/messages/[id]:', error)
    return NextResponse.json({ error: 'Error deleting message' }, { status: 500 })
  }
}

