'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { CommitteeMemberData } from '../page'

interface CommitteeEditModalProps {
  isOpen: boolean
  onClose: () => void
  member: Partial<CommitteeMemberData> | null
  isNew?: boolean
  onSaveSuccess: (saved: CommitteeMemberData) => void
  onDeleteSuccess?: (id: string) => void
}

export function CommitteeEditModal({
  isOpen,
  onClose,
  member,
  isNew = false,
  onSaveSuccess,
  onDeleteSuccess,
}: CommitteeEditModalProps) {
  const [name, setName] = useState('')
  const [designation, setDesignation] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<number>(1)
  const [isActive, setIsActive] = useState(true)
  const [isFaculty, setIsFaculty] = useState(false)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (member) {
      setName(member.name || '')
      setDesignation(member.designation || '')
      setLinkedinUrl(member.linkedinUrl || '')
      setInstagramUrl(member.instagramUrl || '')
      setGithubUrl(member.githubUrl || '')
      setPhotoUrl(member.photoUrl || null)
      setPreviewUrl(member.photoUrl || null)
      setSortOrder(member.sortOrder ?? 1)
      setIsActive(member.isActive ?? true)
      setIsFaculty(member.isFaculty ?? false)
    } else {
      setName('')
      setDesignation('')
      setLinkedinUrl('')
      setInstagramUrl('')
      setGithubUrl('')
      setPhotoUrl(null)
      setPreviewUrl(null)
      setSortOrder(10)
      setIsActive(true)
      setIsFaculty(false)
    }
    setSelectedFile(null)
    setErrorMsg(null)
    setSuccessMsg(null)
  }, [member, isOpen])

  if (!isOpen) return null

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null)
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMsg('Invalid format. Please upload JPG, PNG, or WEBP.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File size exceeds 5MB limit.')
      return
    }

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleRemovePhoto = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setPhotoUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (!name.trim()) {
      setErrorMsg('Full Name is required.')
      return
    }
    if (!designation.trim()) {
      setErrorMsg('Designation is required.')
      return
    }

    setSaving(true)

    try {
      let finalPhotoUrl = photoUrl

      // If a file was selected, upload it first
      if (selectedFile) {
        const formData = new FormData()
        formData.append('file', selectedFile)
        if (member?.id) {
          formData.append('memberId', member.id)
        }

        const upRes = await fetch('/api/committee/upload', {
          method: 'POST',
          body: formData,
        })

        if (upRes.status === 401) {
          throw new Error('Owner authentication required. Please log in with admin session.')
        }

        const upData = await upRes.json()
        if (!upRes.ok || !upData.success) {
          throw new Error(upData.error || 'Failed to upload photograph.')
        }

        finalPhotoUrl = upData.url
      } else if (previewUrl === null) {
        finalPhotoUrl = null
      }

      // Upsert committee member
      const payload: any = {
        name: name.trim(),
        designation: designation.trim(),
        photoUrl: finalPhotoUrl,
        linkedinUrl: linkedinUrl.trim() || null,
        instagramUrl: instagramUrl.trim() || null,
        githubUrl: githubUrl.trim() || null,
        sortOrder: Number(sortOrder) || 1,
        isActive,
        isFaculty,
      }

      if (member?.id && !isNew) {
        payload.id = member.id
      }

      const res = await fetch('/api/committee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.status === 401) {
        throw new Error('Owner authentication required. Please log in with admin session.')
      }

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save member details.')
      }

      setSuccessMsg('Committee member saved successfully!')
      onSaveSuccess(data.member)
      setTimeout(() => {
        onClose()
      }, 700)
    } catch (err: any) {
      setErrorMsg(err.message || 'Error saving member details.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!member?.id) return
    if (!confirm(`Are you sure you want to delete ${name || 'this member'}?`)) {
      return
    }

    setDeleting(true)
    setErrorMsg(null)

    try {
      const res = await fetch(`/api/committee?id=${encodeURIComponent(member.id)}`, {
        method: 'DELETE',
      })

      if (res.status === 401) {
        throw new Error('Owner authentication required. Please log in with admin session.')
      }

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete member.')
      }

      if (onDeleteSuccess) {
        onDeleteSuccess(member.id)
      }
      onClose()
    } catch (err: any) {
      setErrorMsg(err.message || 'Error deleting member.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{ zIndex: 99999 }}
    >
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 580,
          background: '#09090b',
          border: '1.5px solid #FFD600',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 214, 0, 0.15)',
        }}
      >
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">
              <i /> HACK 2027 COMMITTEE · DIRECT EDIT
            </span>
            <h2 style={{ color: '#fff', fontSize: '1.35rem', margin: 0 }}>
              {isNew ? 'Add New Committee Member' : `Edit: ${name || 'Member'}`}
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div
            className="form-error"
            style={{
              marginBottom: 16,
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              color: '#fca5a5',
              padding: '10px 14px',
              borderRadius: 4,
              fontSize: '0.85rem',
            }}
          >
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div
            className="form-success"
            style={{
              marginBottom: 16,
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid #22c55e',
              color: '#86efac',
              padding: '10px 14px',
              borderRadius: 4,
              fontSize: '0.85rem',
            }}
          >
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSave} className="modal-form" style={{ display: 'grid', gap: 14 }}>
          {/* Photo Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              padding: '12px 14px',
              border: '1px solid rgba(255, 214, 0, 0.25)',
              borderRadius: 8,
              background: 'rgba(255, 214, 0, 0.03)',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #FFD600',
                background: '#151515',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span
                  style={{
                    color: '#666',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '9px',
                    fontWeight: 700,
                  }}
                >
                  NO PHOTO
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: '6px 14px',
                    background: '#FFD600',
                    color: '#050505',
                    border: 'none',
                    borderRadius: 4,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '10px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                  }}
                >
                  {previewUrl ? 'REPLACE PHOTO' : 'UPLOAD PHOTO'}
                </button>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    style={{
                      padding: '6px 12px',
                      background: 'transparent',
                      color: '#ef4444',
                      border: '1px solid #ef4444',
                      borderRadius: 4,
                      fontSize: '10px',
                      fontFamily: "'Orbitron', sans-serif",
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    REMOVE
                  </button>
                )}
              </div>
              <small style={{ color: '#888', fontSize: '11px' }}>
                JPG, PNG, or WEBP (max 5MB). Square crop recommended.
              </small>
            </div>
          </div>

          {/* Name & Designation */}
          <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ color: '#FFD600', fontSize: '11px', fontFamily: "'Orbitron', sans-serif", fontWeight: 700, letterSpacing: '0.06em' }}>
                FULL NAME *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. ARSHATH ALI A"
                required
                className="form-input"
                style={{
                  background: '#121214',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#fff',
                  padding: '9px 12px',
                  borderRadius: 4,
                  fontSize: '13px',
                }}
              />
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ color: '#FFD600', fontSize: '11px', fontFamily: "'Orbitron', sans-serif", fontWeight: 700, letterSpacing: '0.06em' }}>
                DESIGNATION / ROLE *
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g. Chief Organizer & Event Director"
                required
                className="form-input"
                style={{
                  background: '#121214',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#fff',
                  padding: '9px 12px',
                  borderRadius: 4,
                  fontSize: '13px',
                }}
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ color: '#aaa', fontSize: '11px', letterSpacing: '0.05em' }}>
              LinkedIn URL
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="form-input"
              style={{
                background: '#121214',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: 4,
                fontSize: '12px',
              }}
            />
          </div>

          <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ color: '#aaa', fontSize: '11px', letterSpacing: '0.05em' }}>
                Instagram URL
              </label>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/username"
                className="form-input"
                style={{
                  background: '#121214',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#fff',
                  padding: '8px 12px',
                  borderRadius: 4,
                  fontSize: '12px',
                }}
              />
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ color: '#aaa', fontSize: '11px', letterSpacing: '0.05em' }}>
                GitHub URL
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username"
                className="form-input"
                style={{
                  background: '#121214',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#fff',
                  padding: '8px 12px',
                  borderRadius: 4,
                  fontSize: '12px',
                }}
              />
            </div>
          </div>

          {/* Options: Order, Active, Faculty */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              paddingTop: 6,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label style={{ color: '#888', fontSize: '11px' }}>Display Order:</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value) || 1)}
                min={1}
                max={99}
                style={{
                  width: 60,
                  background: '#121214',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  padding: '6px 8px',
                  borderRadius: 4,
                  textAlign: 'center',
                }}
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ccc', fontSize: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                style={{ accentColor: '#FFD600' }}
              />
              Active
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ccc', fontSize: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isFaculty}
                onChange={(e) => setIsFaculty(e.target.checked)}
                style={{ accentColor: '#FFD600' }}
              />
              Faculty In-Charge
            </label>
          </div>

          {/* Modal Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
              paddingTop: 12,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div>
              {!isNew && member?.id && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting || saving}
                  style={{
                    padding: '8px 14px',
                    background: 'transparent',
                    color: '#ef4444',
                    border: '1px solid #ef4444',
                    borderRadius: 4,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {deleting ? 'DELETING...' : 'DELETE MEMBER'}
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                style={{
                  padding: '8px 18px',
                  background: 'transparent',
                  color: '#aaa',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 4,
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: '8px 22px',
                  background: '#FFD600',
                  color: '#050505',
                  border: 'none',
                  borderRadius: 4,
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  cursor: saving ? 'wait' : 'pointer',
                  boxShadow: '0 0 15px rgba(255, 214, 0, 0.35)',
                }}
              >
                {saving ? 'SAVING...' : 'SAVE CHANGES'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
