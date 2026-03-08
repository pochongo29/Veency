'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';

// ─── Imágenes stock de Unsplash (reemplazar con fotos reales de Veency) ───────
const HERO_IMG =
  'https://images.unsplash.com/photo-1529467937013-eb7fcea5a862?auto=format&fit=crop&w=1200&q=85';

const categories = [
  {
    slug: 'chapa-de-oro',
    label: 'Chapa de Oro',
    sub: 'Baño en oro 18k',
    image:
      'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'shakiras',
    label: 'Shakiras',
    sub: 'Mostacillas de vidrio',
    image:
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'shakirones',
    label: 'Shakirones',
    sub: 'Cuentas grandes',
    image:
      'https://images.unsplash.com/photo-1576022162028-59e8ba1e72f1?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'artesanal',
    label: 'Artesanal',
    sub: 'Macramé y natural',
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  },
];

// Colección spotlight (segunda fila editorial)
const spotlights = [
  {
    slug: 'chapa-de-oro',
    label: 'Nueva Colección',
    title: 'Oro que\ndura para siempre',
    desc: 'Piezas bañadas en oro 18k, diseñadas para durar y brillar cada día.',
    image:
      'https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=900&q=80',
    align: 'left' as const,
  },
  {
    slug: 'shakiras',
    label: 'Lo más vendido',
    title: 'Color y\nlibre expresión',
    desc: 'Tejidas a mano con mostacillas de vidrio importadas. Cada pieza es única.',
    image:
      'https://images.unsplash.com/photo-1589422453619-3171862e49d2?auto=format&fit=crop&w=900&q=80',
    align: 'right' as const,
  },
];

interface Props {
  locale: Locale;
}

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
};

export default function ParaEllasSection({ locale }: Props) {
  return (
    <section style={{ backgroundColor: '#F5EDE3' }}>

      {/* ── 1. EDITORIAL HERO SPLIT ─────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '88vh',
        }}
      >
        {/* Imagen izquierda */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src={HERO_IMG}
            alt="Para Ellas — Veency"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            sizes="50vw"
            priority
          />
        </div>

        {/* Texto derecha */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(48px, 8vw, 100px) clamp(36px, 6vw, 80px)',
            backgroundColor: '#EDE6D9',
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.span
              custom={0}
              variants={fadeUp}
              style={{
                display: 'block',
                fontSize: '0.65rem',
                fontWeight: 600,
                color: '#B9965B',
                textTransform: 'uppercase',
                letterSpacing: '0.32em',
                marginBottom: '24px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Colección 2025
            </motion.span>

            <motion.h2
              custom={1}
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 4vw, 4rem)',
                fontWeight: 400,
                color: '#2B1F1A',
                lineHeight: 1.1,
                marginBottom: '24px',
                letterSpacing: '-0.01em',
              }}
            >
              Para ellas,<br />
              <em style={{ fontStyle: 'italic', color: '#B9965B' }}>hecho a mano</em>
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                color: '#8A7060',
                lineHeight: 1.8,
                marginBottom: '40px',
                maxWidth: '400px',
              }}
            >
              Cada collar Veency nace de manos artesanas mexicanas.
              Materiales seleccionados, diseño único, una pieza que
              cuenta tu historia.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              style={{ display: 'flex', gap: '28px', alignItems: 'center' }}
            >
              <Link
                href={`/${locale}/catalogo`}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#2B1F1A',
                  color: '#ffffff',
                  padding: '14px 32px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#B9965B'; }}
                onMouseOut={(e)  => { e.currentTarget.style.backgroundColor = '#2B1F1A'; }}
              >
                Ver colección
              </Link>

              <Link
                href={`/${locale}/nosotros`}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 400,
                  fontFamily: 'var(--font-body)',
                  color: '#8A7060',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(138,112,96,0.4)',
                  paddingBottom: '2px',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = '#2B1F1A'; }}
                onMouseOut={(e)  => { e.currentTarget.style.color = '#8A7060'; }}
              >
                Nuestra historia
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── 2. SHOP BY CATEGORY — 4 tarjetas ──────────────────────────────── */}
      <div style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)' }}>

        {/* Header de sección */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'clamp(32px, 5vw, 52px)',
          }}
        >
          <div>
            <span style={{
              display: 'block',
              fontSize: '0.62rem',
              fontWeight: 600,
              color: '#B9965B',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginBottom: '10px',
              fontFamily: 'var(--font-body)',
            }}>
              Comprar por
            </span>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 400,
              color: '#2B1F1A',
              margin: 0,
              lineHeight: 1.1,
            }}>
              Categoría
            </h3>
          </div>

          <Link
            href={`/${locale}/catalogo`}
            style={{
              fontSize: '0.75rem',
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
            gap: 'clamp(12px, 2vw, 20px)',
          }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
            >
              <Link
                href={`/${locale}/catalogo/${cat.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                {/* Imagen portrait */}
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

                {/* Texto debajo */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  color: '#B9965B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  margin: '0 0 5px',
                }}>
                  {cat.sub}
                </p>
                <p style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1rem, 1.4vw, 1.3rem)',
                  fontWeight: 400,
                  color: '#2B1F1A',
                  margin: '0 0 8px',
                }}>
                  {cat.label}
                </p>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#8A7060',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(138,112,96,0.45)',
                  paddingBottom: '1px',
                  transition: 'color 0.2s',
                }}>
                  Explorar →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 3. SPOTLIGHTS — dos colecciones en detalle ────────────────────── */}
      {spotlights.map((spot, i) => (
        <motion.div
          key={spot.slug + i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          style={{
            display: 'grid',
            gridTemplateColumns: spot.align === 'left' ? '55% 45%' : '45% 55%',
            minHeight: '72vh',
            backgroundColor: i % 2 === 0 ? '#EDE6D9' : '#F5EDE3',
          }}
        >
          {/* Imagen */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              order: spot.align === 'left' ? 0 : 1,
            }}
          >
            <Image
              src={spot.image}
              alt={spot.title}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="55vw"
            />
          </div>

          {/* Texto */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(40px, 7vw, 90px) clamp(32px, 6vw, 72px)',
              order: spot.align === 'left' ? 1 : 0,
            }}
          >
            <span style={{
              display: 'block',
              fontSize: '0.6rem',
              fontWeight: 600,
              color: '#B9965B',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginBottom: '20px',
              fontFamily: 'var(--font-body)',
            }}>
              {spot.label}
            </span>

            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 3.2vw, 3.2rem)',
              fontWeight: 400,
              color: '#2B1F1A',
              lineHeight: 1.1,
              marginBottom: '20px',
              whiteSpace: 'pre-line',
            }}>
              {spot.title}
            </h3>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.97rem',
              color: '#8A7060',
              lineHeight: 1.8,
              marginBottom: '36px',
              maxWidth: '360px',
            }}>
              {spot.desc}
            </p>

            <Link
              href={`/${locale}/catalogo/${spot.slug}`}
              style={{
                alignSelf: 'flex-start',
                fontSize: '0.75rem',
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
              Ver colección
            </Link>
          </div>
        </motion.div>
      ))}

    </section>
  );
}
