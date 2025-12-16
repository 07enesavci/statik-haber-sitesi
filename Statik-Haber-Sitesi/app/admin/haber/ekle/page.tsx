'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminHeader from '@/components/AdminHeader'

interface MediaItem {
  type: 'image' | 'video'
  file?: File
  url?: string
  preview?: string
}

export default function AddNews() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    fullContent: '',
    imageUrl: '',
    link: '',
    isPinned: false,
    isFeatured: false
  })
  const [images, setImages] = useState<MediaItem[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([''])
  const [videoFiles, setVideoFiles] = useState<MediaItem[]>([])
  const [videoUrls, setVideoUrls] = useState<string[]>([''])
  const [uploadingMedia, setUploadingMedia] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleMultipleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newImages: MediaItem[] = files.map(file => {
      const preview = URL.createObjectURL(file)
      return {
        type: 'image',
        file,
        preview
      }
    })
    setImages(prev => [...prev, ...newImages])
  }

  const handleVideoFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newVideos: MediaItem[] = files.map(file => {
      const preview = URL.createObjectURL(file)
      return {
        type: 'video',
        file,
        preview
      }
    })
    setVideoFiles(prev => [...prev, ...newVideos])
  }

  const handleVideoUrlChange = (index: number, value: string) => {
    const newVideos = [...videoUrls]
    newVideos[index] = value
    setVideoUrls(newVideos)
  }

  const addVideoUrl = () => {
    setVideoUrls([...videoUrls, ''])
  }

  const removeVideoUrl = (index: number) => {
    setVideoUrls(videoUrls.filter((_, i) => i !== index))
  }

  const removeVideoFile = (index: number) => {
    if (videoFiles[index].preview) {
      URL.revokeObjectURL(videoFiles[index].preview!)
    }
    setVideoFiles(videoFiles.filter((_, i) => i !== index))
  }

  const removeImage = (index: number) => {
    if (images[index].preview) {
      URL.revokeObjectURL(images[index].preview!)
    }
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setUploadingMedia(true)

    try {
      const uploadedImages: string[] = []
      const uploadedImageUrls: string[] = []

      // Upload multiple images
      const imageFiles = images.filter(img => img.file).map(img => img.file!)
      const urlImages = images.filter(img => img.url && img.url.trim()).map(img => img.url!)

      if (imageFiles.length > 0) {
        const formDataUpload = new FormData()
        imageFiles.forEach(file => {
          formDataUpload.append('files', file)
        })

        const uploadResponse = await fetch('/api/upload/multiple', {
          method: 'POST',
          body: formDataUpload
        })

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          uploadedImages.push(...uploadData.files.filter((f: any) => f.type === 'image').map((f: any) => f.filename))
        } else {
          throw new Error('Görseller yüklenirken bir hata oluştu')
        }
      }

      // Add URL images
      const validImageUrls = imageUrls.filter(url => url.trim() !== '')
      uploadedImageUrls.push(...urlImages, ...validImageUrls)

      // Upload video files
      const uploadedVideoFiles: string[] = []
      const videoFilesToUpload = videoFiles.filter(vid => vid.file).map(vid => vid.file!)
      
      if (videoFilesToUpload.length > 0) {
        const formDataVideo = new FormData()
        videoFilesToUpload.forEach(file => {
          formDataVideo.append('files', file)
        })

        const uploadVideoResponse = await fetch('/api/upload/multiple', {
          method: 'POST',
          body: formDataVideo
        })

        if (uploadVideoResponse.ok) {
          const uploadVideoData = await uploadVideoResponse.json()
          uploadedVideoFiles.push(...uploadVideoData.files.filter((f: any) => f.type === 'video').map((f: any) => `/uploads/${f.filename}`))
        } else {
          throw new Error('Videolar yüklenirken bir hata oluştu')
        }
      }

      // Filter empty video URLs
      const validVideoUrls = videoUrls.filter(v => v.trim() !== '')
      
      // Combine video files and URLs
      const allVideos = [...uploadedVideoFiles, ...validVideoUrls]

      // Get first image for main image (backward compatibility)
      const firstImage = uploadedImages.length > 0
        ? `/uploads/${uploadedImages[0]}`
        : uploadedImageUrls.length > 0
        ? uploadedImageUrls[0]
        : undefined

      // Create news
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: uploadedImages[0] || undefined,
          imageUrl: uploadedImageUrls[0] || undefined,
          images: uploadedImages.length > 0 ? uploadedImages : undefined,
          imageUrls: uploadedImageUrls.length > 0 ? uploadedImageUrls : undefined,
          videos: allVideos.length > 0 ? allVideos : undefined,
          isPinned: formData.isPinned || undefined,
          isFeatured: formData.isFeatured || undefined
        }),
      })

      if (response.ok) {
        router.push('/admin')
      } else {
        const data = await response.json()
        setError(data.error || 'Haber eklenirken bir hata oluştu')
      }
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
      setUploadingMedia(false)
    }
  }

  return (
    <div className="content-wrapper" style={{ minHeight: '100vh' }}>
      <AdminHeader 
        title="Yeni Haber Ekle" 
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

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Haber Başlığı *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  placeholder="Haber başlığını girin"
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Haber Özeti *</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={4}
                  placeholder="Haber özetini girin (ana sayfada görünecek)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="fullContent">Haber İçeriği (Tam Metin) *</label>
                <textarea
                  id="fullContent"
                  name="fullContent"
                  value={formData.fullContent}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={12}
                  placeholder="Haberin tam içeriğini girin"
                  style={{ fontFamily: 'inherit' }}
                />
              </div>

              {/* Çoklu Görsel Yükleme */}
              <div className="form-group">
                <label>Görseller (Ana sayfada ilk görsel gösterilir)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultipleImagesChange}
                  disabled={loading || uploadingMedia}
                  style={{ marginBottom: '12px' }}
                />
                <small style={{ color: 'var(--text-light)', fontSize: '12px', display: 'block', marginBottom: '12px' }}>
                  Birden fazla görsel seçebilirsiniz. Ana sayfada ilk görsel gösterilecektir.
                </small>

                {/* Eklenen görselleri göster */}
                {images.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '12px',
                    marginTop: '16px'
                  }}>
                    {images.map((img, index) => (
                      <div key={index} style={{
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '2px solid var(--border-color)',
                        aspectRatio: '1'
                      }}>
                        <img
                          src={img.preview || img.url}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        {index === 0 && (
                          <div style={{
                            position: 'absolute',
                            top: '4px',
                            left: '4px',
                            backgroundColor: 'rgba(102, 126, 234, 0.9)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 'bold'
                          }}>
                            ANA GÖRSEL
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            backgroundColor: 'var(--error-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            lineHeight: '1'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Görsel URL'leri */}
              <div className="form-group">
                <label>Görsel URL'leri (Opsiyonel)</label>
                {imageUrls.map((url, index) => (
                  <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={url}
                      onChange={(e) => {
                        const newUrls = [...imageUrls]
                        newUrls[index] = e.target.value
                        setImageUrls(newUrls)
                      }}
                      disabled={loading}
                      style={{ flex: 1 }}
                    />
                    {imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setImageUrls(imageUrls.filter((_, i) => i !== index))}
                        style={{
                          backgroundColor: 'var(--error-color)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '8px 16px',
                          cursor: 'pointer'
                        }}
                      >
                        Kaldır
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setImageUrls([...imageUrls, ''])}
                  disabled={loading}
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginTop: '8px'
                  }}
                >
                  + Görsel URL Ekle
                </button>
              </div>

              {/* Video Dosyaları */}
              <div className="form-group">
                <label>Video Dosyaları (Opsiyonel)</label>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoFilesChange}
                  disabled={loading || uploadingMedia}
                  style={{ marginBottom: '12px' }}
                />
                <small style={{ color: 'var(--text-light)', fontSize: '12px', display: 'block', marginBottom: '12px' }}>
                  Birden fazla video dosyası seçebilirsiniz (Max: 50MB)
                </small>

                {/* Eklenen video dosyalarını göster */}
                {videoFiles.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '12px',
                    marginTop: '16px'
                  }}>
                    {videoFiles.map((video, index) => (
                      <div key={index} style={{
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '2px solid var(--border-color)',
                        backgroundColor: '#000'
                      }}>
                        <video
                          src={video.preview}
                          style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '150px',
                            display: 'block'
                          }}
                          controls
                          muted
                        />
                        <button
                          type="button"
                          onClick={() => removeVideoFile(index)}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            backgroundColor: 'var(--error-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            lineHeight: '1'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video URL'leri */}
              <div className="form-group">
                <label>Video URL'leri (YouTube, Vimeo vb.) (Opsiyonel)</label>
                {videoUrls.map((video, index) => (
                  <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="url"
                      placeholder="https://youtube.com/watch?v=... veya video URL'i"
                      value={video}
                      onChange={(e) => handleVideoUrlChange(index, e.target.value)}
                      disabled={loading}
                      style={{ flex: 1 }}
                    />
                    {videoUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVideoUrl(index)}
                        style={{
                          backgroundColor: 'var(--error-color)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '8px 16px',
                          cursor: 'pointer'
                        }}
                      >
                        Kaldır
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVideoUrl}
                  disabled={loading}
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginTop: '8px'
                  }}
                >
                  + Video URL Ekle
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="link">İlgili Link (Opsiyonel)</label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="https://example.com"
                />
              </div>

              {/* Özel Ayarlar */}
              <div style={{
                marginTop: '30px',
                padding: '24px',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                borderRadius: '12px',
                border: '1px solid rgba(102, 126, 234, 0.1)'
              }}>
                <h3 className="gradient-text" style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '16px'
                }}>
                  Özel Ayarlar
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.isPinned}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
                      disabled={loading}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        accentColor: 'var(--primary-color)'
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-color)' }}>
                        📌 Sabit Duyuru Olarak İşaretle
                      </div>
                      <small style={{ color: 'var(--text-light)', fontSize: '12px' }}>
                        Bu haber ana sayfanın en üstünde sabit duyuru olarak gösterilecektir
                      </small>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      disabled={loading}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        accentColor: 'var(--primary-color)'
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-color)' }}>
                        ⭐ Öne Çıkan Haber Olarak İşaretle
                      </div>
                      <small style={{ color: 'var(--text-light)', fontSize: '12px' }}>
                        Bu haber öne çıkanlar bölümünde gösterilecektir
                      </small>
                    </div>
                  </label>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '30px'
              }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || uploadingMedia}
                  style={{
                    background: (loading || uploadingMedia) ? 'var(--text-light)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: (loading || uploadingMedia) ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  {uploadingMedia ? 'Görseller yükleniyor...' : loading ? 'Ekleniyor...' : 'Haberi Ekle'}
                </button>
                <Link
                  href="/admin"
                  className="btn"
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    textDecoration: 'none',
                    display: 'inline-block',
                    border: '1px solid var(--border-color)'
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
