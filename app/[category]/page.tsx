import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import categoriesData from '@/data/categories.json'
import { readCategoryData } from '@/lib/data'

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const category = categoriesData.find(c => c.id === params.category)

  if (!category || category.exec) notFound()

  const issues = await readCategoryData(params.category)

  return (
    <main style={{ minHeight: '100vh', padding: '2rem' }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '3rem',
      }}>
        <Link href="/categories">
          <Image
            src="/gzt_log.png"
            alt="Vilares Edu Gazette"
            width={72}
            height={72}
            style={{ borderRadius: '12px', cursor: 'pointer' }}
          />
        </Link>
        <div style={{
          width: '1px',
          height: '48px',
          background: 'rgba(202, 209, 131, 0.4)',
        }} />
        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          color: 'var(--white)',
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.05em',
        }}>
          {category.label}
        </h1>
      </header>

      {/* Issues Grid */}
      {issues.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '40vh',
          gap: '1rem',
        }}>
          <p style={{
            color: 'rgba(202, 209, 131, 0.5)',
            fontSize: '1.1rem',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.05em',
          }}>
            No issues published yet.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {issues.map((issue: any) => (
            <Link
              key={issue.id}
              href={`/${params.category}/${issue.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                width: '200px',
                background: 'rgba(102, 3, 60, 0.35)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(202, 209, 131, 0.3)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-6px)'
                el.style.boxShadow = '0 12px 36px rgba(0,0,0,0.5)'
                el.style.borderColor = 'rgba(202, 209, 131, 0.7)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
                el.style.borderColor = 'rgba(202, 209, 131, 0.3)'
              }}
              >
                {/* Top: Issue Number */}
                <div style={{
                  padding: '0.75rem 1rem 0.5rem',
                  borderBottom: '1px solid rgba(202, 209, 131, 0.2)',
                }}>
                  <p style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.25rem',
                  }}>
                    {category.label} No.
                  </p>
                  <p style={{
                    color: 'var(--white)',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    fontFamily: 'Georgia, serif',
                  }}>
                    {issue.id}
                  </p>
                </div>

                {/* Middle: Title */}
                <div style={{
                  padding: '0.75rem 1rem',
                  minHeight: '80px',
                  background: 'linear-gradient(180deg, rgba(202,209,131,0.08) 0%, rgba(202,209,131,0.18) 100%)',
                }}>
                  <p style={{
                    color: 'var(--gold)',
                    fontSize: '0.9rem',
                    fontFamily: 'Georgia, serif',
                    lineHeight: '1.4',
                  }}>
                    {issue.title}
                  </p>
                </div>

                {/* Bottom: Date */}
                <div style={{ padding: '0.5rem 1rem 0.75rem' }}>
                  <p style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.05em',
                  }}>
                    Issued date: {issue.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
