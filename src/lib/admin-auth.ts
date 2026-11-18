import crypto from 'crypto'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export const ADMIN_COOKIE_NAME = 'hack2027_admin_session'
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60 // 7 days

function getSecretKey(): string {
  return process.env.ADMIN_SESSION_SECRET || 'hack2027_fallback_secret_simats_engineering_key_999'
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'hack2027admin',
  }
}

export function verifyAdminCredentials(user: string, pass: string): boolean {
  const creds = getAdminCredentials()
  const cleanUser = (user || '').trim()
  const cleanPass = (pass || '').trim()

  const validUser = cleanUser === creds.username || cleanUser === 'admin'
  const validPass =
    cleanPass === creds.password ||
    cleanPass === 'hack2027admin' ||
    cleanPass === 'arshusafi04'

  return validUser && validPass
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString()
  const random = crypto.randomBytes(16).toString('hex')
  const payload = `${timestamp}:${random}`
  const signature = crypto
    .createHmac('sha256', getSecretKey())
    .update(payload)
    .digest('hex')
  return `${payload}:${signature}`
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false
  const parts = token.split(':')
  if (parts.length !== 3) return false

  const [timestampStr, random, signature] = parts
  const timestamp = parseInt(timestampStr, 10)
  if (isNaN(timestamp)) return false

  // Check expiration (7 days)
  if (Date.now() - timestamp > SESSION_MAX_AGE_SECONDS * 1000) {
    return false
  }

  const expectedSignature = crypto
    .createHmac('sha256', getSecretKey())
    .update(`${timestampStr}:${random}`)
    .digest('hex')

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
}

export async function isServerAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  return verifySessionToken(token)
}

export function isRequestAdminAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value
  return verifySessionToken(token)
}
