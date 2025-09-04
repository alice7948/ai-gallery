import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Gallery - AIツールキュレーション',
  description: '最新AIツールを発見し、活用するためのキュレーションサイト',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
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