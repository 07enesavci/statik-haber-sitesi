'use client'

import Link from 'next/link'
import { NewsItem } from '@/lib/news'

interface NewsCardProps {
  news: NewsItem
}

export default function NewsCard({ news }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getFirstImage = () => {
    if (news.imageUrls && news.imageUrls.length > 0) {
      return news.imageUrls[0]
    }
    if (news.images && news.images.length > 0) {
      return `/uploads/${news.images[0]}`
    }
    if (news.imageUrl) {
      return news.imageUrl
    }
    if (news.image) {
      return `/uploads/${news.image}`
    }
    return null
  }

  const displayImage = getFirstImage()

  return (
    <Link href={`/haber/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        backgroundColor: 'var(--white)',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
      }}
      >
        {displayImage && (
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#e0e0e0'
          }}>
            <img
              src={displayImage}
              alt={news.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            {(news.isPinned || news.isFeatured) && (
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                {news.isPinned && (
                  <span style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    padding: 'clamp(4px, 1.5vw, 6px) clamp(8px, 3vw, 12px)',
                    borderRadius: '6px',
                    fontSize: 'clamp(10px, 3vw, 12px)',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    whiteSpace: 'nowrap'
                  }}>
                    📌 SABİT DUYURU
                  </span>
                )}
                {news.isFeatured && (
                  <span style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white',
                    padding: 'clamp(4px, 1.5vw, 6px) clamp(8px, 3vw, 12px)',
                    borderRadius: '6px',
                    fontSize: 'clamp(10px, 3vw, 12px)',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    whiteSpace: 'nowrap'
                  }}>
                    ⭐ ÖNE ÇIKAN
                  </span>
                )}
              </div>
            )}
          </div>
        )}
        <div style={{ padding: 'clamp(16px, 4vw, 24px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: 'var(--text-color)',
            lineHeight: '1.4'
          }}>
            {news.title}
          </h3>
          <p style={{
            color: 'var(--text-light)',
            fontSize: 'clamp(13px, 3.5vw, 14px)',
            lineHeight: '1.6',
            marginBottom: '16px',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {news.content}
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-color)',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <span style={{
              fontSize: 'clamp(11px, 3vw, 12px)',
              color: 'var(--text-light)'
            }}>
              {formatDate(news.createdAt)}
            </span>
            <span style={{
              fontSize: 'clamp(12px, 3.5vw, 14px)',
              color: 'var(--primary-color)',
              fontWeight: '500'
            }}>
              Devamını Oku →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
