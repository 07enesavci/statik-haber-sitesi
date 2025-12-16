import fs from 'fs'
import path from 'path'

export interface ContactInfo {
  title: string
  description: string
  email: string
  phone: string
  address: string
  danisman?: string
  baskan?: string
  socialMedia?: {
    website?: string
    instagram?: string
    twitter?: string
    facebook?: string
    linkedin?: string
    telegram?: string
    whatsapp?: string
  }
  updatedAt: string
}

const dataDir = path.join(process.cwd(), 'data')
const contactFile = path.join(dataDir, 'contact.json')

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

function initContactFile() {
  ensureDataDir()
  if (!fs.existsSync(contactFile)) {
    const defaultContact: ContactInfo = {
      title: 'ABÜ Bilgisayar Bilimleri Topluluğu',
      description: 'Anadolu Bilim Üniversitesi Bilgisayar Bilimleri Topluluğu olarak, bilgisayar bilimleri alanında akademik ve sosyal faaliyetler düzenleyen bir öğrenci topluluğuyuz.',
      email: 'info@aeusiyasetbilimi.com',
      phone: '',
      address: 'Anadolu Bilim Üniversitesi, Merkez',
      socialMedia: {},
      updatedAt: new Date().toISOString()
    }
    fs.writeFileSync(contactFile, JSON.stringify(defaultContact, null, 2))
  }
}

export async function getContactInfo(): Promise<ContactInfo> {
  initContactFile()
  try {
    const fileContents = fs.readFileSync(contactFile, 'utf8')
    return JSON.parse(fileContents) as ContactInfo
  } catch (error) {
    console.error('Error reading contact info:', error)
    const defaultContact: ContactInfo = {
      title: 'ABÜ Bilgisayar Bilimleri Topluluğu',
      description: 'Anadolu Bilim Üniversitesi Bilgisayar Bilimleri Topluluğu',
      email: 'info@aeusiyasetbilimi.com',
      phone: '',
      address: '',
      socialMedia: {},
      updatedAt: new Date().toISOString()
    }
    return defaultContact
  }
}

export async function updateContactInfo(contactData: Partial<ContactInfo>): Promise<ContactInfo> {
  ensureDataDir()
  const current = await getContactInfo()
  
  const updated: ContactInfo = {
    ...current,
    ...contactData,
    updatedAt: new Date().toISOString()
  }

  let retries = 3
  while (retries > 0) {
    try {
      fs.writeFileSync(contactFile, JSON.stringify(updated, null, 2), { flag: 'w' })
      break
    } catch (error) {
      retries--
      if (retries === 0) throw error
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  
  return updated
}
