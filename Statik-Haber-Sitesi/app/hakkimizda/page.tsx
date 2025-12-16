import Link from 'next/link'
import { getContactInfo } from '@/lib/contact'
import SocialButton from '@/components/SocialButton'
import Header from '@/components/Header'

export default async function Hakkimizda() {
  const contact = await getContactInfo()

  return (
    <div className="content-wrapper">
      <Header currentPage="hakkimizda" />

      {/* Main Content */}
      <main style={{ padding: 'clamp(30px, 6vw, 60px) 0', minHeight: 'calc(100vh - 200px)', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 1 }}>
          <div className="modern-card" style={{ padding: 'clamp(24px, 6vw, 50px)', marginBottom: '30px' }}>
            <h1 className="gradient-text" style={{
              fontSize: 'clamp(28px, 7vw, 42px)',
              fontWeight: 'bold',
              marginBottom: '30px',
              lineHeight: '1.2'
            }}>
              Hakkımızda
            </h1>

            <div style={{
              fontSize: 'clamp(16px, 4vw, 18px)',
              lineHeight: '1.9',
              color: 'var(--text-color)',
              marginBottom: 'clamp(30px, 6vw, 50px)',
              whiteSpace: 'pre-wrap'
            }}>
              {contact.description.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < contact.description.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>

            {/* Danışman ve Başkan */}
            {(contact.danisman || contact.baskan) && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(16px, 4vw, 24px)',
                marginBottom: 'clamp(30px, 6vw, 50px)',
                padding: 'clamp(20px, 5vw, 30px)',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                borderRadius: '16px',
                border: '1px solid rgba(102, 126, 234, 0.1)'
              }}>
                {contact.danisman && (
                  <div className="float-animation" style={{
                    textAlign: 'center',
                    padding: 'clamp(16px, 4vw, 24px)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      fontWeight: '600',
                      color: 'var(--text-light)',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Danışman
                    </div>
                    <div style={{
                      fontSize: 'clamp(16px, 4vw, 20px)',
                      fontWeight: 'bold',
                      color: 'var(--primary-color)',
                      lineHeight: '1.4'
                    }}>
                      {contact.danisman}
                    </div>
                  </div>
                )}

                {contact.baskan && (
                  <div className="float-animation-delay" style={{
                    textAlign: 'center',
                    padding: 'clamp(16px, 4vw, 24px)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      fontWeight: '600',
                      color: 'var(--text-light)',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Başkan
                    </div>
                    <div style={{
                      fontSize: 'clamp(16px, 4vw, 20px)',
                      fontWeight: 'bold',
                      color: 'var(--primary-color)',
                      lineHeight: '1.4'
                    }}>
                      {contact.baskan}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div style={{
              borderTop: '2px solid var(--border-color)',
              paddingTop: 'clamp(30px, 6vw, 40px)'
            }}>
              <h2 className="gradient-text" style={{
                fontSize: 'clamp(24px, 6vw, 32px)',
                fontWeight: 'bold',
                marginBottom: 'clamp(24px, 5vw, 32px)'
              }}>
                İletişim Bilgileri
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(16px, 4vw, 24px)',
                marginBottom: 'clamp(30px, 6vw, 40px)'
              }}>
                {contact.email && (
                  <div style={{
                    padding: 'clamp(16px, 4vw, 24px)',
                    background: 'rgba(102, 126, 234, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <h3 style={{
                      fontSize: 'clamp(11px, 3vw, 13px)',
                      fontWeight: '600',
                      color: 'var(--text-light)',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      E-posta
                    </h3>
                    <a
                      href={`mailto:${contact.email}`}
                      style={{
                        fontSize: 'clamp(14px, 4vw, 16px)',
                        color: 'var(--primary-color)',
                        textDecoration: 'none',
                        fontWeight: '500',
                        wordBreak: 'break-word'
                      }}
                    >
                      {contact.email}
                    </a>
                  </div>
                )}

                {contact.phone && (
                  <div style={{
                    padding: 'clamp(16px, 4vw, 24px)',
                    background: 'rgba(102, 126, 234, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(102, 126, 234, 0.1)'
                  }}>
                    <h3 style={{
                      fontSize: 'clamp(11px, 3vw, 13px)',
                      fontWeight: '600',
                      color: 'var(--text-light)',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Telefon
                    </h3>
                    <a
                      href={`tel:${contact.phone}`}
                      style={{
                        fontSize: 'clamp(14px, 4vw, 16px)',
                        color: 'var(--text-color)',
                        textDecoration: 'none',
                        fontWeight: '500'
                      }}
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}

                {contact.address && (
                  <div style={{
                    padding: 'clamp(16px, 4vw, 24px)',
                    background: 'rgba(102, 126, 234, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(102, 126, 234, 0.1)'
                  }}>
                    <h3 style={{
                      fontSize: 'clamp(11px, 3vw, 13px)',
                      fontWeight: '600',
                      color: 'var(--text-light)',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Adres
                    </h3>
                    <p style={{
                      fontSize: 'clamp(14px, 4vw, 16px)',
                      color: 'var(--text-color)',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {contact.address}
                    </p>
                  </div>
                )}
              </div>

              {(contact.socialMedia && Object.keys(contact.socialMedia).length > 0) && (
                <div style={{ marginTop: 'clamp(30px, 6vw, 40px)' }}>
                  <h3 style={{
                    fontSize: 'clamp(12px, 3.5vw, 14px)',
                    fontWeight: '600',
                    color: 'var(--text-light)',
                    marginBottom: 'clamp(16px, 4vw, 20px)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Sosyal Medya & Gruplar
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'clamp(12px, 3vw, 16px)'
                  }}>
                    {contact.socialMedia.website && (
                      <SocialButton
                        href={contact.socialMedia.website}
                        label="Website"
                        color="#6366f1"
                      />
                    )}
                    {contact.socialMedia.instagram && (
                      <SocialButton
                        href={contact.socialMedia.instagram}
                        label="Instagram"
                        color="#E4405F"
                      />
                    )}
                    {contact.socialMedia.twitter && (
                      <SocialButton
                        href={contact.socialMedia.twitter}
                        label="Twitter"
                        color="#1DA1F2"
                      />
                    )}
                    {contact.socialMedia.facebook && (
                      <SocialButton
                        href={contact.socialMedia.facebook}
                        label="Facebook"
                        color="#1877F2"
                      />
                    )}
                    {contact.socialMedia.linkedin && (
                      <SocialButton
                        href={contact.socialMedia.linkedin}
                        label="LinkedIn"
                        color="#0077B5"
                      />
                    )}
                    {contact.socialMedia.telegram && (
                      <SocialButton
                        href={contact.socialMedia.telegram}
                        label="Telegram"
                        color="#0088cc"
                      />
                    )}
                    {contact.socialMedia.whatsapp && (
                      <SocialButton
                        href={contact.socialMedia.whatsapp}
                        label="WhatsApp"
                        color="#25D366"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
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
          <div style={{
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease'
              }}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/hakkimizda"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease'
              }}
            >
              Hakkımızda
            </Link>
          </div>
          <p style={{ marginTop: '16px', fontSize: '14px', opacity: 0.6 }}>
            abu-bilgisayar-bilimleri.com
          </p>
        </div>
      </footer>
    </div>
  )
}
