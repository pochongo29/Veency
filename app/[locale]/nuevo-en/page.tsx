import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';
import { getMessages, locales, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

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
    title: 'Nuevo en Veency | Próximamente',
    description: 'Nuevas piezas artesanales llegando pronto a Veency.',
    path: `/${locale}/nuevo-en`,
  });
}

export default async function NuevoEnPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  await getMessages(locale);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1A1210',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '24px',
    }}>
      <span style={{
        display: 'block',
        fontSize: '0.65rem',
        fontWeight: 600,
        color: '#D4B483',
        textTransform: 'uppercase',
        letterSpacing: '0.34em',
        marginBottom: '20px',
        fontFamily: 'var(--font-body)',
      }}>
        Muy pronto
      </span>

      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(2.8rem, 6vw, 5rem)',
        fontWeight: 400,
        color: '#ffffff',
        lineHeight: 1.05,
        marginBottom: '20px',
      }}>
        Nuevo en<br />
        <em style={{ fontStyle: 'italic', color: '#D4B483' }}>Veency</em>
      </h1>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        color: 'rgba(255,255,255,0.45)',
        lineHeight: 1.8,
        maxWidth: '420px',
        marginBottom: '40px',
      }}>
        Estamos preparando nuevas piezas artesanales. Mientras tanto,
        explora nuestras colecciones actuales.
      </p>

      <Link
        href={`/${locale}/catalogo`}
        style={{
          backgroundColor: '#B9965B',
          color: '#ffffff',
          padding: '13px 36px',
          fontSize: '0.78rem',
          fontWeight: 600,
          fontFamily: 'var(--font-body)',
          textDecoration: 'none',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        Ver catálogo
      </Link>
    </div>
  );
}
