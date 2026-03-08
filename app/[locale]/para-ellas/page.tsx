import type { Metadata } from 'next';
import ParaEllasSection from '@/components/ParaEllasSection';
import { generatePageMetadata } from '@/lib/seo';
import { locales, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;

  return generatePageMetadata({
    title: 'Para Ellas | Veency',
    description:
      'Collares artesanales hechos a mano para ella. Explora nuestra colección de piezas únicas en chapa de oro, shakiras, shakirones y materiales naturales. Cada collar cuenta tu historia.',
    path: `/${locale}/para-ellas`,
    keywords: [
      'collares para mujer',
      'joyería artesanal femenina',
      'collares hechos a mano mujer',
      'regalo para ella México',
      'collares elegantes artesanales',
      'shakiras collares mujer',
      'chapa de oro collar mujer',
    ],
  });
}

export default async function ParaEllasPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;

  return (
    <main style={{ paddingTop: '64px' }}>
      <ParaEllasSection locale={locale} />
    </main>
  );
}
