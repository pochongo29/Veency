import { getMessages, locales, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import NosotrosClient from './NosotrosClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function NosotrosPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const messages = await getMessages(locale);

  return <NosotrosClient messages={messages} locale={locale} />;
}
