import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CategoriaClient from './CategoriaClient';
import { getProductsByCategory, categoryLabels, ProductCategory } from '@/data/products';
import { generatePageMetadata, siteConfig } from '@/lib/seo';
import { getMessages, locales, defaultLocale, localeMetadata } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

const validCategories: ProductCategory[] = ['chapa-de-oro', 'shakiras', 'shakirones', 'artesanal'];

const categoryDescriptions: Record<ProductCategory, string> = {
  'chapa-de-oro':
    'Collares de chapa de oro 18k hechos a mano en México. Elegantes, resistentes y únicos. Ideales para uso diario o como regalo especial.',
  shakiras:
    'Collares Shakiras tejidos a mano con mostacillas de vidrio importadas. Diseños bohemios, coloridos y únicos. Joyería artesanal mexicana.',
  shakirones:
    'Collares Shakirones con cuentas grandes en madera, piedras naturales y cerámica artesanal. Presencia y carácter en cada pieza única.',
  artesanal:
    'Collares artesanales en técnicas de macramé, conchitas naturales, hilo dorado y materiales naturales. Cada pieza es irrepetible.',
};

const categoryKeywords: Record<ProductCategory, string[]> = {
  'chapa-de-oro': ['collares chapa de oro México', 'collar chapa de oro 18k artesanal', 'joyería enchapada en oro', 'collar dorado hecho a mano'],
  shakiras: ['collares Shakiras México', 'collares mostacillas artesanales', 'collar bohemio mostacillas', 'shakiras multicolor artesanal'],
  shakirones: ['collares Shakirones México', 'collares cuentas grandes artesanales', 'collar piedras naturales hecho a mano'],
  artesanal: ['collares artesanales México', 'collar macramé artesanal', 'collar conchitas naturales', 'joyería natural artesanal'],
};

interface Props {
  params: Promise<{ locale: string; categoria: string }>;
}

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    for (const categoria of validCategories) {
      params.push({ locale, categoria });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, categoria } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;

  if (!validCategories.includes(categoria as ProductCategory)) {
    return { title: 'Categoría no encontrada' };
  }

  const cat = categoria as ProductCategory;
  const label = categoryLabels[cat];

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[localeMetadata[loc].htmlLang] = `${siteConfig.url}/${loc}/catalogo/${categoria}`;
  }

  return {
    ...generatePageMetadata({
      title: `Collares ${label} | Colección Artesanal`,
      description: categoryDescriptions[cat],
      path: `/${locale}/catalogo/${categoria}`,
      keywords: categoryKeywords[cat],
    }),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/catalogo/${categoria}`,
      languages,
    },
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { locale: rawLocale, categoria } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;

  if (!validCategories.includes(categoria as ProductCategory)) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(categoria as ProductCategory);
  const label = categoryLabels[categoria as ProductCategory];
  const messages = await getMessages(locale);

  return (
    <CategoriaClient
      products={categoryProducts}
      label={label}
      categoria={categoria as ProductCategory}
      messages={messages}
      locale={locale}
    />
  );
}
