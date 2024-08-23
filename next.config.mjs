/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
