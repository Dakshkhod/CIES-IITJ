import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Lazy initialization - only connect when needed (not at build time)
function getDbClient() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return neon(databaseUrl)
}

// Ensure the table exists. Guarded so it only runs once per warm instance
// instead of on every request.
let tableReady = false
async function ensureTable() {
  if (tableReady) return
  const sql = getDbClient()
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
  tableReady = true
}

// Best-effort in-memory rate limit for the public submit endpoint.
const submitAttempts = new Map<string, { count: number; resetAt: number }>()
const SUBMIT_MAX = 5
const SUBMIT_WINDOW_MS = 10 * 60 * 1000

function clientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function submitRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = submitAttempts.get(ip)
  if (!entry || now > entry.resetAt) {
    submitAttempts.set(ip, { count: 1, resetAt: now + SUBMIT_WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > SUBMIT_MAX
}

const LIMITS = {
  name: 255,
  email: 255,
  phone: 20,
  subject: 255,
  message: 5000,
}

// POST - Submit contact form (public)
export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request)
    if (submitRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json().catch(() => ({}))
    const { name, email, phone, subject, message, website } = body

    // Honeypot: real users never fill the hidden "website" field.
    if (typeof website === 'string' && website.trim() !== '') {
      // Silently accept to avoid signalling bots, but do not store.
      return NextResponse.json({
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.',
      })
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    if (
      String(name).length > LIMITS.name ||
      String(email).length > LIMITS.email ||
      (phone && String(phone).length > LIMITS.phone) ||
      (subject && String(subject).length > LIMITS.subject) ||
      String(message).length > LIMITS.message
    ) {
      return NextResponse.json(
        { success: false, message: 'One or more fields exceed the allowed length.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      )
    }

    await ensureTable()

    const ip_address = ip
    const user_agent = request.headers.get('user-agent') || 'unknown'

    const sql = getDbClient()
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

// GET - Get contact submissions (ADMIN ONLY - requires valid session)
export async function GET(request: NextRequest) {
  // Server-side authorization. Without a valid admin session this returns 401
  // and never touches the database.
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const searchParams = request.nextUrl.searchParams
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')))
    const offset = (page - 1) * limit

    await ensureTable()

    const sql = getDbClient()
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
