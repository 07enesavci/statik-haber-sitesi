'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface HeaderProps {
  currentPage?: 'home' | 'hakkimizda'
}

export default function Header({ currentPage = 'home' }: HeaderProps) {
  const [univLogoError, setUnivLogoError] = useState(false)
  const [toplulukLogoError, setToplulukLogoError] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'var(--white)',
      padding: '16px 0',
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flex: '1 1 auto',
            minWidth: 0
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}>
              {!univLogoError ? (
                <Image
                  src="/logos/universite-logo.png"
                  alt="Anadolu Bilim Üniversitesi Logosu"
                  width={50}
                  height={50}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                  onError={() => setUnivLogoError(true)}
                />
              ) : (
                <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>ABÜ</div>
              )}
            </div>
            <Link href="/" style={{ color: 'var(--white)', textDecoration: 'none', minWidth: 0, flex: '1 1 auto' }}>
              <div>
                <h1 style={{ 
                  fontSize: 'clamp(14px, 4vw, 20px)', 
                  fontWeight: 'bold', 
                  margin: 0, 
                  lineHeight: '1.2',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  ABÜ Bilgisayar Bilimleri Topluluğu
                </h1>
                <p style={{ marginTop: '2px', opacity: 0.9, fontSize: 'clamp(10px, 3vw, 12px)' }}>
                  Anadolu Bilim Üniversitesi
                </p>
              </div>
            </Link>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '6px',
                padding: '8px',
                cursor: 'pointer',
                color: 'white',
                flexDirection: 'column',
                gap: '4px',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px'
              }}
              aria-label="Menü"
            >
              <span style={{
                display: 'block',
                width: '20px',
                height: '2px',
                backgroundColor: 'white',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
              }} />
              <span style={{
                display: 'block',
                width: '20px',
                height: '2px',
                backgroundColor: 'white',
                transition: 'all 0.3s ease',
                opacity: mobileMenuOpen ? 0 : 1
              }} />
              <span style={{
                display: 'block',
                width: '20px',
                height: '2px',
                backgroundColor: 'white',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
              }} />
            </button>

            <nav style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}
            className="desktop-nav"
            >
              <Link
                href="/"
                style={{
                  color: 'var(--white)',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: '500',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  backgroundColor: currentPage === 'home' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 'home') {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 'home') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/hakkimizda"
                style={{
                  color: 'var(--white)',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: '500',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  backgroundColor: currentPage === 'hakkimizda' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 'hakkimizda') {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 'hakkimizda') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                Hakkımızda
              </Link>
            </nav>
            
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}>
              {!toplulukLogoError ? (
                <Image
                  src="/logos/topluluk-logo.png"
                  alt="Bilgisayar Bilimleri Topluluğu Logosu"
                  width={50}
                  height={50}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                  onError={() => setToplulukLogoError(true)}
                />
              ) : (
                <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>SBT</div>
              )}
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255,255,255,0.2)'
          }}
          className="mobile-nav"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--white)',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: currentPage === 'home' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/hakkimizda"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--white)',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: currentPage === 'hakkimizda' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              Hakkımızda
            </Link>
          </nav>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          button[aria-label="Menü"] {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
          button[aria-label="Menü"] {
            display: none !important;
          }
        }
      `}</style>
    </header>
  )
}