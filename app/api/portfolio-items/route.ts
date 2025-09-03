import { NextResponse } from 'next/server'
import { getPortfolioItems } from '@/lib/db'

export const maxDuration = 8; // Set max duration to 8 seconds

export async function GET() {
  try {
    const portfolioItems = await getPortfolioItems()
    return NextResponse.json(portfolioItems)
  } catch (error) {
    console.error('Portfolio items fetch error:', error)
    
    // Return a more specific error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch portfolio items',
        details: errorMessage,
        timestamp: new Date().toISOString()
      }, 
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
          'Content-Type': 'application/json',
        }
      }
    )
  }
}
