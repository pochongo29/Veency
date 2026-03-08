import type { Metadata } from 'next';

// ---------------------------------------------------------------------------
// Configuracion base del sitio Veency
// ---------------------------------------------------------------------------
export const siteConfig: {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  keywords: string[];
  locale: string;
  twitterHandle: string;
  authors: { name: string; url: string }[];
  whatsappPhone: string;
} = {
  name: 'Veency',
  description:
    'Tienda de collares artesanales hechos a mano en México. Chapa de oro 18k, Shakiras, Shakirones y materiales naturales. Piezas únicas con diseño elegante para mujeres que aman lo auténtico.',
  url: 'https://veency.mx',
  ogImage: 'https://veency.mx/opengraph-image',
  keywords: [
    'collares artesanales México',
    'collares hechos a mano',
    'collares de chapa de oro',
    'collares Shakiras mostacillas',
    'joyería artesanal mexicana',
    'collares únicos elegantes',
    'accesorios artesanales',
    'collares Shakirones',
    'joyería hecha a mano CDMX',
    'comprar collares artesanales online',
    'collares artesanales',
    'joyería hecha a mano',
    'chapa de oro 18k',
    'shakiras mostacillas',
    'shakirones cuentas grandes',
    'accesorios únicos México',
    'collares bohemios',
    'joyería artesanal',
    'collares naturales',
    'bisutería fina artesanal',
  ],
  locale: 'es_MX',
  twitterHandle: '@veency.mx',
  authors: [{ name: 'Veency', url: 'https://veency.mx' }],
  // Número en formato internacional sin espacios ni + (para wa.me)
  whatsappPhone: '5215512345678',
};

// ---------------------------------------------------------------------------
// Parametros para generatePageMetadata
// ---------------------------------------------------------------------------
interface PageMetadataParams {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  keywords?: string[];
}

// ---------------------------------------------------------------------------
// Helper que genera un objeto Metadata completo para una pagina especifica.
// Reutiliza siteConfig como base y permite sobreescribir por pagina.
// ---------------------------------------------------------------------------
export function generatePageMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
  keywords,
}: PageMetadataParams): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;
  const pageKeywords = keywords ?? siteConfig.keywords;

  return {
    title,
    description,
    keywords: pageKeywords,
    authors: siteConfig.authors,
    creator: siteConfig.name,
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
    ...(noindex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
