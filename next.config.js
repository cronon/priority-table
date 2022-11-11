const repo = 'priority-table'
const assetPrefix = `/${repo}/`
const basePath = `/${repo}`

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix,
  basePath
}

module.exports = nextConfig
