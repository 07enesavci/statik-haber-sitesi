import { NextRequest, NextResponse } from 'next/server'
import { getNewsById, updateNews, deleteNews } from '@/lib/news'
import { verifyToken } from '@/lib/jwt'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const news = await getNewsById(params.id)

    if (!news) {
      return NextResponse.json(
        { error: 'Haber bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Haber yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const news = await updateNews(params.id, {
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

    if (!news) {
      return NextResponse.json(
        { error: 'Haber bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error('Error updating news:', error)
    return NextResponse.json(
      { error: 'Haber güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const success = await deleteNews(params.id)

    if (!success) {
      return NextResponse.json(
        { error: 'Haber bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting news:', error)
    return NextResponse.json(
      { error: 'Haber silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
