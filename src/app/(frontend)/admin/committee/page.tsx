'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface CommitteeMember {
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

export default function CommitteeAdminPage() {
  const router = useRouter()
  const [members, setMembers] = useState<CommitteeMember[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editingMember, setEditingMember] = useState<Partial<CommitteeMember> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/committee/auth/check')
      const data = await res.json()
      if (!data.authenticated) {
        router.replace('/admin/committee/login')
        return false
      }
      return true
    } catch {
      router.replace('/admin/committee/login')
      return false
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/committee/auth/logout', { method: 'POST' })
      router.replace('/admin/committee/login')
    } catch {
      router.replace('/admin/committee/login')
    }
  }

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/committee')
      if (res.status === 401) {
        router.replace('/admin/committee/login')
        return
      }
      const data = await res.json()
      if (data.success) {
        setMembers(data.members)
      }
    } catch (err) {
      console.error('Failed to load committee members:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth().then((isAuth) => {
      if (isAuth) fetchMembers()
    })
  }, [])

  const startAdd = () => {
    setEditingMember({
      name: '',
      designation: '',
      linkedinUrl: '',
      instagramUrl: '',
      photoUrl: null,
      sortOrder: members.length + 1,
      isActive: true,
      isFaculty: false,
    })
    setIsNew(true)
    setSelectedFile(null)
    setPreviewUrl(null)
    setStatusMsg(null)
  }

  const startEdit = (m: CommitteeMember) => {
    setEditingMember({ ...m })
    setIsNew(false)
    setSelectedFile(null)
    setPreviewUrl(m.photoUrl)
    setStatusMsg(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type.toLowerCase())) {
      setStatusMsg({ type: 'error', text: 'Supported formats: JPG, JPEG, PNG, WEBP' })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatusMsg({ type: 'error', text: 'File exceeds 5MB limit' })
      return
    }

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setStatusMsg(null)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingMember?.name || !editingMember?.designation) {
      setStatusMsg({ type: 'error', text: 'Name and Designation are required.' })
      return
    }

    setSaving(true)
    setStatusMsg(null)

    try {
      let finalPhotoUrl = editingMember.photoUrl ?? null

      // Upload new photo if selected
      if (selectedFile) {
        const formData = new FormData()
        formData.append('file', selectedFile)
        if (editingMember.id) {
          formData.append('memberId', editingMember.id)
        }

        const upRes = await fetch('/api/committee/upload', {
          method: 'POST',
          body: formData,
        })
        const upData = await upRes.json()
        if (!upRes.ok || !upData.success) {
          throw new Error(upData.error || 'Failed to upload photo')
        }
        finalPhotoUrl = upData.url
      }

      // Save member data
      const res = await fetch('/api/committee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingMember,
          photoUrl: finalPhotoUrl,
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save member')
      }

      setStatusMsg({ type: 'success', text: 'Profile saved successfully!' })
      await fetchMembers()
      setEditingMember(null)
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Error saving member' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name} from the committee?`)) {
      return
    }

    try {
      const res = await fetch(`/api/committee?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success) {
        await fetchMembers()
        if (editingMember?.id === id) {
          setEditingMember(null)
        }
      }
    } catch (err) {
      alert('Failed to delete member.')
    }
  }

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.designation.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div>
            <span className="eyebrow">
              <i /> HACK 2027 ADMIN
            </span>
            <h1>Organizing Committee Dashboard</h1>
            <p>Manage committee profiles, upload photos, and update social media links.</p>
          </div>
          <div className="admin-header-actions">
            <Link href="/" className="button button-ghost button-small">
              ← View Website
            </Link>
            <button onClick={startAdd} className="button button-small">
              + Add Member
            </button>
            <button
              onClick={handleLogout}
              className="button button-ghost button-small"
              style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
              title="Logout from admin session"
            >
              Logout ⎋
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {/* Search & Stats Bar */}
        <div className="admin-toolbar">
          <div className="admin-stats">
            <span>Total Members: <strong>{members.length}</strong></span>
            <span>With Photos: <strong>{members.filter((m) => m.photoUrl).length}</strong></span>
          </div>
          <div className="admin-search-wrap">
            <input
              type="text"
              placeholder="Search by name or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-search-input"
            />
          </div>
        </div>

        {/* Member Edit / Create Modal */}
        {editingMember && (
          <div className="admin-modal-backdrop" onClick={() => setEditingMember(null)}>
            <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2>{isNew ? 'Add New Committee Member' : `Edit: ${editingMember.name}`}</h2>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setEditingMember(null)}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSave} className="admin-form">
                {/* Photo Preview & Upload */}
                <div className="admin-photo-field">
                  <div className="admin-photo-circle">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" />
                    ) : (
                      <div className="admin-photo-empty">No Photo</div>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="button button-small"
                    >
                      {previewUrl ? 'Change Photograph' : 'Upload Photograph'}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <small>Supports JPG, JPEG, PNG, WEBP (Max 5MB)</small>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={editingMember.name || ''}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, name: e.target.value })
                      }
                      placeholder="e.g. ARSHATH ALI A"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Designation / Role *</label>
                    <input
                      type="text"
                      required
                      value={editingMember.designation || ''}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, designation: e.target.value })
                      }
                      placeholder="e.g. Chief Organizer & Event Director"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={editingMember.linkedinUrl || ''}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, linkedinUrl: e.target.value })
                      }
                      placeholder="https://linkedin.com/in/username"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Instagram Profile URL</label>
                    <input
                      type="url"
                      value={editingMember.instagramUrl || ''}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, instagramUrl: e.target.value })
                      }
                      placeholder="https://instagram.com/username"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>GitHub Profile URL (Optional)</label>
                  <input
                    type="url"
                    value={editingMember.githubUrl || ''}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/username"
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Sort Order</label>
                    <input
                      type="number"
                      value={editingMember.sortOrder ?? 0}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          sortOrder: parseInt(e.target.value) || 0,
                        })
                      }
                      className="form-input"
                    />
                  </div>
                  <div className="form-group-checkboxes">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={editingMember.isActive ?? true}
                        onChange={(e) =>
                          setEditingMember({ ...editingMember, isActive: e.target.checked })
                        }
                      />
                      Active (Display on website)
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={editingMember.isFaculty ?? false}
                        onChange={(e) =>
                          setEditingMember({ ...editingMember, isFaculty: e.target.checked })
                        }
                      />
                      Faculty In-Charge
                    </label>
                  </div>
                </div>

                {statusMsg && (
                  <div
                    className={
                      statusMsg.type === 'success' ? 'form-success' : 'form-error'
                    }
                  >
                    {statusMsg.text}
                  </div>
                )}

                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setEditingMember(null)}
                    className="button button-ghost"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="button" disabled={saving}>
                    {saving ? 'Saving...' : 'Save / Update Member'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Members Grid / Table */}
        {loading ? (
          <div className="admin-loading">Loading committee members...</div>
        ) : (
          <div className="admin-grid">
            {filteredMembers.map((m) => (
              <div className="admin-card" key={m.id}>
                <div className="admin-card-top">
                  <div className="admin-card-avatar">
                    {m.photoUrl ? (
                      <img src={m.photoUrl} alt={m.name} />
                    ) : (
                      <div className="admin-card-empty-avatar">NO PHOTO</div>
                    )}
                  </div>
                  <div className="admin-card-info">
                    {m.isFaculty && <span className="faculty-badge">Faculty In-Charge</span>}
                    <h3>{m.name}</h3>
                    <p>{m.designation}</p>
                    <div className="admin-card-socials">
                      {m.linkedinUrl ? (
                        <a
                          href={m.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="social-badge linked"
                        >
                          LinkedIn ✓
                        </a>
                      ) : (
                        <span className="social-badge missing">No LinkedIn</span>
                      )}
                      {m.instagramUrl ? (
                        <a
                          href={m.instagramUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="social-badge linked"
                        >
                          Instagram ✓
                        </a>
                      ) : (
                        <span className="social-badge missing">No Instagram</span>
                      )}
                      {m.githubUrl && (
                        <a
                          href={m.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="social-badge linked"
                        >
                          GitHub ✓
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="admin-card-actions">
                  <button
                    onClick={() => startEdit(m)}
                    className="button button-small"
                  >
                    Edit Profile & Photo
                  </button>
                  <button
                    onClick={() => handleDelete(m.id, m.name)}
                    className="button button-small button-ghost admin-delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
