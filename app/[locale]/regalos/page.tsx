import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { getMessages, locales, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import RegalosSection from '@/components/RegalosSection';

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
    title: 'Regalos | Veency — Joyería Artesanal',
    description:
      'Encuentra el regalo perfecto en Veency. Collares artesanales hechos a mano para ella, para él y para toda ocasión especial. Envío a toda la República Mexicana.',
    path: `/${locale}/regalos`,
    keywords: [
      'regalos de joyería México',
      'collares para regalar',
      'regalo artesanal hecho a mano',
      'regalos únicos México',
      'collares regalo cumpleaños aniversario',
    ],
  });
}

export default async function RegalosPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  await getMessages(locale);

  return (
    <div style={{ paddingTop: '64px' }}>
      <RegalosSection locale={locale} />
    </div>
  );
}
