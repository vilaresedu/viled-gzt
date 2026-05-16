import Link from 'next/link'
import Image from 'next/image'
import categoriesData from '@/data/categories.json'

export default function CategoriesPage() {
  return (
    <main style={{
      minHeight: '100vh',
      padding: '2rem',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3rem',
      }}>
        <Link href="/categories">
          <Image
            src="/gzt_log.png"
            alt="Vilares Edu Gazette"
            width={80}
            height={80}
            style={{ borderRadius: '12px', cursor: 'pointer' }}
          />
        </Link>
      </header>

      {/* Title */}
      <h1 style={{
        textAlign: 'center',
        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
        color: 'var(--white)',
        marginBottom: '0.5rem',
        fontFamily: 'Georgia, serif',
        letterSpacing: '0.05em',
      }}>
        Choose a category to view
      </h1>
      <p style={{
        textAlign: 'center',
        color: 'rgba(202, 209, 131, 0.6)',
        fontSize: '0.85rem',
        marginBottom: '4rem',
        letterSpacing: '0.1em',
      }}>
        ★ marked categories require executive access
      </p>

      {/* Category Cards */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {categoriesData.map((cat) => (
          <Link
            key={cat.id}
            href={cat.exec ? `/login?from=/exec/${cat.id}` : `/${cat.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              width: '160px',
              height: '240px',
              background: 'rgba(102, 3, 60, 0.45)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2px solid rgba(202, 209, 131, 0.35)',
              borderRadius: '24px 24px 8px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem 1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.transform = 'translateY(-8px)'
              el.style.boxShadow = '0 16px 40px rgba(0,0,0,0.5)'
              el.style.borderColor = 'rgba(202, 209, 131, 0.8)'
              el.style.background = 'rgba(102, 3, 60, 0.7)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
              el.style.borderColor = 'rgba(202, 209, 131, 0.35)'
              el.style.background = 'rgba(102, 3, 60, 0.45)'
            }}
            >
              {cat.exec && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  color: 'var(--gold)',
                  fontSize: '1rem',
                }}>★</span>
              )}
              <p style={{
                color: 'var(--gold)',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.05em',
              }}>
                {cat.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
