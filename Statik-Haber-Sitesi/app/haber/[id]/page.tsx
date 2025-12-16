import { getNewsById, getNews } from '@/lib/news'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { convertToEmbedUrl } from '@/lib/video-utils'

export async function generateStaticParams() {
  const news = await getNews()
  return news.map(item => ({ id: item.id }))
}

export default async function NewsDetail({ params }: { params: { id: string } }) {
  const news = await getNewsById(params.id)

  if (!news) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Collect all images
  const allImages: string[] = []
  
  // Add images from arrays
  if (news.images && news.images.length > 0) {
    allImages.push(...news.images.map(img => `/uploads/${img}`))
  }
  if (news.imageUrls && news.imageUrls.length > 0) {
    allImages.push(...news.imageUrls)
  }
  
  // Add legacy single image for backward compatibility
  if (news.image && !allImages.includes(`/uploads/${news.image}`)) {
    allImages.unshift(`/uploads/${news.image}`)
  }
  if (news.imageUrl && !allImages.includes(news.imageUrl)) {
    allImages.unshift(news.imageUrl)
  }

  // Collect all videos
  const allVideos = news.videos || []

  return (
    <div className="content-wrapper">
      <Header currentPage="home" />

      {/* Main Content */}
      <main style={{ padding: 'clamp(20px, 5vw, 40px) 0', minHeight: 'calc(100vh - 200px)', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <Link 
            href="/" 
            style={{ 
              display: 'inline-block',
              marginBottom: 'clamp(16px, 4vw, 20px)',
              color: 'var(--primary-color)',
              textDecoration: 'none',
              fontSize: 'clamp(14px, 4vw, 16px)'
            }}
          >
            ← Ana Sayfaya Dön
          </Link>

          <article className="modern-card" style={{
            padding: 'clamp(24px, 6vw, 48px)'
          }}>
            <h1 className="gradient-text" style={{
              fontSize: 'clamp(24px, 6vw, 36px)',
              fontWeight: 'bold',
              marginBottom: '20px',
              lineHeight: '1.3'
            }}>
              {news.title}
            </h1>

            <div style={{
              marginBottom: '30px',
              paddingBottom: '20px',
              borderBottom: '2px solid var(--border-color)'
            }}>
              <span style={{
                fontSize: '14px',
                color: 'var(--text-light)'
              }}>
                {formatDate(news.createdAt)}
              </span>
            </div>

            {/* All Images */}
            {allImages.length > 0 && (
              <div style={{ 
                marginBottom: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                {allImages.map((imageSrc, index) => (
                  <div
                    key={index}
                    style={{
                      width: '100%',
                      maxWidth: 'clamp(280px, 65vw, 500px)',
                      margin: '0 auto',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
                    }}
                  >
                    <img
                      src={imageSrc}
                      alt={`${news.title} - Görsel ${index + 1}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block'
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div style={{
              fontSize: 'clamp(16px, 4vw, 18px)',
              lineHeight: '1.8',
              color: 'var(--text-color)',
              whiteSpace: 'pre-wrap',
              marginBottom: 'clamp(30px, 6vw, 40px)'
            }}>
              {news.fullContent.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < news.fullContent.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>

            {/* Videos */}
            {allVideos.length > 0 && (
              <div style={{
                marginTop: 'clamp(30px, 6vw, 40px)',
                paddingTop: 'clamp(30px, 6vw, 40px)',
                borderTop: '2px solid var(--border-color)'
              }}>
                <h2 className="gradient-text" style={{
                  fontSize: 'clamp(20px, 5vw, 24px)',
                  fontWeight: 'bold',
                  marginBottom: '24px'
                }}>
                  Videolar
                </h2>
                <div style={{
                  display: 'grid',
                  gap: '24px'
                }}>
                  {allVideos.map((videoUrl, index) => {
                    // Check if it's a local video file or external URL
                    const isLocalVideo = videoUrl.startsWith('/uploads/')
                    
                    if (isLocalVideo) {
                      // Use HTML5 video player for local files
                      return (
                        <div
                          key={index}
                          style={{
                            position: 'relative',
                            paddingBottom: '56.25%', // 16:9 aspect ratio
                            height: 0,
                            overflow: 'hidden',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            backgroundColor: '#000'
                          }}
                        >
                          <video
                            src={videoUrl}
                            controls
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain'
                            }}
                          >
                            Tarayıcınız video oynatmayı desteklemiyor.
                          </video>
                        </div>
                      )
                    } else {
                      // Use iframe for external URLs
                      const embedUrl = convertToEmbedUrl(videoUrl)
                      return (
                        <div
                          key={index}
                          style={{
                            position: 'relative',
                            paddingBottom: '56.25%', // 16:9 aspect ratio
                            height: 0,
                            overflow: 'hidden',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            backgroundColor: '#000'
                          }}
                        >
                          <iframe
                            src={embedUrl}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              border: 'none'
                            }}
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          />
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            )}

            {news.link && (
              <div style={{
                marginTop: '40px',
                padding: '24px',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                borderRadius: '12px',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                  }}
                >
                  İlgili Linke Git →
                </a>
              </div>
            )}
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        color: 'var(--white)',
        padding: '40px 0',
        marginTop: '60px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <p>&copy; 2025 ABÜ Bilgisayar Bilimleri Topluluğu. Tüm hakları saklıdır.</p>
          <p style={{ marginTop: '8px', fontSize: '14px', opacity: 0.8 }}>
            abu-bilgisayar-bilimleri.com
          </p>
        </div>
      </footer>
    </div>
  )
}
