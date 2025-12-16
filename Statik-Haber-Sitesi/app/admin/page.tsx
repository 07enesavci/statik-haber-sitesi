import Link from 'next/link'
import { getNews } from '@/lib/news'
import AdminNewsList from '@/components/AdminNewsList'
import AdminDashboardHeader from '@/components/AdminDashboardHeader'

export default async function AdminDashboard() {
  const news = await getNews()

  return (
    <div className="content-wrapper" style={{ minHeight: '100vh' }}>
      <AdminDashboardHeader />

      {/* Main Content */}
      <main style={{ padding: 'clamp(20px, 5vw, 40px) 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          {/* İletişim Bilgileri Kutusu */}
          <div className="modern-card" style={{
            padding: 'clamp(20px, 5vw, 28px)',
            marginBottom: 'clamp(20px, 4vw, 30px)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                <h3 className="gradient-text" style={{
                  fontSize: 'clamp(18px, 5vw, 22px)',
                  fontWeight: 'bold',
                  marginBottom: '8px'
                }}>
                  İletişim Bilgileri
                </h3>
                <p style={{
                  color: 'var(--text-light)',
                  fontSize: 'clamp(12px, 3.5vw, 14px)'
                }}>
                  Hakkımızda sayfası için iletişim bilgilerini düzenleyin
                </p>
              </div>
              <Link
                href="/admin/iletisim"
                className="btn"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'var(--white)',
                  textDecoration: 'none',
                  display: 'inline-block',
                  border: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                Düzenle
              </Link>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'clamp(20px, 4vw, 30px)',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <h2 className="gradient-text" style={{ fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 'bold' }}>
              Haberler
            </h2>
            <Link 
              href="/admin/haber/ekle" 
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                whiteSpace: 'nowrap'
              }}
            >
              + Yeni Haber Ekle
            </Link>
          </div>

          <AdminNewsList initialNews={news} />
        </div>
      </main>
    </div>
  )
}
