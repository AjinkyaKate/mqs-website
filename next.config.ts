import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /* The careers form accepts a resume up to 5 MB. Server actions cap the request
       body at 1 MB by default, and multipart adds boundary and header overhead on
       top of the file, so this leaves room. */
    serverActions: { bodySizeLimit: "6mb" },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
