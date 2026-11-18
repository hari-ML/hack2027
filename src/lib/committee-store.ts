import fs from 'fs'
import path from 'path'
import { getPayloadClient } from '@/lib/payload'
import defaultCommitteeData from '@/data/committee.json'

export type CommitteeMember = {
  id: string
  name: string
  designation: string
  photoUrl: string | null
  linkedinUrl: string | null
  instagramUrl: string | null
  githubUrl?: string | null
  sortOrder: number
  isActive: boolean
  isFaculty: boolean
}

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'committee.json')

export async function readLocalCommittee(): Promise<CommitteeMember[]> {
  try {
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, 'utf-8')
      const parsed = JSON.parse(raw.replace(/^\uFEFF/, ''))
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as CommitteeMember[]
      }
    }
  } catch {
    // In serverless / read-only filesystem, file read falls back to bundled JSON
  }
  return (defaultCommitteeData as CommitteeMember[]) || []
}

export async function writeLocalCommittee(members: CommitteeMember[]): Promise<boolean> {
  try {
    const dir = path.dirname(dataFilePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(members, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.error('Error writing local committee data:', err)
    return false
  }
}

export async function getAllCommitteeMembers(): Promise<CommitteeMember[]> {
  // 1. Attempt to fetch from Payload if available
  try {
    const payload = await getPayloadClient()
    if (!payload) throw new Error('Payload client unavailable')
    const result = await (payload as any).find({
      collection: 'committee-members',
      sort: 'sortOrder',
      depth: 1,
      limit: 100,
    })

    if (result?.docs && Array.isArray(result.docs) && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        id: String(doc.id),
        name: doc.name,
        designation: doc.designation,
        photoUrl: doc.photo?.url ?? null,
        linkedinUrl: doc.linkedinUrl ?? null,
        instagramUrl: doc.instagramUrl ?? null,
        githubUrl: doc.githubUrl ?? null,
        sortOrder: doc.sortOrder ?? 0,
        isActive: doc.isActive ?? true,
        isFaculty: doc.isFaculty ?? false,
      }))
    }
  } catch {
    // Payload client unavailable or in standalone mode
  }

  // 2. Fallback to local persistent JSON
  const local = await readLocalCommittee()
  return local.sort((a, b) => a.sortOrder - b.sortOrder)
}

export async function upsertCommitteeMember(
  data: Partial<CommitteeMember> & { name: string; designation: string },
): Promise<CommitteeMember> {
  const all = await readLocalCommittee()
  const id = data.id || `member-${Date.now()}`
  const existingIdx = all.findIndex((m) => m.id === id)

  const updated: CommitteeMember = {
    id,
    name: data.name,
    designation: data.designation,
    photoUrl: data.photoUrl !== undefined ? data.photoUrl : (all[existingIdx]?.photoUrl ?? null),
    linkedinUrl:
      data.linkedinUrl !== undefined ? data.linkedinUrl : (all[existingIdx]?.linkedinUrl ?? null),
    instagramUrl:
      data.instagramUrl !== undefined
        ? data.instagramUrl
        : (all[existingIdx]?.instagramUrl ?? null),
    githubUrl:
      data.githubUrl !== undefined
        ? data.githubUrl
        : (all[existingIdx]?.githubUrl ?? null),
    sortOrder: data.sortOrder ?? (all[existingIdx]?.sortOrder ?? all.length + 1),
    isActive: data.isActive ?? (all[existingIdx]?.isActive ?? true),
    isFaculty: data.isFaculty ?? (all[existingIdx]?.isFaculty ?? false),
  }

  if (existingIdx >= 0) {
    all[existingIdx] = updated
  } else {
    all.push(updated)
  }

  await writeLocalCommittee(all)

  // Also try to mirror in Payload if accessible
  try {
    const payload = (await getPayloadClient()) as any
    if (existingIdx >= 0 && !id.startsWith('member-')) {
      await payload.update({
        collection: 'committee-members',
        id,
        data: {
          name: updated.name,
          designation: updated.designation,
          linkedinUrl: updated.linkedinUrl,
          instagramUrl: updated.instagramUrl,
          githubUrl: updated.githubUrl,
          sortOrder: updated.sortOrder,
          isActive: updated.isActive,
          isFaculty: updated.isFaculty,
        },
      })
    } else {
      await payload.create({
        collection: 'committee-members',
        data: {
          name: updated.name,
          designation: updated.designation,
          linkedinUrl: updated.linkedinUrl,
          instagramUrl: updated.instagramUrl,
          githubUrl: updated.githubUrl,
          sortOrder: updated.sortOrder,
          isActive: updated.isActive,
          isFaculty: updated.isFaculty,
        },
      })
    }
  } catch {
    // Payload may not be running in this mode
  }

  return updated
}

export async function deleteCommitteeMember(id: string): Promise<boolean> {
  const all = await readLocalCommittee()
  const filtered = all.filter((m) => m.id !== id)
  const changed = filtered.length !== all.length
  if (changed) {
    await writeLocalCommittee(filtered)
  }

  try {
    const payload = (await getPayloadClient()) as any
    await payload.delete({
      collection: 'committee-members',
      id,
    })
  } catch {
    // Payload may not be running in this mode
  }

  return changed
}
