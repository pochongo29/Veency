'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';

// ─── Imágenes stock de Unsplash (reemplazar con fotos reales de Veency) ───────
const HERO_IMG =
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85';

const categories = [
  {
    slug: 'chapa-de-oro',
    label: 'Chapa de Oro',
    sub: 'Baño en oro 18k',
    image:
      'https://images.unsplash.com/photo-1573408301185-9519f94815b1?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'shakirones',
    label: 'Shakirones',
    sub: 'Cuentas de impacto',
    image:
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'artesanal',
    label: 'Artesanal',
    sub: 'Macramé y natural',
    image:
      'https://images.unsplash.com/photo-1627756781760-17c0217d9a3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'shakiras',
    label: 'Shakiras',
    sub: 'Mostacillas de vidrio',
    image:
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?auto=format&fit=crop&w=800&q=80',
  },
];

const spotlights = [
  {
    slug: 'shakirones',
    label: 'Lo más vendido',
    title: 'Estilo que\nhabla por ti',
    desc: 'Cuentas grandes, presencia real. Shakirones hechos a mano para el hombre que no pasa desapercibido.',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    align: 'left' as const,
  },
  {
    slug: 'artesanal',
    label: 'Nueva Colección',
    title: 'Natural,\nsobre todo',
    desc: 'Materiales de la tierra, trabajados por manos artesanas mexicanas. Piezas únicas con carácter propio.',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
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

export default function ParaEllosSection({ locale }: Props) {
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
        {/* Texto izquierda (invertido respecto a Para Ellas) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(48px, 8vw, 100px) clamp(36px, 6vw, 80px)',
            backgroundColor: '#1A1210',
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
                color: '#D4B483',
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
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: '24px',
                letterSpacing: '-0.01em',
              }}
            >
              Para ellos,<br />
              <em style={{ fontStyle: 'italic', color: '#D4B483' }}>estilo propio</em>
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.8,
                marginBottom: '40px',
                maxWidth: '400px',
              }}
            >
              Collares artesanales para el hombre que cuida su imagen.
              Piezas únicas, hechas a mano en México, con materiales
              que duran y que dicen algo.
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
                  backgroundColor: '#B9965B',
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
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#A07C42'; }}
                onMouseOut={(e)  => { e.currentTarget.style.backgroundColor = '#B9965B'; }}
              >
                Ver colección
              </Link>

              <Link
                href={`/${locale}/nosotros`}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 400,
                  fontFamily: 'var(--font-body)',
                  color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  paddingBottom: '2px',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
              >
                Nuestra historia
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Imagen derecha */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src={HERO_IMG}
            alt="Para Ellos — Veency"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            sizes="50vw"
            priority
          />
          {/* Overlay sutil para profundidad */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(26,18,16,0.25) 0%, transparent 40%)',
          }} />
        </div>
      </div>

      {/* ── 2. SHOP BY CATEGORY — 4 tarjetas ──────────────────────────────── */}
      <div style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)',
        backgroundColor: '#F5EDE3',
      }}>

        {/* Header */}
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
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '3 / 4',
                    overflow: 'hidden',
                    backgroundColor: '#2B1F1A',
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
                }}>
                  Explorar →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 3. SPOTLIGHTS ──────────────────────────────────────────────────── */}
      {spotlights.map((spot, i) => (
        <motion.div
          key={spot.slug + i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: 'easeOut' as const }}
          style={{
            display: 'grid',
            gridTemplateColumns: spot.align === 'left' ? '55% 45%' : '45% 55%',
            minHeight: '72vh',
            backgroundColor: i % 2 === 0 ? '#1A1210' : '#2B1F1A',
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
              color: '#D4B483',
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
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '20px',
              whiteSpace: 'pre-line',
            }}>
              {spot.title}
            </h3>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.97rem',
              color: 'rgba(255,255,255,0.5)',
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
                color: '#D4B483',
                textDecoration: 'none',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(212,180,131,0.5)',
                paddingBottom: '2px',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#D4B483';
                e.currentTarget.style.borderColor = 'rgba(212,180,131,0.5)';
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
