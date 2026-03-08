import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { getMessages, locales, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import ParaEllosSection from '@/components/ParaEllosSection';

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
    title: 'Para Ellos | Veency — Collares Artesanales',
    description:
      'Collares artesanales para hombre hechos a mano en México. Shakirones, chapa de oro, artesanal y más. Estilo único, materiales seleccionados.',
    path: `/${locale}/para-ellos`,
    keywords: [
      'collares para hombre México',
      'collares artesanales hombre',
      'shakirones para hombre',
      'joyería masculina artesanal',
      'collares hechos a mano hombre',
    ],
  });
}

export default async function ParaEllosPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  await getMessages(locale);

  return (
    <div style={{ paddingTop: '64px' }}>
      <ParaEllosSection locale={locale} />
    </div>
  );
}
