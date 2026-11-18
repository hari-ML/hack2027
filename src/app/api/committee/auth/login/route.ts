import { NextRequest, NextResponse } from 'next/server'
import {
  verifyAdminCredentials,
  createSessionToken,
  ADMIN_COOKIE_NAME,
} from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required.' },
        { status: 400 },
      )
    }

    const isValid = verifyAdminCredentials(username.trim(), password)
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin credentials.' },
        { status: 401 },
      )
    }

    const token = createSessionToken()
    const response = NextResponse.json({ success: true, message: 'Authenticated successfully' })

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Login failed' },
      { status: 500 },
    )
  }
}
