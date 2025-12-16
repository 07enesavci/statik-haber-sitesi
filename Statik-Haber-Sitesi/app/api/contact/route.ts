import { NextRequest, NextResponse } from 'next/server'
import { getContactInfo, updateContactInfo } from '@/lib/contact'
import { verifyToken } from '@/lib/jwt'

export async function GET() {
  try {
    const contact = await getContactInfo()
    return NextResponse.json(contact)
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return NextResponse.json(
      { error: 'İletişim bilgileri yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
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
    const updated = await updateContactInfo(body)

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating contact info:', error)
    return NextResponse.json(
      { error: 'İletişim bilgileri güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
