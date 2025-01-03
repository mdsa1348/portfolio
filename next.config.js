const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'nodemailer'],
  },
  images: {
    // domains: ['localhost'],
    domains: ['https://portfolio-livid-nine-23.vercel.app/'],
  },
}

module.exports = nextConfig

