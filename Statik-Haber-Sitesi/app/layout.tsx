import type { Metadata } from 'next'
import './globals.css'
import dynamic from 'next/dynamic'

const WelcomePopup = dynamic(() => import('@/components/WelcomePopup'), {
  ssr: false
})

export const metadata: Metadata = {
  title: 'ABÜ Bilgisayar Bilimleri Topluluğu',
  description: 'Anadolu Bilim Üniversitesi Bilgisayar Bilimleri Topluluğu Sayfası',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <WelcomePopup />
        {children}
      </body>
    </html>
  )
}