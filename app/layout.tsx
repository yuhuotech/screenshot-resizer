import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShotFit · 截图适配助手',
  description: '批量将截图调整为应用商店所需的分辨率，支持 App Store、小米应用商店等多个平台',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-100 antialiased">{children}</body>
    </html>
  )
}
