import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import BestSellersCarousel from '@/components/BestSellersCarousel';
import HomeEditorial from '@/components/HomeEditorial';
import HomeCategoryGrid from '@/components/HomeCategoryGrid';
import PromesasSection from '@/components/PromesasSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import NewsletterSection from '@/components/NewsletterSection';
import FloatingCatalogButton from '@/components/FloatingCatalogButton';
import JsonLd from '@/components/JsonLd';
import { generatePageMetadata, siteConfig } from '@/lib/seo';
import { getMessages, locales, defaultLocale, localeMetadata } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;

  // hreflang para la home
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[localeMetadata[loc].htmlLang] = `${siteConfig.url}/${loc}`;
  }
  languages['x-default'] = `${siteConfig.url}/es`;

  return {
    ...generatePageMetadata({
      title: 'Collares Artesanales Hechos a Mano en México',
      description:
        'Descubre collares únicos hechos a mano en México. Chapa de oro 18k, Shakiras, Shakirones y materiales naturales. Piezas artesanales con alma y diseño elegante.',
      path: `/${locale}`,
      keywords: [
        'collares artesanales México',
        'collares hechos a mano México',
        'joyería artesanal mexicana',
        'collares de chapa de oro',
        'collares Shakiras',
        'collares Shakirones',
        'joyería hecha a mano CDMX',
        'comprar collares artesanales online',
        'collares únicos elegantes',
        'accesorios artesanales México',
      ],
    }),
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages,
    },
  };
}

const storeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Veency',
  url: siteConfig.url,
  description: siteConfig.description,
  image: siteConfig.ogImage,
  priceRange: '$$',
  currenciesAccepted: 'MXN',
  paymentAccepted: 'Cash, Credit Card',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MX',
    addressLocality: 'Ciudad de México',
    addressRegion: 'CDMX',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Collares Artesanales Veency',
    itemListElement: [
      { '@type': 'OfferCatalog', name: 'Collares de Chapa de Oro', url: `${siteConfig.url}/es/catalogo/chapa-de-oro` },
      { '@type': 'OfferCatalog', name: 'Collares Shakiras', url: `${siteConfig.url}/es/catalogo/shakiras` },
      { '@type': 'OfferCatalog', name: 'Collares Shakirones', url: `${siteConfig.url}/es/catalogo/shakirones` },
      { '@type': 'OfferCatalog', name: 'Collares Artesanales', url: `${siteConfig.url}/es/catalogo/artesanal` },
    ],
  },
};

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const messages = await getMessages(locale);

  return (
    <>
      <JsonLd data={storeSchema} />
      <HeroSection messages={messages} locale={locale} />
      <BestSellersCarousel locale={locale} />
      <HomeEditorial locale={locale} />
      <HomeCategoryGrid locale={locale} />
      <PromesasSection />
      <FeaturedProducts messages={messages} locale={locale} />
      <NewsletterSection />
      <FloatingCatalogButton locale={locale} />
    </>
  );
}
