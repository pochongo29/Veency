import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';

// La home raíz redirige siempre al locale por defecto (español).
// El middleware o el layout de [locale] maneja la detección automática de idioma.
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
