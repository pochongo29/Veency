'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';

interface Props {
  locale: Locale;
}

const categories = [
  {
    slug: 'chapa-de-oro',
    label: 'Chapa de Oro',
    sub: 'Baño en oro 18k',
    image: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'shakiras',
    label: 'Shakiras',
    sub: 'Mostacillas de vidrio',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'shakirones',
    label: 'Shakirones',
    sub: 'Cuentas grandes',
    image: 'https://images.unsplash.com/photo-1576022162028-59e8ba1e72f1?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'artesanal',
    label: 'Artesanal',
    sub: 'Macramé y natural',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
};

export default function HomeCategoryGrid({ locale }: Props) {
  return (
    <section
      style={{
        backgroundColor: '#F5EDE3',
        padding: 'clamp(64px, 9vw, 96px) clamp(24px, 5vw, 80px)',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(36px, 5vw, 56px)',
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
            Comprar por
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
            Categoría
          </h2>
        </div>

        <Link
          href={`/${locale}/catalogo`}
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            color: '#2B1F1A',
            textDecoration: 'none',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            borderBottom: '1px solid #2B1F1A',
            paddingBottom: '2px',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = '#B9965B';
            e.currentTarget.style.borderColor = '#B9965B';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = '#2B1F1A';
            e.currentTarget.style.borderColor = '#2B1F1A';
          }}
        >
          Ver todo
        </Link>
      </motion.div>

      {/* Grid 4 columnas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(12px, 2vw, 22px)',
        }}
      >
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={cardVariants}
          >
            <Link
              href={`/${locale}/catalogo/${cat.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              {/* Imagen portrait 3:4 */}
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '3 / 4',
                  overflow: 'hidden',
                  backgroundColor: '#DDD3C4',
                  marginBottom: '16px',
                }}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.6s ease',
                  }}
                  sizes="25vw"
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                  }}
                />
              </div>

              {/* Sub-label dorado */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  color: '#B9965B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  margin: '0 0 5px',
                }}
              >
                {cat.sub}
              </p>

              {/* Nombre de categoría */}
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1rem, 1.4vw, 1.3rem)',
                  fontWeight: 400,
                  color: '#2B1F1A',
                  margin: '0 0 8px',
                }}
              >
                {cat.label}
              </p>

              {/* CTA */}
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: '#8A7060',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(138,112,96,0.45)',
                  paddingBottom: '1px',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#B9965B';
                  (e.currentTarget as HTMLElement).style.borderColor = '#B9965B';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#8A7060';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138,112,96,0.45)';
                }}
              >
                Explorar →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
