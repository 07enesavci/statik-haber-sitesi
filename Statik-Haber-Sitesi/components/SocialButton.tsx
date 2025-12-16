'use client'

interface SocialButtonProps {
  href: string
  label: string
  color: string
}

export default function SocialButton({ href, label, color }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: '10px 20px',
        backgroundColor: color,
        color: 'var(--white)',
        borderRadius: '4px',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'opacity 0.3s',
        display: 'inline-block'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.8'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1'
      }}
    >
      {label}
    </a>
  )
}
