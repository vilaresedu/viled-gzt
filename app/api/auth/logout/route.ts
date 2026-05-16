import { NextResponse } from 'next/server'

export async function GET() {
  const response = NextResponse.redirect(
    new URL('/categories', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
  )

  response.cookies.set('exec_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })

  return response
}
