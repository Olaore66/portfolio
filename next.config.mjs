/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Turbopack's persistent build cache snapshots server-side environment
    // variables (e.g. RESEND_API_KEY) into .next/cache/turbopack. Netlify's
    // secrets scanning flags those values and fails the deploy, so skip
    // writing that cache for production builds.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
