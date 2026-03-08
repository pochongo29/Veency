import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CategoriaClient from './CategoriaClient';
import { getProductsByCategory, categoryLabels, ProductCategory } from '@/data/products';
import { generatePageMetadata } from '@/lib/seo';

const validCategories: ProductCategory[] = ['chapa-de-oro', 'shakiras', 'shakirones', 'artesanal'];

// Descripciones especificas por categoria para mejor SEO
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
  'chapa-de-oro': [
    'collares chapa de oro México',
    'collar chapa de oro 18k artesanal',
    'joyería enchapada en oro',
    'collar dorado hecho a mano',
    'chapa de oro artesanal',
    'collar corazón chapa de oro',
    'gargantilla dorada artesanal',
  ],
  shakiras: [
    'collares Shakiras México',
    'collares mostacillas artesanales',
    'collar bohemio mostacillas',
    'joyería de mostacillas hecha a mano',
    'collares tejidos mostacilla',
    'shakiras multicolor artesanal',
    'collar boho artesanal',
  ],
  shakirones: [
    'collares Shakirones México',
    'collares cuentas grandes artesanales',
    'collar piedras naturales hecho a mano',
    'collar madera artesanal',
    'joyería cuentas grandes México',
    'collar cerámica artesanal',
    'shakirones semillas naturales',
  ],
  artesanal: [
    'collares artesanales México',
    'collar macramé artesanal',
    'collar conchitas naturales',
    'joyería natural artesanal',
    'collar hilo artesanal',
    'collar materiales naturales México',
    'joyería bohemia artesanal',
  ],
};

interface Props {
  params: Promise<{ categoria: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;

  if (!validCategories.includes(categoria as ProductCategory)) {
    return { title: 'Categoría no encontrada' };
  }

  const cat = categoria as ProductCategory;
  const label = categoryLabels[cat];

  return generatePageMetadata({
    title: `Collares ${label} | Colección Artesanal`,
    description: categoryDescriptions[cat],
    path: `/catalogo/${categoria}`,
    keywords: categoryKeywords[cat],
  });
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;

  if (!validCategories.includes(categoria as ProductCategory)) {
    notFound();
  }

  const products = getProductsByCategory(categoria as ProductCategory);
  const label = categoryLabels[categoria as ProductCategory];

  return <CategoriaClient products={products} label={label} categoria={categoria as ProductCategory} />;
}
