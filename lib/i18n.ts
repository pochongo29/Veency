// ---------------------------------------------------------------------------
// Sistema de i18n propio — sin librerías externas.
// Soporta carga de traducciones por locale y acceso a claves anidadas.
// ---------------------------------------------------------------------------

export type Locale = 'es' | 'en' | 'fr' | 'pt';

export const locales: Locale[] = ['es', 'en', 'fr', 'pt'];
export const defaultLocale: Locale = 'es';

// Metadatos de cada locale para el selector de idioma
export const localeMetadata: Record<Locale, { label: string; flag: string; ogLocale: string; htmlLang: string }> = {
  es: { label: 'ES', flag: '🇲🇽', ogLocale: 'es_MX', htmlLang: 'es-MX' },
  en: { label: 'EN', flag: '🇺🇸', ogLocale: 'en_US', htmlLang: 'en-US' },
  fr: { label: 'FR', flag: '🇫🇷', ogLocale: 'fr_FR', htmlLang: 'fr-FR' },
  pt: { label: 'PT', flag: '🇧🇷', ogLocale: 'pt_BR', htmlLang: 'pt-BR' },
};

// Tipo para los mensajes cargados (objeto JSON plano o anidado)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Messages = Record<string, any>;

// ---------------------------------------------------------------------------
// Carga dinámica de las traducciones del locale indicado.
// Se usa import() dinámico para que Next.js no incluya todos los locales en
// cada bundle — solo carga el archivo necesario.
// ---------------------------------------------------------------------------
export async function getMessages(locale: Locale): Promise<Messages> {
  try {
    const messages = await import(`@/messages/${locale}.json`);
    // Los dynamic imports devuelven { default: {...} }
    return messages.default ?? messages;
  } catch {
    // Si falla el locale solicitado, fallback a español
    const fallback = await import('@/messages/es.json');
    return fallback.default ?? fallback;
  }
}

// ---------------------------------------------------------------------------
// Helper para acceder a claves anidadas con notación de punto.
// Ejemplo: t(messages, 'nav.home') -> 'Inicio'
// Si la clave no existe, devuelve la clave misma como fallback legible.
// ---------------------------------------------------------------------------
export function t(messages: Messages, key: string): string {
  const parts = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = messages;

  for (const part of parts) {
    if (current == null || typeof current !== 'object') {
      return key; // Clave no encontrada — devuelve la clave como fallback
    }
    current = current[part];
  }

  if (typeof current === 'string') return current;
  if (Array.isArray(current)) return current.join(', ');
  return key;
}

// ---------------------------------------------------------------------------
// Helper para obtener un array de strings desde una clave anidada.
// Ejemplo: tArray(messages, 'contact.form.subjectOptions') -> string[]
// ---------------------------------------------------------------------------
export function tArray(messages: Messages, key: string): string[] {
  const parts = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = messages;

  for (const part of parts) {
    if (current == null || typeof current !== 'object') return [];
    current = current[part];
  }

  if (Array.isArray(current)) return current as string[];
  return [];
}

// ---------------------------------------------------------------------------
// Helper para obtener un array de objetos desde una clave anidada.
// Útil para about.process.steps que son objetos { title, desc }.
// ---------------------------------------------------------------------------
export function tObjectArray<T>(messages: Messages, key: string): T[] {
  const parts = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = messages;

  for (const part of parts) {
    if (current == null || typeof current !== 'object') return [];
    current = current[part];
  }

  if (Array.isArray(current)) return current as T[];
  return [];
}

// ---------------------------------------------------------------------------
// Valida si un string es un Locale válido
// ---------------------------------------------------------------------------
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
