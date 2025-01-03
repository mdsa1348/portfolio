import { NextResponse } from 'next/server'
import { getPortfolioItems } from '@/lib/db'

export async function GET() {
  try {
    const portfolioItems = await getPortfolioItems()
    return NextResponse.json(portfolioItems)
  } catch (error) {
    console.error('Error fetching portfolio items:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}