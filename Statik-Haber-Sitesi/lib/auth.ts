import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
const dataDir = path.join(process.cwd(), 'data')
const adminFile = path.join(dataDir, 'admin.json')

interface AdminUser {
  username: string
  password: string
}

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

function initAdminFile() {
  ensureDataDir()
  if (!fs.existsSync(adminFile)) {
    const defaultAdmin: AdminUser = {
      username: 'admin',
      password: bcrypt.hashSync('admin123', 10)
    }
    fs.writeFileSync(adminFile, JSON.stringify(defaultAdmin, null, 2))
  }
}

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  initAdminFile()
  try {
    const fileContents = fs.readFileSync(adminFile, 'utf8')
    const admin: AdminUser = JSON.parse(fileContents)
    
    if (admin.username !== username) {
      return false
    }

    return await bcrypt.compare(password, admin.password)
  } catch (error) {
    console.error('Error verifying admin:', error)
    return false
  }
}

export async function updateAdmin(username: string, password: string): Promise<void> {
  ensureDataDir()
  const hashedPassword = await bcrypt.hash(password, 10)
  const admin: AdminUser = {
    username,
    password: hashedPassword
  }
  fs.writeFileSync(adminFile, JSON.stringify(admin, null, 2))
}
