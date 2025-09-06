'use client'

import { useState, useEffect } from 'react'
import { AITool } from '@/lib/types'

interface AdminPageProps {}

export default function AdminPage({}: AdminPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [tools, setTools] = useState<AITool[]>([])
  const [editingTool, setEditingTool] = useState<AITool | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const ADMIN_PASSWORD = 'ai-gallery-admin-2024'

  useEffect(() => {
    if (isAuthenticated) {
      loadTools()
    }
  }, [isAuthenticated])

  const loadTools = async () => {
    try {
      const response = await fetch('/data/tools.json')
      const data = await response.json()
      setTools(data.tools)
    } catch (error) {
      console.error('Failed to load tools:', error)
    }
    setLoading(false)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('admin-auth', 'true')
    } else {
      alert('パスワードが正しくありません')
    }
  }

  const handleEdit = (tool: AITool) => {
    setEditingTool(tool)
    setShowModal(true)
  }

  const handleSave = (updatedTool: AITool) => {
    const updatedTools = tools.map(tool => 
      tool.id === updatedTool.id ? updatedTool : tool
    )
    setTools(updatedTools)
    
    // LocalStorageに保存
    localStorage.setItem('ai-gallery-tools', JSON.stringify(updatedTools))
    
    setShowModal(false)
    setEditingTool(null)
    alert('保存しました（LocalStorage）')
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingTool(null)
  }

  // 認証チェック
  useEffect(() => {
    const authStatus = localStorage.getItem('admin-auth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">AI Gallery Admin</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="パスワードを入力"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">AI Gallery 管理画面</h1>
          <button
            onClick={() => {
              setIsAuthenticated(false)
              localStorage.removeItem('admin-auth')
            }}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors"
          >
            ログアウト
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    名前
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    カテゴリ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    ロゴ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    スクリーンショット
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {tools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {tool.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          className="w-8 h-8 rounded mr-3"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/favicon.ico'
                          }}
                        />
                        <div>
                          <div className="text-sm font-medium text-white">{tool.name}</div>
                          <div className="text-sm text-gray-400 truncate max-w-xs">
                            {tool.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-600 text-white">
                        {tool.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={tool.logo}
                        alt="Logo"
                        className="w-10 h-10 rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/favicon.ico'
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={tool.screenshot}
                        alt="Screenshot"
                        className="w-16 h-10 rounded object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder.png'
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(tool)}
                        className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm transition-colors"
                      >
                        編集
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && editingTool && (
        <EditModal
          tool={editingTool}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

interface EditModalProps {
  tool: AITool
  onSave: (tool: AITool) => void
  onClose: () => void
}

function EditModal({ tool, onSave, onClose }: EditModalProps) {
  const [formData, setFormData] = useState({
    name: tool.name,
    description: tool.description,
    logo: tool.logo,
    screenshot: tool.screenshot,
    url: tool.url,
    category: tool.category
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...tool,
      ...formData
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">ツール編集: {tool.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ツール名
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  説明
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  カテゴリ
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                >
                  <option value="text-generation">Text Generation</option>
                  <option value="image-generation">Image Generation</option>
                  <option value="code-assistant">Code Assistant</option>
                  <option value="audio-video">Audio/Video</option>
                  <option value="data-analysis">Data Analysis</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => handleChange('url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ロゴURL
                </label>
                <input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => handleChange('logo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  スクリーンショットURL
                </label>
                <input
                  type="url"
                  value={formData.screenshot}
                  onChange={(e) => handleChange('screenshot', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </form>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">プレビュー</h3>
            <div className="space-y-4">
              <div className="border border-gray-300 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">ロゴプレビュー</h4>
                <img
                  src={formData.logo}
                  alt="Logo Preview"
                  className="w-16 h-16 rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/favicon.ico'
                  }}
                />
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">スクリーンショットプレビュー</h4>
                <img
                  src={formData.screenshot}
                  alt="Screenshot Preview"
                  className="w-full max-w-sm h-32 object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.png'
                  }}
                />
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">ツールカードプレビュー</h4>
                <div className="bg-gray-800 text-white p-4 rounded-lg max-w-sm">
                  <div className="flex items-center mb-2">
                    <img
                      src={formData.logo}
                      alt={formData.name}
                      className="w-8 h-8 rounded mr-3"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/favicon.ico'
                      }}
                    />
                    <h5 className="font-semibold">{formData.name}</h5>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">
                    {formData.description}
                  </p>
                  <img
                    src={formData.screenshot}
                    alt={formData.name}
                    className="w-full h-20 object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder.png'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}