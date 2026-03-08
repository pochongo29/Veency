import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tu Carrito | Veency',
  description: 'Revisa los productos en tu carrito de compras y procede al pago.',
  robots: { index: false, follow: false },
};

export default function CarritoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
