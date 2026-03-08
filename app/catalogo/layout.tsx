import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

// ---------------------------------------------------------------------------
// Metadata del Catalogo principal.
// Se define en layout.tsx porque catalogo/page.tsx es 'use client'.
// Este layout aplica a /catalogo pero NO a /catalogo/[categoria],
// ya que cada subcarpeta tiene su propio generateMetadata.
// ---------------------------------------------------------------------------
export const metadata: Metadata = generatePageMetadata({
  title: 'Catálogo | Collares Artesanales Únicos',
  description:
    'Explora todo el catálogo de Veency: collares de chapa de oro, Shakiras, Shakirones y materiales naturales. Filtra por categoría y precio. Piezas únicas hechas a mano en México.',
  path: '/catalogo',
  keywords: [
    'catálogo collares artesanales',
    'collares de chapa de oro México',
    'collares Shakiras mostacillas',
    'collares Shakirones cuentas grandes',
    'collares artesanales naturales',
    'comprar collares online México',
    'joyería artesanal catálogo',
    'collares únicos precio',
    'collares hechos a mano catálogo',
    'filtrar collares por categoría',
  ],
});

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
