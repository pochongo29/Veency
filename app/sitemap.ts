import { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { siteConfig } from '@/lib/seo';

// ---------------------------------------------------------------------------
// Sitemap automatico generado en tiempo de build.
// Next.js expone este archivo en /sitemap.xml automaticamente.
// ---------------------------------------------------------------------------
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  // Fecha base para las URLs estaticas (ultima modificacion aproximada)
  const staticLastMod = new Date('2026-03-06');

  // ---------------------------------------------------------------------------
  // URLs estaticas del sitio
  // ---------------------------------------------------------------------------
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: staticLastMod,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/catalogo`,
      lastModified: staticLastMod,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/nosotros`,
      lastModified: staticLastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/contacto`,
      lastModified: staticLastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // ---------------------------------------------------------------------------
  // URLs dinamicas de categorias
  // Las 4 categorias conocidas del catalogo
  // ---------------------------------------------------------------------------
  const categorias = ['chapa-de-oro', 'shakiras', 'shakirones', 'artesanal'] as const;

  const categoryRoutes: MetadataRoute.Sitemap = categorias.map((cat) => ({
    url: `${base}/catalogo/${cat}`,
    lastModified: staticLastMod,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ---------------------------------------------------------------------------
  // URLs dinamicas de productos individuales
  // ---------------------------------------------------------------------------
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}/producto/${product.id}`,
    lastModified: staticLastMod,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
