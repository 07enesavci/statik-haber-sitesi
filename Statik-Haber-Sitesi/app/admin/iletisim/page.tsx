'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminHeader from '@/components/AdminHeader'

export default function EditContact() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    danisman: '',
    baskan: '',
    socialMedia: {
      website: '',
      instagram: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      telegram: '',
      whatsapp: ''
    }
  })

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('/api/contact')
      if (response.ok) {
        const data = await response.json()
        setFormData({
          title: data.title || '',
          description: data.description || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          danisman: data.danisman || '',
          baskan: data.baskan || '',
          socialMedia: {
            website: data.socialMedia?.website || '',
            instagram: data.socialMedia?.instagram || '',
            twitter: data.socialMedia?.twitter || '',
            facebook: data.socialMedia?.facebook || '',
            linkedin: data.socialMedia?.linkedin || '',
            telegram: data.socialMedia?.telegram || '',
            whatsapp: data.socialMedia?.whatsapp || ''
          }
        })
      }
    } catch (err) {
      setError('Bilgiler yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '') as keyof typeof formData.socialMedia
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSaving(true)

    try {
      const cleanedSocialMedia: any = {}
      Object.entries(formData.socialMedia).forEach(([key, value]) => {
        if (value && value.trim()) {
          cleanedSocialMedia[key] = value.trim()
        }
      })

      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          socialMedia: cleanedSocialMedia
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Bilgiler güncellenirken bir hata oluştu')
      }
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-color)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: 'var(--text-light)' }}>
            Yükleniyor...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="content-wrapper" style={{ minHeight: '100vh' }}>
      <AdminHeader 
        title="İletişim Bilgileri Düzenle"
        subtitle="Hakkımızda sayfası için"
        backUrl="/admin"
      />

          {/* Main Content */}
          <main style={{ padding: 'clamp(20px, 5vw, 40px) 0', position: 'relative', zIndex: 1 }}>
            <div className="container" style={{ maxWidth: '800px' }}>
              <div className="modern-card" style={{
                padding: 'clamp(24px, 6vw, 48px)'
              }}>
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

            {success && (
              <div style={{
                backgroundColor: '#e8f5e9',
                color: 'var(--success-color)',
                padding: '12px',
                borderRadius: '4px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                İletişim bilgileri başarıyla güncellendi!
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Başlık *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  disabled={saving}
                  placeholder="Örn: ABÜ Bilgisayar Bilimleri Topluluğu"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Açıklama (Hakkımızda) *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  disabled={saving}
                  rows={8}
                  placeholder="Topluluk hakkında açıklama yazın..."
                  style={{ fontFamily: 'inherit' }}
                />
              </div>

              <h3 className="gradient-text" style={{
                fontSize: '22px',
                fontWeight: 'bold',
                marginTop: '30px',
                marginBottom: '20px'
              }}>
                Yönetim
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div className="form-group">
                  <label htmlFor="danisman">Danışman</label>
                  <input
                    type="text"
                    id="danisman"
                    name="danisman"
                    value={formData.danisman}
                    onChange={handleInputChange}
                    disabled={saving}
                    placeholder="Örn: Prof. Dr. Ahmet Yılmaz"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="baskan">Başkan</label>
                  <input
                    type="text"
                    id="baskan"
                    name="baskan"
                    value={formData.baskan}
                    onChange={handleInputChange}
                    disabled={saving}
                    placeholder="Örn: Mehmet Demir"
                  />
                </div>
              </div>

              <h3 className="gradient-text" style={{
                fontSize: '22px',
                fontWeight: 'bold',
                marginTop: '30px',
                marginBottom: '20px'
              }}>
                İletişim Bilgileri
              </h3>

              <div className="form-group">
                <label htmlFor="email">E-posta *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={saving}
                  placeholder="info@aeusiyasetbilimi.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={saving}
                  placeholder="+90 555 123 45 67"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Adres</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={saving}
                  rows={3}
                  placeholder="Anadolu Bilim Üniversitesi, Merkez"
                  style={{ fontFamily: 'inherit' }}
                />
              </div>

              <h3 className="gradient-text" style={{
                fontSize: '22px',
                fontWeight: 'bold',
                marginTop: '30px',
                marginBottom: '20px'
              }}>
                Sosyal Medya (Opsiyonel)
              </h3>

              <div className="form-group">
                <label htmlFor="social_website">Website URL</label>
                <input
                  type="url"
                  id="social_website"
                  name="social_website"
                  value={formData.socialMedia.website}
                  onChange={handleInputChange}
                  disabled={saving}
                  placeholder="https://www.example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="social_instagram">Instagram URL</label>
                <input
                  type="url"
                  id="social_instagram"
                  name="social_instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleInputChange}
                  disabled={saving}
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="social_twitter">Twitter URL</label>
                <input
                  type="url"
                  id="social_twitter"
                  name="social_twitter"
                  value={formData.socialMedia.twitter}
                  onChange={handleInputChange}
                  disabled={saving}
                  placeholder="https://twitter.com/..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="social_facebook">Facebook URL</label>
                <input
                  type="url"
                  id="social_facebook"
                  name="social_facebook"
                  value={formData.socialMedia.facebook}
                  onChange={handleInputChange}
                  disabled={saving}
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="social_linkedin">LinkedIn URL</label>
                <input
                  type="url"
                  id="social_linkedin"
                  name="social_linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={handleInputChange}
                  disabled={saving}
                  placeholder="https://linkedin.com/..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="social_telegram">Telegram Grup Linki</label>
                <input
                  type="url"
                  id="social_telegram"
                  name="social_telegram"
                  value={formData.socialMedia.telegram}
                  onChange={handleInputChange}
                  disabled={saving}
                  placeholder="https://t.me/..."
                />
                <small style={{ color: 'var(--text-light)', fontSize: '12px', display: 'block', marginTop: '4px' }}>
                  Telegram grup veya kanal linkini ekleyin
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="social_whatsapp">WhatsApp Grup Linki</label>
                <input
                  type="url"
                  id="social_whatsapp"
                  name="social_whatsapp"
                  value={formData.socialMedia.whatsapp}
                  onChange={handleInputChange}
                  disabled={saving}
                  placeholder="https://chat.whatsapp.com/..."
                />
                <small style={{ color: 'var(--text-light)', fontSize: '12px', display: 'block', marginTop: '4px' }}>
                  WhatsApp grup linkini ekleyin
                </small>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '30px'
              }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                  style={{
                    background: saving ? 'var(--text-light)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: saving ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </button>
                <Link
                  href="/admin"
                  className="btn"
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                >
                  İptal
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
