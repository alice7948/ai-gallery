'use client'

import { AITool } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, ArrowRight, Star } from 'lucide-react'

interface ToolCardProps {
  tool: AITool
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function ToolCard({ tool, isFavorite, onToggleFavorite }: ToolCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
      <Link href={`/tools/${tool.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={tool.screenshot}
            alt={`${tool.name} screenshot`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <Star className={`w-5 h-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={tool.logo}
                alt={`${tool.name} logo`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {tool.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
              {tool.category === 'text-generation' && '文章生成'}
              {tool.category === 'image-generation' && '画像生成'}
              {tool.category === 'code-assistant' && 'コード支援'}
              {tool.category === 'data-analysis' && 'データ分析'}
              {tool.category === 'audio-video' && '音声・動画'}
              {tool.category === 'other' && 'その他'}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                {tool.prompts.length}個のプロンプト
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}