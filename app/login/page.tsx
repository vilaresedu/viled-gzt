'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

function LoginForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const from = searchParams.get('from') || '/categories'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      router.push(from)
    } else {
      const data = await res.json()
      setError(data.error || 'Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      {/* Header */}
      <Link href="/categories">
        <Image
          src="/gzt_log.png"
          alt="Vilares Edu Gazette"
          width={80}
          height={80}
          style={{ borderRadius: '12px', cursor: 'pointer', marginBottom: '2rem' }}
        />
      </Link>

      <h1 style={{
        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
        color: 'var(--white)',
        marginBottom: '2.5rem',
        fontFamily: 'Georgia, serif',
        letterSpacing: '0.05em',
        textAlign: 'center',
      }}>
        Login to view this category
      </h1>

      {/* Glass Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'rgba(102, 3, 60, 0.25)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(202, 209, 131, 0.3)',
        borderRadius: '24px',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}>
        {/* Username */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            color: 'rgba(202, 209, 131, 0.8)',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(202, 209, 131, 0.3)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              color: 'var(--white)',
              fontSize: '1rem',
              outline: 'none',
              fontFamily: 'Georgia, serif',
            }}
          />
        </div>

        {/* Password */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            color: 'rgba(202, 209, 131, 0.8)',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(202, 209, 131, 0.3)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              color: 'var(--white)',
              fontSize: '1rem',
              outline: 'none',
              fontFamily: 'Georgia, serif',
            }}
          />
        </div>

        {/* Error */}
        {error && (
          <p style={{
            color: '#ff6b8a',
            fontSize: '0.85rem',
            textAlign: 'center',
          }}>
            {error}
          </p>
        )}

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            background: loading
              ? 'rgba(202, 209, 131, 0.3)'
              : 'rgba(202, 209, 131, 0.85)',
            color: 'var(--plum-dark)',
            border: 'none',
            borderRadius: '10px',
            padding: '0.85rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.05em',
            transition: 'all 0.2s ease',
            marginTop: '0.5rem',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
