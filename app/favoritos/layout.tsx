import type { Metadata } from 'next';

// ---------------------------------------------------------------------------
// Metadata de Favoritos — con noindex.
// Los favoritos son estado personal del usuario almacenado en localStorage.
// No tiene valor de SEO y cada usuario ve contenido diferente.
// Se define aqui porque favoritos/page.tsx es 'use client'.
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Mis Favoritos | Veency',
  description: 'Tu colección personal de collares artesanales favoritos en Veency.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function FavoritosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
