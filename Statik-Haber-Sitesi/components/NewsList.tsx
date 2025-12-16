'use client'

import { useState } from 'react'
import NewsCard from './NewsCard'
import { NewsItem } from '@/lib/news'

interface NewsListProps {
  initialNews: NewsItem[]
  itemsPerPage?: number
}

export default function NewsList({ initialNews, itemsPerPage = 9 }: NewsListProps) {
  const [displayCount, setDisplayCount] = useState(itemsPerPage)
  const [isLoading, setIsLoading] = useState(false)

  const newsToShow = initialNews.slice(0, displayCount)
  const hasMore = displayCount < initialNews.length

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDisplayCount(prev => prev + itemsPerPage)
      setIsLoading(false)
    }, 300)
  }

  if (initialNews.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: 'var(--text-light)'
      }}>
        <p style={{ fontSize: '18px' }}>Henüz haber eklenmemiş.</p>
      </div>
    )
  }

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
        gap: 'clamp(20px, 4vw, 30px)'
      }}>
        {newsToShow.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>

      {hasMore && (
        <div style={{
          textAlign: 'center',
          marginTop: '50px'
        }}>
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            style={{
              background: isLoading 
                ? 'var(--text-light)' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: 'clamp(12px, 3vw, 16px) clamp(32px, 8vw, 48px)',
              fontSize: 'clamp(14px, 4vw, 16px)',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: isLoading 
                ? 'none' 
                : '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
              opacity: isLoading ? 0.7 : 1,
              width: '100%',
              maxWidth: '400px'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)'
              }
            }}
          >
            {isLoading ? 'Yükleniyor...' : 'Daha Fazla Yükle'}
          </button>
        </div>
      )}
    </>
  )
}

