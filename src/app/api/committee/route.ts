import { NextRequest, NextResponse } from 'next/server'
import {
  getAllCommitteeMembers,
  upsertCommitteeMember,
  deleteCommitteeMember,
} from '@/lib/committee-store'
import { isRequestAdminAuthenticated } from '@/lib/admin-auth'

export async function GET() {
  try {
    const members = await getAllCommitteeMembers()
    return NextResponse.json({ success: true, members })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Failed to fetch' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isRequestAdminAuthenticated(req)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin session required.' },
        { status: 401 },
      )
    }

    const body = await req.json()
    if (!body.name || !body.designation) {
      return NextResponse.json(
        { success: false, error: 'Full Name and Designation are required.' },
        { status: 400 },
      )
    }

    const updated = await upsertCommitteeMember(body)
    return NextResponse.json({ success: true, member: updated })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!isRequestAdminAuthenticated(req)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin session required.' },
        { status: 401 },
      )
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Member ID is required.' },
        { status: 400 },
      )
    }

    const deleted = await deleteCommitteeMember(id)
    return NextResponse.json({ success: deleted })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete' },
      { status: 500 },
    )
  }
}
