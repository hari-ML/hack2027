'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/committee/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Authentication failed. Please verify credentials.')
        setLoading(false)
        return
      }

      // On successful login, redirect to homepage where owner editing mode will be active
      router.push('/#team')
      router.refresh()
    } catch {
      setError('Connection error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div
      className="admin-shell"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: '#040404',
      }}
    >
      <div
        className="admin-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'linear-gradient(165deg, rgba(14, 14, 18, 0.98) 0%, rgba(6, 6, 8, 0.99) 100%)',
          border: '1.5px solid rgba(255, 214, 0, 0.45)',
          borderRadius: '16px',
          padding: '36px 32px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.85), 0 0 32px rgba(255, 214, 0, 0.12)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: '#FFD600',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '8px',
            }}
          >
            HACK 2027 // CONTROL PANEL
          </span>
          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '20px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              margin: '0 0 8px 0',
            }}
          >
            ADMIN LOGIN
          </h1>
          <p
            style={{
              color: '#888',
              fontSize: '12px',
              margin: 0,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Restricted Access · Website Owner Authentication
          </p>
        </div>

        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '8px',
              padding: '12px 14px',
              color: '#f87171',
              fontSize: '12px',
              marginBottom: '20px',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 600,
                color: '#aaa',
                letterSpacing: '0.08em',
                marginBottom: '6px',
                fontFamily: "'Space Grotesk', sans-serif",
                textTransform: 'uppercase',
              }}
            >
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="form-input"
              style={{
                width: '100%',
                padding: '12px 14px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 600,
                color: '#aaa',
                letterSpacing: '0.08em',
                marginBottom: '6px',
                fontFamily: "'Space Grotesk', sans-serif",
                textTransform: 'uppercase',
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="form-input"
              style={{
                width: '100%',
                padding: '12px 14px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '10px',
              padding: '13px 20px',
              background: '#FFD600',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 18px rgba(255, 214, 0, 0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE & ACCESS →'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              color: '#666',
              fontSize: '12px',
              textDecoration: 'none',
              fontFamily: "'Space Grotesk', sans-serif",
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#FFD600')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#666')}
          >
            ← Back to HACK 2027 Website
          </Link>
        </div>
      </div>
    </div>
  )
}
