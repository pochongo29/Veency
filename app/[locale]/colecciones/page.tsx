import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { getMessages, locales, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import ColeccionesSection from '@/components/ColeccionesSection';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  return generatePageMetadata({
    title: 'Colecciones | Veency — Joyería Artesanal',
    description:
      'Explora las colecciones de Veency: Chapa de Oro, Shakiras, Shakirones y Artesanal. Collares hechos a mano en México, cada uno con su propia historia.',
    path: `/${locale}/colecciones`,
    keywords: [
      'colecciones collares artesanales',
      'chapa de oro collares',
      'shakiras collares México',
      'shakirones artesanales',
      'colección artesanal mexicana',
    ],
  });
}

export default async function ColeccionesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  await getMessages(locale);

  return (
    <div style={{ paddingTop: '64px' }}>
      <ColeccionesSection locale={locale} />
    </div>
  );
}
