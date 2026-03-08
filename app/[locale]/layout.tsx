import type { Metadata } from 'next';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toaster from '@/components/Toaster';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/lib/seo';
import { locales, defaultLocale, localeMetadata, getMessages } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

// ---------------------------------------------------------------------------
// Fuentes — se cargan una sola vez en el layout de locale
// ---------------------------------------------------------------------------
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-source-sans',
  display: 'swap',
});

// ---------------------------------------------------------------------------
// generateStaticParams — genera un HTML estático por cada locale en build.
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ---------------------------------------------------------------------------
// generateMetadata — metadata dinámica según el locale activo
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const meta = localeMetadata[locale];

  // URLs alternativas (hreflang) para todas las variantes de idioma
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[localeMetadata[loc].htmlLang] = `${siteConfig.url}/${loc}`;
  }
  languages['x-default'] = `${siteConfig.url}/es`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: 'Veency | Collares Artesanales Hechos a Mano en México',
      template: '%s | Veency',
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.name,
    publisher: siteConfig.name,
    openGraph: {
      type: 'website',
      locale: meta.ogLocale,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      title: 'Veency | Collares Artesanales Hechos a Mano en México',
      description: siteConfig.description,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Veency — Collares artesanales hechos a mano en México',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Veency | Collares Artesanales Hechos a Mano en México',
      description: siteConfig.description,
      images: ['/og-image.jpg'],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages,
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD de organización — presente en todas las páginas
// ---------------------------------------------------------------------------
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Veency',
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  email: 'hola@veency.mx',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MX',
    addressLocality: 'Ciudad de México',
    addressRegion: 'CDMX',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Spanish', 'English', 'French', 'Portuguese'],
    email: 'hola@veency.mx',
  },
  sameAs: ['https://instagram.com/veency.mx'],
};

// ---------------------------------------------------------------------------
// Layout principal
// ---------------------------------------------------------------------------
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const meta = localeMetadata[locale];
  const messages = await getMessages(locale);

  return (
    <html lang={meta.htmlLang} className={`${playfair.variable} ${sourceSans.variable}`}>
      <body
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: '#F5EDE3', color: '#2B1F1A', fontFamily: 'var(--font-body)' }}
      >
        <JsonLd data={organizationSchema} />
        <Navbar locale={locale} messages={messages} />
        <main className="flex-1" style={{ paddingTop: '64px' }}>{children}</main>
        <Footer locale={locale} messages={messages} />
        <Toaster />
      </body>
    </html>
  );
}
