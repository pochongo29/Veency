import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductoClient from './ProductoClient';
import JsonLd from '@/components/JsonLd';
import { getProductById, products } from '@/data/products';
import { generatePageMetadata, siteConfig } from '@/lib/seo';
import { getMessages, locales, defaultLocale, localeMetadata } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    for (const product of products) {
      params.push({ locale, id: product.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, id } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const product = getProductById(id);

  if (!product) return { title: 'Producto no encontrado' };

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[localeMetadata[loc].htmlLang] = `${siteConfig.url}/${loc}/producto/${id}`;
  }

  return {
    ...generatePageMetadata({
      title: product.nombre,
      description: `${product.descripcion} Material: ${product.material}. Collar artesanal hecho a mano en México.`,
      path: `/${locale}/producto/${product.id}`,
      image: product.imagen,
      keywords: [
        product.nombre.toLowerCase(),
        `collar ${product.material.toLowerCase()}`,
        'collar artesanal hecho a mano',
        'collar artesanal México',
        `comprar ${product.nombre.toLowerCase()}`,
        'joyería artesanal única',
        product.material.toLowerCase(),
      ],
    }),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/producto/${id}`,
      languages,
    },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { locale: rawLocale, id } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const product = getProductById(id);

  if (!product) notFound();

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nombre,
    description: product.descripcion,
    image: product.imagen,
    sku: product.id,
    brand: { '@type': 'Brand', name: 'Veency' },
    material: product.material,
    category: product.categoria,
    offers: {
      '@type': 'Offer',
      price: product.precio,
      priceCurrency: 'MXN',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'Veency', url: siteConfig.url },
      url: `${siteConfig.url}/${locale}/producto/${product.id}`,
    },
  };

  const messages = await getMessages(locale);

  return (
    <>
      <JsonLd data={productSchema} />
      <ProductoClient product={product} messages={messages} locale={locale} />
    </>
  );
}
