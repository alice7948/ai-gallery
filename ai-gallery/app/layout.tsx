import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Gallery - 最新AIツールを発見し、活用するためのキュレーションサイト',
  description: '50以上の最新AIツールを厳選。画像生成、文章作成、コード支援など、用途別に整理されたAIツールとプロンプト例を提供。',
  keywords: 'AI, AIツール, ChatGPT, Claude, Midjourney, 画像生成AI, 文章生成AI, プロンプト',
  openGraph: {
    title: 'AI Gallery',
    description: '最新AIツールのキュレーションサイト',
    url: 'https://ai-gallery-b5kv.vercel.app',
    siteName: 'AI Gallery',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Gallery',
    description: '最新AIツールを発見しよう',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          {children}
        </div>
        <footer className="bg-white border-t border-gray-200 py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>&copy; 2024 AI Gallery. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}