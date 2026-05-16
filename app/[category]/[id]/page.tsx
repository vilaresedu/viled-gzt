'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export default function IssuePage() {
  const params = useParams()
  const [issue, setIssue] = useState<any>(null)
  const [category, setCategory] = useState<any>(null)
  const [scrolled, setScrolled] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function loadIssue() {
      const catRes = await fetch('/api/category/' + params.category)
      const catData = await catRes.json()
      setCategory(catData.category)

      const issueRes = await fetch(`/api/issue/${params.category}/${params.id}`)
      if (!issueRes.ok) { setNotFound(true); return }
      const issueData = await issueRes.json()
      setIssue(issueData)
    }
    loadIssue()
  }, [params])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (notFound) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--gold)', fontFamily: 'Georgia, serif', fontSize: '1.2rem' }}>Issue not found.</p>
    </main>
  )

  if (!issue) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'rgba(202,209,131,0.5)', fontFamily: 'Georgia, serif' }}>Loading...</p>
    </main>
  )

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px' }}>
      {/* Morphing sticky nav */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '0.75rem 2rem' : '1.5rem 2rem',
        background: scrolled ? 'rgba(61, 2, 36, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(202, 209, 131, 0.2)' : 'none',
        transition: 'all 0.4s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/categories">
            <Image
              src="/gzt_log.png"
              alt="Vilares Edu Gazette"
              width={scrolled ? 48 : 64}
              height={scrolled ? 48 : 64}
              style={{ borderRadius: '10px', cursor: 'pointer', transition: 'all 0.4s ease' }}
            />
          </Link>
          {scrolled && (
            <div>
              <p style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                {category?.label}
              </p>
              <p style={{
                color: 'var(--white)',
                fontSize: '0.95rem',
                fontFamily: 'Georgia, serif',
                fontWeight: 'bold',
              }}>
                {issue.id} — {issue.title}
              </p>
            </div>
          )}
        </div>

        {scrolled && (
          
            href={issue.pdf}
            download
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(202, 209, 131, 0.15)',
              border: '1px solid rgba(202, 209, 131, 0.4)',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              color: 'var(--gold)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontFamily: 'Georgia, serif',
              transition: 'all 0.2s ease',
            }}
          >
            ↓ Download this issue
          </a>
        )}
      </header>

      {/* Issue Info */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 2rem 2rem',
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem' }}>
            <span style={{
              color: 'var(--white)',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              fontFamily: 'Georgia, serif',
            }}>
              {issue.id}
            </span>
            <span style={{
              color: 'var(--gold)',
              fontSize: '1.3rem',
              fontFamily: 'Georgia, serif',
            }}>
              {issue.title}
            </span>
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.85rem',
            letterSpacing: '0.05em',
          }}>
            Issued date: {issue.date}
          </p>

          {/* Download button (visible before scroll) */}
          
            href={issue.pdf}
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
              background: 'rgba(202, 209, 131, 0.12)',
              border: '1px solid rgba(202, 209, 131, 0.35)',
              borderRadius: '8px',
              padding: '0.5rem 1.25rem',
              color: 'var(--gold)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontFamily: 'Georgia, serif',
            }}
          >
            ↓ Download this issue
          </a>
        </div>

        {/* PDF Viewer */}
        <div style={{
          border: '1px solid rgba(202, 209, 131, 0.25)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          <iframe
            src={issue.pdf}
            width="100%"
            height="800px"
            style={{ display: 'block', border: 'none' }}
          />
        </div>
      </div>
    </main>
  )
}
