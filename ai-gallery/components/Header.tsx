'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow-md backdrop-blur-lg bg-opacity-95 border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Gallery
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              最新AIツールを発見し、活用するためのキュレーションサイト
            </p>
          </div>
        </Link>
      </div>
    </header>
  )
}