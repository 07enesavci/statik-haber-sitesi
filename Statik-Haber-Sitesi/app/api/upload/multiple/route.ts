import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { existsSync, mkdirSync } from 'fs'
import path from 'path'
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

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 400 }
      )
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true })
    }

    const uploadedFiles: Array<{ filename: string; url: string; type: string }> = []

    for (const file of files) {
      const isImage = file.type.startsWith('image/')
      const isVideo = file.type.startsWith('video/')

      if (!isImage && !isVideo) continue

      const maxSize = isImage ? 10 * 1024 * 1024 : 50 * 1024 * 1024
      if (file.size > maxSize) continue

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(2, 8)
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const filename = `${timestamp}_${randomStr}_${originalName}`
      const filepath = path.join(uploadsDir, filename)

      await writeFile(filepath, buffer)

      uploadedFiles.push({
        filename,
        url: `/uploads/${filename}`,
        type: isImage ? 'image' : 'video'
      })
    }

    return NextResponse.json({
      files: uploadedFiles
    })
  } catch (error) {
    console.error('Error uploading files:', error)
    return NextResponse.json(
      { error: 'Dosyalar yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

