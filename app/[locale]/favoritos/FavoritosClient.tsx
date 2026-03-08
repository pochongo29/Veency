'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useCartStore } from '@/store/cartStore';
import type { Messages, Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';

interface Props {
  messages: Messages;
  locale: Locale;
}

export default function FavoritosClient({ messages, locale }: Props) {
  const favorites = useFavoritesStore((s) => s.favorites);
  const removeFromFavorites = useFavoritesStore((s) => s.removeFromFavorites);
  const addToCart = useCartStore((s) => s.addToCart);

  if (favorites.length === 0) {
    return (
      <div style={{ minHeight: '70vh', backgroundColor: '#F5EDE3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '20px' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#8A7060" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: '#2B1F1A', marginBottom: '12px' }}>
            {t(messages, 'favorites.empty')}
          </h1>
          <p style={{ color: '#8A7060', marginBottom: '28px', fontSize: '1rem', fontFamily: 'var(--font-body)' }}>
            {t(messages, 'favorites.emptySub')}
          </p>
          <Link
            href={`/${locale}/catalogo`}
            style={{ display: 'inline-block', backgroundColor: '#B9965B', color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem', fontFamily: 'var(--font-body)' }}
          >
            {t(messages, 'favorites.emptyCta')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '70vh', backgroundColor: '#F5EDE3', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{ marginBottom: '36px' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#B98C73', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>
            {t(messages, 'favorites.badge')}
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#2B1F1A' }}>
            {t(messages, 'favorites.title')} ({favorites.length})
          </h1>
        </div>

        <AnimatePresence>
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}
          >
            {favorites.map((product) => {
              const formattedPrice = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(product.precio);

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(160, 144, 112, 0.2)', boxShadow: '0 2px 12px rgba(107, 124, 78, 0.1)', display: 'flex', flexDirection: 'column' }}
                >
                  <Link href={`/${locale}/producto/${product.id}`} style={{ display: 'block', position: 'relative', paddingBottom: '80%', backgroundColor: '#ede8d6' }}>
                    <Image src={product.imagen} alt={product.nombre} fill sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                  </Link>

                  <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#B98C73', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-body)' }}>
                      {t(messages, `categories.${product.categoria}`)}
                    </span>
                    <Link href={`/${locale}/producto/${product.id}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, color: '#2B1F1A', lineHeight: 1.3 }}>
                        {product.nombre}
                      </h3>
                    </Link>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#B9965B' }}>
                      {formattedPrice}
                    </span>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => addToCart(product, 1)}
                        style={{ flex: 1, padding: '9px 12px', backgroundColor: '#B9965B', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer' }}
                      >
                        {t(messages, 'favorites.addToCart')}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeFromFavorites(product.id)}
                        style={{ width: '38px', height: '38px', borderRadius: '8px', border: '1px solid rgba(184, 115, 51, 0.3)', backgroundColor: 'rgba(184, 115, 51, 0.05)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                        aria-label={t(messages, 'favorites.remove')}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#B98C73" stroke="#B98C73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
