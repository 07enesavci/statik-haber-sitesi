'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface NewsItem {
  id: string
  title: string
  content: string
  fullContent: string
  image?: string
  imageUrl?: string
  link?: string
  createdAt: string
  updatedAt: string
}

interface AdminNewsListProps {
  initialNews: NewsItem[]
}

export default function AdminNewsList({ initialNews }: AdminNewsListProps) {
  const router = useRouter()
  const [news, setNews] = useState(initialNews)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Bu haberi silmek istediğinize emin misiniz?')) {
      return
    }

    setDeletingId(id)

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setNews(news.filter(item => item.id !== id))
      } else {
        alert('Haber silinirken bir hata oluştu')
      }
    } catch (error) {
      alert('Haber silinirken bir hata oluştu')
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (news.length === 0) {
    return (
      <div className="modern-card" style={{
        padding: '60px 20px',
        textAlign: 'center',
        color: 'var(--text-light)'
      }}>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>
          Henüz haber eklenmemiş.
        </p>
        <Link 
          href="/admin/haber/ekle" 
          className="btn btn-primary"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
          }}
        >
          İlk Haberi Ekleyin
        </Link>
      </div>
    )
  }

  return (
    <div className="modern-card" style={{
      overflow: 'hidden'
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse'
      }}>
        <thead>
          <tr style={{
            backgroundColor: 'var(--bg-color)',
            borderBottom: '2px solid var(--border-color)'
          }}>
            <th style={{
              padding: '16px',
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '14px',
              color: 'var(--text-color)'
            }}>
              Başlık
            </th>
            <th style={{
              padding: '16px',
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '14px',
              color: 'var(--text-color)'
            }}>
              Tarih
            </th>
            <th style={{
              padding: '16px',
              textAlign: 'right',
              fontWeight: '600',
              fontSize: '14px',
              color: 'var(--text-color)'
            }}>
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody>
          {news.map((item, index) => (
            <tr
              key={item.id}
              style={{
                borderBottom: index < news.length - 1 ? '1px solid var(--border-color)' : 'none',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-color)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <td style={{ padding: '16px' }}>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                  {item.title}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: 'var(--text-light)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.content}
                </div>
              </td>
              <td style={{
                padding: '16px',
                fontSize: '14px',
                color: 'var(--text-light)'
              }}>
                {formatDate(item.createdAt)}
              </td>
              <td style={{
                padding: '16px',
                textAlign: 'right'
              }}>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <Link
                    href={`/haber/${item.id}`}
                    target="_blank"
                    style={{
                      padding: '6px 12px',
                      fontSize: '13px',
                      backgroundColor: 'var(--bg-color)',
                      color: 'var(--text-color)',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}
                  >
                    Görüntüle
                  </Link>
                  <Link
                    href={`/admin/haber/duzenle/${item.id}`}
                    style={{
                      padding: '6px 12px',
                      fontSize: '13px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'var(--white)',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      display: 'inline-block',
                      border: 'none',
                      fontWeight: '500'
                    }}
                  >
                    Düzenle
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    style={{
                      padding: '6px 12px',
                      fontSize: '13px',
                      backgroundColor: deletingId === item.id ? 'var(--text-light)' : 'var(--error-color)',
                      color: 'var(--white)',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: deletingId === item.id ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {deletingId === item.id ? 'Siliniyor...' : 'Sil'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
