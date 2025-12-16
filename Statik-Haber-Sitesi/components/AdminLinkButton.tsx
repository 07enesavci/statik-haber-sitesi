'use client'

import Link from 'next/link'

interface AdminLinkButtonProps {
  href: string
  children: React.ReactNode
  target?: string
  style?: React.CSSProperties
}

export default function AdminLinkButton({ href, children, target, style }: AdminLinkButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      style={{
        color: 'var(--white)',
        textDecoration: 'none',
        fontSize: '14px',
        padding: '8px 16px',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        display: 'inline-block',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {children}
    </Link>
  )
}

