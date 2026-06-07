import crypto from 'crypto'
import type { NextRequest } from 'next/server'

/**
 * Server-side admin session handling.
 *
 * Security model:
 * - The admin password is read from the server-only `ADMIN_PASSWORD` env var
 *   (never `NEXT_PUBLIC_*`, so it is never shipped to the browser).
 * - On successful login we issue an HMAC-signed, HTTP-only, Secure session
 *   cookie. The signature uses the server-only `ADMIN_SESSION_SECRET`.
 * - Protected API routes verify this cookie on the server for every request.
 */

export const ADMIN_COOKIE_NAME = 'cies_admin_session'

// 8 hour session lifetime
export const SESSION_TTL_SECONDS = 60 * 60 * 8

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 16) {
    throw new Error(
      'ADMIN_SESSION_SECRET environment variable is not set or too short (min 16 chars)'
    )
  }
  return secret
}

function sign(payloadB64: string): string {
  return crypto
    .createHmac('sha256', getSessionSecret())
    .update(payloadB64)
    .digest('base64url')
}

export function createSessionToken(): string {
  const payload = JSON.stringify({
    iat: Date.now(),
    exp: Date.now() + SESSION_TTL_SECONDS * 1000,
  })
  const payloadB64 = Buffer.from(payload).toString('base64url')
  return `${payloadB64}.${sign(payloadB64)}`
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [payloadB64, sig] = parts

  let expected: string
  try {
    expected = sign(payloadB64)
  } catch {
    return false
  }

  const sigBuf = Buffer.from(sig)
  const expectedBuf = Buffer.from(expected)
  if (sigBuf.length !== expectedBuf.length) return false
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())
    return typeof payload.exp === 'number' && Date.now() < payload.exp
  } catch {
    return false
  }
}

/**
 * Constant-time password comparison against the server-only ADMIN_PASSWORD.
 */
export function verifyAdminPassword(candidate: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || typeof candidate !== 'string') return false
  const a = Buffer.from(candidate)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

/**
 * Returns true if the incoming request carries a valid admin session cookie.
 */
export function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value
  return verifySessionToken(token)
}
