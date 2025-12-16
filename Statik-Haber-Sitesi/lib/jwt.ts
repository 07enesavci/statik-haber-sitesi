import { jwtVerify, SignJWT } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'abu-bilgisayar-bilimleri-toplulugu-secret-key-change-in-production'
const secret = new TextEncoder().encode(JWT_SECRET)

export async function verifyToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    
    if (payload.username && typeof payload.username === 'string') {
      return { username: payload.username }
    }
    
    return null
  } catch (error) {
    return null
  }
}

export async function generateToken(username: string): Promise<string> {
  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
  
  return token
}

export { JWT_SECRET }