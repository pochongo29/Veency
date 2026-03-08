import { getMessages, locales, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import CatalogoClient from './CatalogoClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function CatalogoPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const messages = await getMessages(locale);

  return <CatalogoClient messages={messages} locale={locale} />;
}
