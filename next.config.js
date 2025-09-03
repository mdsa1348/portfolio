const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongodb"],
  },
  images: {
    domains: ["localhost", "your-production-domain.com"],
  },
}

module.exports = nextConfig

