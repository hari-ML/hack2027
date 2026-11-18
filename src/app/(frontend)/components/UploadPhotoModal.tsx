'use client'

import React, { useState, useRef, useEffect } from 'react'
import type { CommitteeMemberData } from '../page'

interface UploadPhotoModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (updatedMember: CommitteeMemberData) => void
  initialMember?: CommitteeMemberData | null
  allMembers?: CommitteeMemberData[]
}

export function UploadPhotoModal({
  isOpen,
  onClose,
  onSuccess,
  initialMember,
  allMembers = [],
}: UploadPhotoModalProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string>(initialMember?.id || '')
  const [name, setName] = useState(initialMember?.name || '')
  const [designation, setDesignation] = useState(initialMember?.designation || '')
  const [linkedinUrl, setLinkedinUrl] = useState(initialMember?.linkedinUrl || '')
  const [instagramUrl, setInstagramUrl] = useState(initialMember?.instagramUrl || '')
  const [githubUrl, setGithubUrl] = useState(initialMember?.githubUrl || '')
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialMember?.photoUrl || null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialMember) {
      setSelectedMemberId(initialMember.id)
      setName(initialMember.name)
      setDesignation(initialMember.designation)
      setLinkedinUrl(initialMember.linkedinUrl || '')
      setInstagramUrl(initialMember.instagramUrl || '')
      setGithubUrl(initialMember.githubUrl || '')
      setPreviewUrl(initialMember.photoUrl || null)
      setSelectedFile(null)
      setErrorMsg(null)
      setSuccessMsg(null)
    } else if (allMembers.length > 0 && !selectedMemberId) {
      const first = allMembers[0]
      setSelectedMemberId(first.id)
      setName(first.name)
      setDesignation(first.designation)
      setLinkedinUrl(first.linkedinUrl || '')
      setInstagramUrl(first.instagramUrl || '')
      setGithubUrl(first.githubUrl || '')
      setPreviewUrl(first.photoUrl || null)
    }
  }, [initialMember, isOpen])

  const handleMemberChange = (id: string) => {
    setSelectedMemberId(id)
    const found = allMembers.find((m) => m.id === id)
    if (found) {
      setName(found.name)
      setDesignation(found.designation)
      setLinkedinUrl(found.linkedinUrl || '')
      setInstagramUrl(found.instagramUrl || '')
      setGithubUrl(found.githubUrl || '')
      setPreviewUrl(found.photoUrl || null)
      setSelectedFile(null)
      setErrorMsg(null)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null)
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMsg('Invalid file format. Please upload JPG, JPEG, PNG, or WEBP.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File size exceeds 5MB limit.')
      return
    }

    setSelectedFile(file)
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
  }

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsSubmitting(true)

    try {
      let finalPhotoUrl = previewUrl

      // 1. If a new file is chosen, upload it
      if (selectedFile) {
        const formData = new FormData()
        formData.append('file', selectedFile)
        if (selectedMemberId) {
          formData.append('memberId', selectedMemberId)
        }

        const uploadRes = await fetch('/api/committee/upload', {
          method: 'POST',
          body: formData,
        })
        if (uploadRes.status === 401) {
          throw new Error('Admin authentication required. Please log in to upload photographs.')
        }

        const uploadData = await uploadRes.json()

        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.error || 'Photo upload failed.')
        }

        finalPhotoUrl = uploadData.url
      }

      // 2. Save/update member details
      const memberRes = await fetch('/api/committee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedMemberId || undefined,
          name: name.trim(),
          designation: designation.trim(),
          photoUrl: finalPhotoUrl,
          linkedinUrl: linkedinUrl.trim() || null,
          instagramUrl: instagramUrl.trim() || null,
          githubUrl: githubUrl.trim() || null,
        }),
      })

      if (memberRes.status === 401) {
        throw new Error('Admin authentication required. Please log in to save member details.')
      }

      const memberData = await memberRes.json()
      if (!memberRes.ok || !memberData.success) {
        throw new Error(memberData.error || 'Failed to save member details.')
      }

      setSuccessMsg('Profile photo and details updated successfully!')
      onSuccess(memberData.member)

      setTimeout(() => {
        onClose()
      }, 1200)
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during submission.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">
              <i /> HACK 2027 COMMITTEE
            </span>
            <h2>{initialMember ? 'Update Profile Photo & Details' : 'Upload Member Photo'}</h2>
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

        <form onSubmit={handleSubmit} className="modal-form">
          {allMembers.length > 0 && (
            <div className="form-group">
              <label htmlFor="member-select">Select Committee Member</label>
              <select
                id="member-select"
                value={selectedMemberId}
                onChange={(e) => handleMemberChange(e.target.value)}
                className="form-input"
              >
                {allMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {m.designation}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Photo Preview & Upload Zone */}
          <div className="photo-upload-zone">
            <div className="photo-preview-wrapper">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="photo-preview-img"
                />
              ) : (
                <div className="photo-preview-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>No Photo</span>
                </div>
              )}
            </div>

            <div className="photo-upload-controls">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="button button-small"
              >
                {previewUrl ? 'Replace Photo' : 'Choose Photo'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <small className="file-hint">JPG, JPEG, PNG, WEBP (Max 5MB)</small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="member-name">Full Name *</label>
              <input
                id="member-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. ARSHATH ALI A"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="member-designation">Designation / Role *</label>
              <input
                id="member-designation"
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g. Chief Organizer & Event Director"
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="member-linkedin">LinkedIn Profile URL</label>
              <input
                id="member-linkedin"
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="member-instagram">Instagram Profile URL</label>
              <input
                id="member-instagram"
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/username"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="member-github">GitHub Profile URL (Optional)</label>
            <input
              id="member-github"
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username"
              className="form-input"
            />
          </div>

          {errorMsg && (
            <div className="form-error">
              <div>{errorMsg}</div>
              {errorMsg.includes('Admin authentication') && (
                <a
                  href="/admin/committee/login"
                  style={{
                    display: 'inline-block',
                    marginTop: '8px',
                    color: '#FFD600',
                    textDecoration: 'underline',
                    fontWeight: 600,
                  }}
                >
                  Go to Admin Login →
                </a>
              )}
            </div>
          )}
          {successMsg && <div className="form-success">{successMsg}</div>}

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="button button-ghost"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save & Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
