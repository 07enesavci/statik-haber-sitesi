import Link from 'next/link'
import { getNews } from '@/lib/news'
import NewsCard from '@/components/NewsCard'
import NewsList from '@/components/NewsList'
import Header from '@/components/Header'

export default async function Home() {
  const allNews = await getNews()
  const pinnedNews = allNews.filter(item => item.isPinned)
  const featuredNews = allNews.filter(item => item.isFeatured && !item.isPinned)
  const regularNews = allNews.filter(item => !item.isPinned && !item.isFeatured)

  return (
    <div className="content-wrapper">
      <Header currentPage="home" />

      <main style={{ padding: 'clamp(20px, 5vw, 40px) 0', minHeight: 'calc(100vh - 200px)', position: 'relative', zIndex: 1 }}>
        <div className="container">
          {pinnedNews.length > 0 && (
            <div style={{ marginBottom: 'clamp(30px, 6vw, 50px)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: 'clamp(11px, 3vw, 14px)',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                  whiteSpace: 'nowrap'
                }}>
                  📌 DUYURU
                </span>
                <h2 className="gradient-text" style={{ 
                  fontSize: 'clamp(20px, 5vw, 28px)', 
                  margin: 0,
                  fontWeight: 'bold'
                }}>
                  Sabit Duyurular
                </h2>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(20px, 4vw, 30px)'
              }}>
                {pinnedNews.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </div>
          )}

          {featuredNews.length > 0 && (
            <div style={{ marginBottom: 'clamp(30px, 6vw, 50px)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: 'clamp(11px, 3vw, 14px)',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                  whiteSpace: 'nowrap'
                }}>
                  ⭐ ÖNE ÇIKAN
                </span>
                <h2 className="gradient-text" style={{ 
                  fontSize: 'clamp(20px, 5vw, 28px)', 
                  margin: 0,
                  fontWeight: 'bold'
                }}>
                  Öne Çıkanlar
                </h2>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(20px, 4vw, 30px)'
              }}>
                {featuredNews.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 'clamp(30px, 5vw, 40px)', textAlign: 'center' }}>
            <h2 className="gradient-text" style={{ fontSize: 'clamp(24px, 6vw, 36px)', marginBottom: '12px', fontWeight: 'bold' }}>
              {pinnedNews.length > 0 || featuredNews.length > 0 ? 'Tüm Haberler' : 'Haberler'}
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: 'clamp(14px, 4vw, 18px)' }}>
              Topluluğumuzdan en son haberler
            </p>
          </div>

          <NewsList initialNews={regularNews} itemsPerPage={9} />
        </div>
      </main>

      <footer style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        color: 'var(--white)',
        padding: 'clamp(30px, 5vw, 40px) 0',
        marginTop: 'clamp(40px, 8vw, 60px)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <p style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>&copy; 2025 ABÜ Bilgisayar Bilimleri Topluluğu. Tüm hakları saklıdır.</p>
          <div style={{
            marginTop: '12px',
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(12px, 3vw, 20px)',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/"
              style={{
                color: 'var(--white)',
                textDecoration: 'none',
                fontSize: 'clamp(12px, 3vw, 14px)',
                opacity: 0.8
              }}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/hakkimizda"
              style={{
                color: 'var(--white)',
                textDecoration: 'none',
                fontSize: 'clamp(12px, 3vw, 14px)',
                opacity: 0.8
              }}
            >
              Hakkımızda
            </Link>
          </div>
          <p style={{ marginTop: '8px', fontSize: 'clamp(11px, 3vw, 14px)', opacity: 0.8 }}>
            abu-bilgisayar-bilimleri.com
          </p>
        </div>
      </footer>
    </div>
  )
}
