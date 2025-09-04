'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { AITool } from '@/lib/types'
import { ArrowLeft, ExternalLink, Copy, Check } from 'lucide-react'
import toolsData from '@/data/tools.json'

export default function ToolDetail() {
  const params = useParams()
  const [tool, setTool] = useState<AITool | null>(null)
  const [loading, setLoading] = useState(true)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  useEffect(() => {
    const toolId = params.id as string
    const foundTool = toolsData.tools.find(t => t.id === toolId)
    
    setTimeout(() => {
      setTool(foundTool || null)
      setLoading(false)
    }, 300)
  }, [params.id])

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                </div>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
              <div className="space-y-4">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-32 bg-gray-100 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!tool) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            トップに戻る
          </Link>
          
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ツールが見つかりませんでした
            </h1>
            <p className="text-gray-600 mb-8">
              指定されたツールは存在しないか、削除された可能性があります
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          トップに戻る
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-8 mb-8">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                <Image
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {tool.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  {tool.description}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                    {tool.category === 'text-generation' && '文章生成'}
                    {tool.category === 'image-generation' && '画像生成'}
                    {tool.category === 'code-assistant' && 'コード支援'}
                    {tool.category === 'data-analysis' && 'データ分析'}
                    {tool.category === 'audio-video' && '音声・動画'}
                    {tool.category === 'other' && 'その他'}
                  </span>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    公式サイトを開く
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative h-80 mb-8 rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={tool.screenshot}
                alt={`${tool.name} screenshot`}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                プロンプト例
              </h2>
              
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
{tool.prompts.map((prompt, index) => (
  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-semibold text-gray-800">{prompt.title}</h3>
      <button
        onClick={() => copyToClipboard(prompt.prompt, index)}
        className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
      >
        {copiedIndex === index ? (
          <>
            <Check className="w-4 h-4" />
            コピー済み
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            コピー
          </>
        )}
      </button>
    </div>
    <p className="text-gray-600 whitespace-pre-wrap bg-white p-3 rounded border border-gray-100 font-mono text-sm">
      {prompt.prompt}
    </p>
  </div>
))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}