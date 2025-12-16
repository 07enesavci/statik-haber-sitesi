'use client'

import AdminLinkButton from './AdminLinkButton'
import LogoutButton from './LogoutButton'

export default function AdminDashboardHeader() {
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
              Admin Paneli
            </h1>
            <p style={{ marginTop: '4px', fontSize: '14px', opacity: 0.9 }}>
              ABÜ Bilgisayar Bilimleri Topluluğu
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <AdminLinkButton href="/" target="_blank">
              Siteyi Görüntüle
            </AdminLinkButton>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  )
}

