import type { NextConfig } from "next";

// Baseline security headers. A strict CSP is left out on purpose: Next's inline
// bootstrap scripts and the JSON-LD blocks would need nonces, which turns every
// page dynamic. frame-ancestors still blocks the site from being framed.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  // Posts are read from disk at module scope; keep them in the function bundle
  // for any request that renders a blog route at runtime.
  outputFileTracingIncludes: {
    "/blog": ["./src/content/blog/**/*"],
    "/blog/**": ["./src/content/blog/**/*"],
    "/sitemap.xml": ["./src/content/blog/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // URLs from the previous WordPress site (its Yoast sitemap), kept alive with 301s.
  async redirects() {
    return [
      { source: "/planejamento-previdenciario", destination: "/servicos/planejamento-previdenciario", permanent: true },
      { source: "/area-do-cliente", destination: "https://astreasoftware.appspot.com", permanent: true },
      { source: "/trabalhe-conosco", destination: "/contato", permanent: true },
      { source: "/formulario-recebido", destination: "/contato", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // File names are not hashed (photos will be swapped for licensed versions),
      // so cache for a day rather than marking them immutable.
      {
        source: "/:dir(images|video)/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
