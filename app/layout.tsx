import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Weather Dashboard',
  description: 'A Next.js Weather Dashboard',
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
