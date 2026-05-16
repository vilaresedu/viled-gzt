import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <Link href="/categories" style={{ textDecoration: 'none' }}>
        <div style={{
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '2px solid rgba(202, 209, 131, 0.4)',
          borderRadius: '32px',
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.transform = 'scale(1.04)'
          el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.6)'
          el.style.borderColor = 'rgba(202, 209, 131, 0.8)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.transform = 'scale(1)'
          el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'
          el.style.borderColor = 'rgba(202, 209, 131, 0.4)'
        }}
        >
          <Image
            src="/gzt_log.png"
            alt="Vilares Edu Gazette"
            width={280}
            height={280}
            style={{ borderRadius: '16px' }}
            priority
          />
          <p style={{
            color: 'rgba(202, 209, 131, 0.7)',
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Click to enter
          </p>
        </div>
      </Link>
    </main>
  )
}
