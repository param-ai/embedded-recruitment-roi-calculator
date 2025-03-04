import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Recruitment ROI Calculator | tidyhire.app',
  description: 'Calculate recruitment ROI with embedded recruiters',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
