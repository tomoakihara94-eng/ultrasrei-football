import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // needed for html-to-image in server components
  },
};

export default nextConfig;
