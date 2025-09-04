'use client'

import { useState, useEffect, useMemo } from 'react'
import { Header } from '@/components/Header'
import { ToolCard } from '@/components/ToolCard'
import { CategoryFilter } from '@/components/CategoryFilter'
import { AITool, Category } from '@/lib/types'
import { Search } from 'lucide-react'
import toolsData from '@/data/tools.json'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [tools, setTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])
  const toolsPerPage = 9

  useEffect(() => {
    setTimeout(() => {
      setTools(toolsData.tools)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // LocalStorageからお気に入りを読み込み
  useEffect(() => {
    const savedFavorites = localStorage.getItem('aiGalleryFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // お気に入り切り替え関数
  const toggleFavorite = (toolId: string) => {
    const newFavorites = favorites.includes(toolId)
      ? favorites.filter(id => id !== toolId)
      : [...favorites, toolId];
    
    setFavorites(newFavorites);
    localStorage.setItem('aiGalleryFavorites', JSON.stringify(newFavorites));
  };

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [tools, selectedCategory, searchQuery])

  const indexOfLastTool = currentPage * toolsPerPage
  const indexOfFirstTool = indexOfLastTool - toolsPerPage
  const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool)
  const totalPages = Math.ceil(filteredTools.length / toolsPerPage)

  const categoryCount = useMemo(() => {
    const count: Record<Category | 'all', number> = {
      'all': tools.length,
      'text-generation': 0,
      'image-generation': 0,
      'code-assistant': 0,
      'data-analysis': 0,
      'audio-video': 0,
      'other': 0,
    }

    tools.forEach(tool => {
      count[tool.category]++
    })

    return count
  }, [tools])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-80">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    {Array(7).fill(0).map((_, i) => (
                      <div key={i} className="h-12 bg-gray-100 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
            <main className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-100 rounded mb-2"></div>
                      <div className="h-4 bg-gray-100 rounded mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-6 w-20 bg-gray-100 rounded-full"></div>
                        <div className="h-4 w-16 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            AIツールを探索しよう
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            厳選されたAIツールの中から、あなたの用途に最適なものを見つけてください。
            各ツールには実用的なプロンプト例も用意されています。
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="AIツールを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 w-full lg:block">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categoryCount={categoryCount}
            />
          </aside>

          <main className="flex-1">
            {filteredTools.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  該当するツールが見つかりませんでした
                </h3>
                <p className="text-gray-600">
                  別のカテゴリーを選択してみてください
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedCategory === 'all' ? 'すべてのツール' : 
                     selectedCategory === 'text-generation' ? '文章生成ツール' :
                     selectedCategory === 'image-generation' ? '画像生成ツール' :
                     selectedCategory === 'code-assistant' ? 'コード支援ツール' :
                     selectedCategory === 'data-analysis' ? 'データ分析ツール' :
                     selectedCategory === 'audio-video' ? '音声・動画ツール' : 'その他のツール'}
                    <span className="ml-2 text-sm text-gray-500">
                      ({filteredTools.length}件)
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentTools.map((tool) => (
                    <ToolCard 
                      key={tool.id} 
                      tool={tool} 
                      isFavorite={favorites.includes(tool.id)}
                      onToggleFavorite={() => toggleFavorite(tool.id)}
                    />
                  ))}
                </div>
                
                <div className="flex flex-col items-center gap-4 mt-8 mb-8">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      ← 前へ
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => {
                          setCurrentPage(index + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-10 h-10 rounded-full transition-colors ${
                          currentPage === index + 1 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => {
                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      次へ →
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-sm">
                    全{filteredTools.length}件中 {indexOfFirstTool + 1}-{Math.min(indexOfLastTool, filteredTools.length)}件を表示
                  </p>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}