'use client'

import { Category, categoryLabels } from '@/lib/types'
import { Filter } from 'lucide-react'

interface CategoryFilterProps {
  selectedCategory: Category | 'all'
  onCategoryChange: (category: Category | 'all') => void
  categoryCount: Record<Category | 'all', number>
}

export function CategoryFilter({ selectedCategory, onCategoryChange, categoryCount }: CategoryFilterProps) {
  const categories: Array<{ key: Category | 'all', label: string }> = [
    { key: 'all', label: 'すべて' },
    { key: 'text-generation', label: categoryLabels['text-generation'] },
    { key: 'image-generation', label: categoryLabels['image-generation'] },
    { key: 'code-assistant', label: categoryLabels['code-assistant'] },
    { key: 'data-analysis', label: categoryLabels['data-analysis'] },
    { key: 'audio-video', label: categoryLabels['audio-video'] },
    { key: 'other', label: categoryLabels['other'] },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">カテゴリー</h2>
      </div>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
              selectedCategory === category.key
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
            }`}
          >
            <span className="font-medium">{category.label}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              selectedCategory === category.key
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
            }`}>
              {categoryCount[category.key] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}