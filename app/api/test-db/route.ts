import { NextResponse } from 'next/server'
import { testDatabaseConnection } from '@/lib/db'

export async function GET() {
  try {
    const isConnected = await testDatabaseConnection()
    if (isConnected) {
      return NextResponse.json({ status: 'connected', message: 'Database connection successful' }, { status: 200 })
    } else {
      return NextResponse.json({ status: 'disconnected', message: 'Database connection failed' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in test-db route:', error)
    return NextResponse.json({ status: 'error', message: 'An error occurred while testing the database connection' }, { status: 500 })
  }
}

