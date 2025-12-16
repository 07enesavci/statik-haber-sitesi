'use client'

import Link from 'next/link'

interface AdminHeaderProps {
  title: string
  subtitle?: string
  backUrl?: string
  backText?: string
}

export default function AdminHeader({ title, subtitle = 'ABÜ Bilgisayar Bilimleri Topluluğu', backUrl, backText = '← Geri Dön' }: AdminHeaderProps) {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'var(--white)',
      padding: '16px 0',
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ marginTop: '4px', fontSize: '14px', opacity: 0.9 }}>
                {subtitle}
              </p>
            )}
          </div>
          {backUrl && (
            <Link
              href={backUrl}
              style={{
                color: 'var(--white)',
                textDecoration: 'none',
                fontSize: '14px',
                padding: '8px 16px',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {backText}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

