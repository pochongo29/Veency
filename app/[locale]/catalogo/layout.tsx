import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo';
import { locales, defaultLocale, localeMetadata } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface Props {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[localeMetadata[loc].htmlLang] = `${siteConfig.url}/${loc}/catalogo`;
  }

  return {
    ...generatePageMetadata({
      title: 'Catálogo de Collares Artesanales',
      description:
        'Explora toda la colección de collares artesanales Veency. Chapa de oro, Shakiras, Shakirones y piezas naturales únicas hechas a mano en México.',
      path: `/${locale}/catalogo`,
      keywords: [
        'catálogo collares artesanales',
        'collares hechos a mano comprar',
        'tienda collares artesanales online',
        'collares chapa de oro comprar',
        'shakiras collares precio',
        'shakirones collares artesanales',
        'joyería artesanal online México',
        'collares únicos precio',
        'accesorios artesanales tienda online',
      ],
    }),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/catalogo`,
      languages,
    },
  };
}

export default function CatalogoLayout({ children }: Props) {
  return <>{children}</>;
}
