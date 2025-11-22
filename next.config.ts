/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tell Next.js to not bundle these packages on the server == makes vercel to work properly.
  serverExternalPackages: ['pino', 'thread-stream', 'pino-pretty'],
};

module.exports = nextConfig;

