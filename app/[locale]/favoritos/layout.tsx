import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mis Favoritos | Veency',
  description: 'Tus collares artesanales favoritos guardados en Veency.',
  robots: { index: false, follow: false },
};

export default function FavoritosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
