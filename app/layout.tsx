import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NgocPhatClub - Trang Nội Bộ',
  description: 'Trang web nội bộ quản lý NgocPhatClub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}

