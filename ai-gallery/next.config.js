/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ビルド時の型チェックをスキップ
    ignoreBuildErrors: true,
  },
  eslint: {
    // ビルド時のESLintチェックもスキップ
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['via.placeholder.com'],
  },
}

module.exports = nextConfig