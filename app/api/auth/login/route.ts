import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import bcrypt from 'bcryptjs'
import accounts from '@/exec-accounts.json'

const secret = new TextEncoder().encode(process.env.EXEC_COOKIE_SECRET)

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()

  const account = accounts.find(a => a.username === username)

  if (!account) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, account.password)

  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = await new SignJWT({
    username: account.username,
    name: account.name,
    role: account.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret)

  const response = NextResponse.json({ success: true })

  response.cookies.set('exec_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  })

  return response
}
