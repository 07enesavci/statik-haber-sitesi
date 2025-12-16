'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function WelcomePopup() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (pathname === '/') {
      const hasShown = typeof window !== 'undefined' && localStorage.getItem('welcomePopupShown') === 'true'
      
      if (!hasShown) {
        setShow(true)
        setTimeout(() => setIsVisible(true), 10)
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('welcomePopupShown', 'true')
        }
        
        const timer = setTimeout(() => {
          setIsVisible(false)
          setTimeout(() => setShow(false), 300)
        }, 2000)
        return () => clearTimeout(timer)
      }
    }
  }, [pathname])

  if (!show || pathname !== '/') return null

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .popup-overlay {
          animation: fadeIn 0.3s ease-out;
        }

        .popup-content {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .popup-emoji {
          animation: bounce 1s ease-in-out infinite;
          animation-delay: 0.3s;
        }

        .gradient-border {
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          padding: 3px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
      <div
        className="popup-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 50%, rgba(240, 147, 251, 0.8) 100%)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease-out'
        }}
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => setShow(false), 300)
          if (typeof window !== 'undefined') {
            localStorage.setItem('welcomePopupShown', 'true')
          }
        }}
      >
        <div
          className="popup-content gradient-border"
          style={{
            maxWidth: '450px',
            width: '90%',
            position: 'relative',
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '40px 35px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
                animation: 'rotate 20s linear infinite'
              }}
            />
            
            <button
              onClick={() => {
                setIsVisible(false)
                setTimeout(() => setShow(false), 300)
                if (typeof window !== 'undefined') {
                  localStorage.setItem('welcomePopupShown', 'true')
                }
              }}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: 'white',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                boxShadow: '0 4px 15px rgba(238, 90, 111, 0.4)',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(238, 90, 111, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(238, 90, 111, 0.4)'
              }}
            >
              ×
            </button>

            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div 
                className="popup-emoji"
                style={{ 
                  fontSize: '72px', 
                  marginBottom: '20px',
                  filter: 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3))'
                }}
              >
                🎉
              </div>
              <h2 
                className="gradient-text"
                style={{ 
                  fontSize: '32px', 
                  fontWeight: '800', 
                  margin: '0 0 12px 0',
                  letterSpacing: '-0.5px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Hoş Geldiniz!
              </h2>
              <p 
                style={{ 
                  fontSize: '18px', 
                  color: '#64748b',
                  margin: '0 0 25px 0',
                  lineHeight: '1.6',
                  fontWeight: '500'
                }}
              >
                Topluluk sayfamıza hoş geldiniz
              </p>
              
              <div
                style={{
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
                  borderRadius: '2px',
                  margin: '0 auto',
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}