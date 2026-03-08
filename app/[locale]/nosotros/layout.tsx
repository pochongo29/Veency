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
    languages[localeMetadata[loc].htmlLang] = `${siteConfig.url}/${loc}/nosotros`;
  }

  return {
    ...generatePageMetadata({
      title: 'Nuestra Historia | Joyería Artesanal con Alma',
      description:
        'Conoce la historia detrás de Veency. Desde una mesa de cocina con hilo y cuentas, hasta más de 500 piezas únicas artesanales hechas con dedicación y amor al detalle.',
      path: `/${locale}/nosotros`,
      keywords: [
        'historia Veency', 'joyería artesanal con alma', 'collares hechos a mano México',
        'artesanas mexicanas', 'proceso artesanal joyería', 'quiénes somos Veency',
        'valores joyería artesanal', 'piezas únicas collares',
      ],
    }),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/nosotros`,
      languages,
    },
  };
}

export default function NosotrosLayout({ children }: Props) {
  return <>{children}</>;
}
