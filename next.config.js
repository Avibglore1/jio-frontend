/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  output: 'standalone', // Ensures correct build for Vercel
  reactStrictMode: true,
};

module.exports = nextConfig