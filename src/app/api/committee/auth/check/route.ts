import { NextRequest, NextResponse } from 'next/server'
import { isRequestAdminAuthenticated } from '@/lib/admin-auth'

export async function GET(req: NextRequest) {
  const authenticated = isRequestAdminAuthenticated(req)
  return NextResponse.json({ authenticated })
}
