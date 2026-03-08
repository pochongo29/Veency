import type { Metadata } from 'next';

// ---------------------------------------------------------------------------
// Metadata del Carrito — con noindex.
// El carrito es una pagina de usuario con estado dinamico en localStorage.
// No tiene valor de SEO y no debe indexarse por los motores de busqueda.
// Se define aqui porque carrito/page.tsx es 'use client'.
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Tu Carrito | Veency',
  description: 'Revisa los productos en tu carrito de compras y procede al pago.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CarritoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
