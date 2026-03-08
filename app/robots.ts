import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

// ---------------------------------------------------------------------------
// Robots.txt generado automaticamente por Next.js en /robots.txt.
// Se bloquea el indexado de carrito y favoritos (paginas de usuario,
// sin valor de SEO y con estado dinamico que no debe indexarse).
// ---------------------------------------------------------------------------
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/carrito', '/favoritos'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
