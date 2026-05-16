import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vilares Edu Gazette',
  description: 'Official Gazette of Vilares Edu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
