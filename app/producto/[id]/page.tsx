import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductoClient from './ProductoClient';
import JsonLd from '@/components/JsonLd';
import { getProductById, products } from '@/data/products';
import { generatePageMetadata, siteConfig } from '@/lib/seo';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) return { title: 'Producto no encontrado' };

  return generatePageMetadata({
    title: product.nombre,
    description: `${product.descripcion} Material: ${product.material}. Collar artesanal hecho a mano en México.`,
    path: `/producto/${product.id}`,
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
  });
}

export default async function ProductoPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  // ---------------------------------------------------------------------------
  // JSON-LD: Schema de Producto — especifico para cada producto.
  // Permite que Google muestre rich snippets con precio y disponibilidad
  // directamente en los resultados de busqueda.
  // ---------------------------------------------------------------------------
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nombre,
    description: product.descripcion,
    image: product.imagen,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Veency',
    },
    material: product.material,
    category: product.categoria,
    offers: {
      '@type': 'Offer',
      price: product.precio,
      priceCurrency: 'MXN',
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Veency',
        url: siteConfig.url,
      },
      url: `${siteConfig.url}/producto/${product.id}`,
    },
  };

  return (
    <>
      {/* JSON-LD de producto — especifico para esta pagina */}
      <JsonLd data={productSchema} />
      <ProductoClient product={product} />
    </>
  );
}
