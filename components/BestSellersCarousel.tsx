'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getFeaturedProducts } from '@/data/products';
import type { Locale } from '@/lib/i18n';

interface Props {
  locale: Locale;
}

const products = getFeaturedProducts();

// Ícono flecha SVG
function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === 'left' ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 6 15 12 9 18" />
      )}
    </svg>
  );
}

export default function BestSellersCarousel({ locale }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    // Cada tarjeta ~300px + gap 20px = ~320px. Movernos dos tarjetas a la vez.
    const amount = 640;
    trackRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section style={{ backgroundColor: '#F5EDE3', padding: 'clamp(64px, 9vw, 96px) 0' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingLeft: 'clamp(24px, 6vw, 80px)',
          paddingRight: 'clamp(24px, 6vw, 80px)',
          marginBottom: 'clamp(32px, 5vw, 52px)',
        }}
      >
        <div>
          <span
            style={{
              display: 'block',
              fontSize: '0.62rem',
              fontWeight: 600,
              color: '#B9965B',
              textTransform: 'uppercase',
              letterSpacing: '0.34em',
              marginBottom: '10px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Lo más vendido
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.9rem, 3.2vw, 3rem)',
              fontWeight: 400,
              color: '#2B1F1A',
              margin: 0,
              lineHeight: 1.08,
            }}
          >
            Nuestros favoritos
          </h2>
        </div>

        {/* Controles de navegación */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingBottom: '4px' }}>
          {(['left', 'right'] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              aria-label={dir === 'left' ? 'Anterior' : 'Siguiente'}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1px solid rgba(43,31,26,0.22)',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#2B1F1A',
                transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#2B1F1A';
                e.currentTarget.style.color = '#F5EDE3';
                e.currentTarget.style.borderColor = '#2B1F1A';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#2B1F1A';
                e.currentTarget.style.borderColor = 'rgba(43,31,26,0.22)';
              }}
            >
              <ArrowIcon direction={dir} />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Track del carrusel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'clamp(24px, 6vw, 80px)',
            paddingRight: 'clamp(24px, 6vw, 80px)',
            paddingBottom: '8px',
            scrollbarWidth: 'none',
            // Ocultar scrollbar en webkit
          }}
          // Oculta scrollbar nativamente via className no disponible, usamos pseudo
          className="hide-scrollbar"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.07 }}
              style={{
                flex: '0 0 clamp(220px, 22vw, 290px)',
                scrollSnapAlign: 'start',
              }}
            >
              <Link
                href={`/${locale}/producto/${product.id}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                {/* Imagen cuadrada */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    backgroundColor: '#EDE6D9',
                    marginBottom: '16px',
                  }}
                >
                  <Image
                    src={product.imagen}
                    alt={product.nombre}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.55s ease',
                    }}
                    sizes="(max-width: 768px) 60vw, 22vw"
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                    }}
                  />
                  {product.isNew && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#B9965B',
                        color: '#ffffff',
                        fontSize: '0.58rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-body)',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                      }}
                    >
                      Nuevo
                    </span>
                  )}
                </div>

                {/* Info del producto */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    color: '#B9965B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.22em',
                    margin: '0 0 6px',
                  }}
                >
                  {product.material}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
                    fontWeight: 400,
                    color: '#2B1F1A',
                    margin: '0 0 8px',
                    lineHeight: 1.3,
                  }}
                >
                  {product.nombre}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#2B1F1A',
                    margin: '0 0 14px',
                  }}
                >
                  ${product.precio.toLocaleString('es-MX')} MXN
                </p>

                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-body)',
                    color: '#2B1F1A',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid rgba(43,31,26,0.35)',
                    paddingBottom: '1px',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#B9965B';
                    (e.currentTarget as HTMLElement).style.borderColor = '#B9965B';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#2B1F1A';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(43,31,26,0.35)';
                  }}
                >
                  Ver producto
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
