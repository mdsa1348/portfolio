const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'nodemailer'],
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig

