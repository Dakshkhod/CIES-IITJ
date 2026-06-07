import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_COOKIE_NAME,
  SESSION_TTL_SECONDS,
  createSessionToken,
  isAuthenticated,
  verifyAdminPassword,
} from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Very small in-memory throttle to slow brute-force on the login endpoint.
// Note: serverless instances are ephemeral, so this is best-effort defence in
// depth, not a substitute for a CAPTCHA / edge rate limiter.
const attempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

function clientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > MAX_ATTEMPTS
}

// GET - check current session state (used by the admin UI on load)
export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: isAuthenticated(request) })
}

// POST - log in with the server-side admin password
export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request)
    if (rateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many attempts. Please try again later.' },
        { status: 429 }
      )
    }

    if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json(
        { success: false, message: 'Admin authentication is not configured on the server.' },
        { status: 500 }
      )
    }

    const body = await request.json().catch(() => ({}))

    if (!verifyAdminPassword(body?.password)) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set(ADMIN_COOKIE_NAME, createSessionToken(), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_TTL_SECONDS,
    })
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}

// DELETE - log out (clear the session cookie)
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return response
}
