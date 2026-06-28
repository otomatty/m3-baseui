import type { APIRoute } from 'astro';

// Generate robots.txt at build time so the Sitemap URL always matches the
// configured `site` (overridable via the SITE_URL env var on Cloudflare Pages).
const body = (sitemap: URL) => `User-agent: *
Allow: /

Sitemap: ${sitemap.href}
`;

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response('User-agent: *\nAllow: /\n', {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return new Response(body(new URL('sitemap-index.xml', site)), {
    headers: { 'Content-Type': 'text/plain' },
  });
};
