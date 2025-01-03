import { NextResponse } from 'next/server'
import { testDatabaseConnection } from '@/lib/db'

export async function GET() {
  try {
    // Call the function and get the result
    const result = await testDatabaseConnection();
    
    // Return the result in the response
    return NextResponse.json(
      { message: 'Database connection successful', data: result },
      { status: 200 }
    );
  } catch (error) {
    // Log the error
    console.error('Error in test-db route:', error);
    
    // Return the error response
    return NextResponse.json(
      { error: 'Database connection failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
