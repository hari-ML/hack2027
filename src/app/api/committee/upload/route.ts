import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { put } from '@vercel/blob'
import { readLocalCommittee, writeLocalCommittee } from '@/lib/committee-store'
import { isRequestAdminAuthenticated } from '@/lib/admin-auth'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export async function POST(req: NextRequest) {
  try {
    if (!isRequestAdminAuthenticated(req)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin session required to upload photographs.' },
        { status: 401 },
      )
    }

    const formData = await req.formData()
    const file = (formData.get('file') || formData.get('photo') || formData.get('image')) as File | null
    const memberId = formData.get('memberId') as string | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided.' },
        { status: 400 },
      )
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid file format. Only JPG, JPEG, PNG, and WEBP images are supported.',
        },
        { status: 400 },
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: 'File size exceeds 5MB limit. Please upload a smaller image.',
        },
        { status: 400 },
      )
    }

    const ext = path.extname(file.name).toLowerCase() || '.jpg'
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported file extension.' },
        { status: 400 },
      )
    }

    const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_')
    const fileName = `${cleanBase}_${Date.now()}${ext}`

    let publicUrl: string

    // 1. Persistent external storage on Vercel via Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`committee/${fileName}`, file, {
        access: 'public',
      })
      publicUrl = blob.url
    } else {
      // 2. Local development fallback to public/uploads/committee/
      try {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'committee')
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true })
        }
        const filePath = path.join(uploadDir, fileName)
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        fs.writeFileSync(filePath, buffer)
        publicUrl = `/uploads/committee/${fileName}`
      } catch (fsErr: any) {
        // In read-only serverless environment where Vercel Blob token is not yet configured,
        // encode as base64 Data URL so the photo is preserved without crashing
        const arrayBuffer = await file.arrayBuffer()
        const base64 = Buffer.from(arrayBuffer).toString('base64')
        publicUrl = `data:${file.type};base64,${base64}`
      }
    }

    // If memberId is passed, update that member's photoUrl right away
    if (memberId) {
      const all = await readLocalCommittee()
      const idx = all.findIndex((m) => m.id === memberId)
      if (idx >= 0) {
        all[idx].photoUrl = publicUrl
        await writeLocalCommittee(all)
      }
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to upload photo.' },
      { status: 500 },
    )
  }
}
