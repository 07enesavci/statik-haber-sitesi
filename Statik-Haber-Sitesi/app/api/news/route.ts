import { NextRequest, NextResponse } from 'next/server'
import { createNews } from '@/lib/news'
import { verifyToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const decoded = await verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Geçersiz token' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, content, fullContent, image, imageUrl, images, imageUrls, videos, link, isPinned, isFeatured } = body

    if (!title || !content || !fullContent) {
      return NextResponse.json(
        { error: 'Başlık, özet ve içerik alanları zorunludur' },
        { status: 400 }
      )
    }

    const news = await createNews({
      title,
      content,
      fullContent,
      image,
      imageUrl,
      images,
      imageUrls,
      videos,
      link,
      isPinned,
      isFeatured
    })

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    console.error('Error creating news:', error)
    return NextResponse.json(
      { error: 'Haber oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
}
