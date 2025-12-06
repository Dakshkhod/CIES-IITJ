import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

// Initialize database connection
const sql = neon(process.env.DATABASE_URL!)

// Initialize database table (runs on first connection)
async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      ip_address VARCHAR(45),
      user_agent TEXT,
      is_read BOOLEAN DEFAULT FALSE,
      is_replied BOOLEAN DEFAULT FALSE,
      replied_at TIMESTAMP,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `
}

// POST - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Initialize database table if not exists
    await initializeDatabase()

    // Get client info
    const ip_address = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       'unknown'
    const user_agent = request.headers.get('user-agent') || 'unknown'

    // Insert into database
    const result = await sql`
      INSERT INTO contact_submissions (name, email, phone, subject, message, ip_address, user_agent)
      VALUES (${name}, ${email}, ${phone || null}, ${subject || null}, ${message}, ${ip_address}, ${user_agent})
      RETURNING id, created_at
    `

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      id: result[0].id,
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}

// GET - Get contact submissions (admin only - add authentication later)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    // For now, this endpoint should be protected by Vercel/environment

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    await initializeDatabase()

    const submissions = await sql`
      SELECT * FROM contact_submissions
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `

    const countResult = await sql`
      SELECT COUNT(*) as total FROM contact_submissions
    `

    return NextResponse.json({
      success: true,
      data: submissions,
      pagination: {
        page,
        limit,
        total: parseInt(countResult[0].total),
        totalPages: Math.ceil(parseInt(countResult[0].total) / limit),
      },
    })
  } catch (error) {
    console.error('Get submissions error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

