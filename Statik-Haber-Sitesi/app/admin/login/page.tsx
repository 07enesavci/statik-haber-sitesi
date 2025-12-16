'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error || 'Giriş başarısız')
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="content-wrapper" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="modern-card" style={{
        padding: 'clamp(24px, 6vw, 48px)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <h1 className="gradient-text" style={{
          fontSize: 'clamp(24px, 6vw, 32px)',
          fontWeight: 'bold',
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          Admin Girişi
        </h1>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-light)',
          marginBottom: 'clamp(24px, 5vw, 30px)',
          fontSize: 'clamp(12px, 3.5vw, 14px)'
        }}>
          ABÜ Bilgisayar Bilimleri Topluluğu
        </p>

        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            color: 'var(--error-color)',
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ 
              width: '100%', 
              marginTop: '10px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderRadius: '12px',
          fontSize: '12px',
          color: 'var(--primary-color)',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <strong>Varsayılan Giriş Bilgileri:</strong><br />
          Kullanıcı Adı: <strong>admin</strong><br />
          Şifre: <strong>admin123</strong><br />
          <small>(İlk girişten sonra şifrenizi değiştirmeniz önerilir)</small>
        </div>
      </div>
    </div>
  )
}
