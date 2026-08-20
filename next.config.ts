import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /* Two forms take an upload: careers accepts a 5 MB resume, and /contact
       accepts a 10 MB drawing or specification per its build reference. Server
       actions cap the request body at 1 MB by default, and multipart adds
       boundary and header overhead on top of the file, so this leaves room for
       the larger of the two. */
    serverActions: { bodySizeLimit: "12mb" },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    /* deviceSizes was capped at 1536, well below Next's own default ceiling of
       3840. Every full-width image (`fill sizes="100vw"`) on a 1440px viewport at
       2x device pixel ratio needs about 2880px and could only be served 1536px,
       which the browser then upscaled by roughly 1.9x. That was the site-wide
       cause of soft photography, independent of the source files. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    /* Next 16 permits only quality 75 unless other values are whitelisted here,
       so `quality={90}` on a photograph is silently rejected without this. */
    qualities: [75, 90],
  },
};

export default nextConfig;
