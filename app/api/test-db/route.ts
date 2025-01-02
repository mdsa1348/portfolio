import { NextResponse } from 'next/server'
import { testDatabaseConnection } from '@/lib/db'

export async function GET() {
  try {
    await testDatabaseConnection()
    return NextResponse.json({ message: 'Database connection successful' }, { status: 200 })
  } catch (error) {
    console.error('Error in test-db route:', error)
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
  }
}

