'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale, Messages } from '@/lib/i18n';

const categories = [
  {
    slug: 'chapa-de-oro',
    label: 'Chapa de Oro',
    description: 'Elegancia y brillo dorado en cada detalle.',
    image:
      'https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=1920&q=80',
  },
  {
    slug: 'shakiras',
    label: 'Shakiras',
    description: 'Mostacillas de vidrio tejidas a mano, colores vibrantes.',
    image:
      'https://images.unsplash.com/photo-1579624054375-72037da740e5?auto=format&fit=crop&w=1920&q=80',
  },
  {
    slug: 'shakirones',
    label: 'Shakirones',
    description: 'Cuentas grandes de impacto, presencia y carácter.',
    image:
      'https://images.unsplash.com/photo-1595208599319-c1dcf5776170?auto=format&fit=crop&w=1920&q=80',
  },
  {
    slug: 'artesanal',
    label: 'Artesanal',
    description: 'Materiales naturales, macramé, conchitas y más.',
    image:
      'https://images.unsplash.com/photo-1627756781760-17c0217d9a3e?auto=format&fit=crop&w=1920&q=80',
  },
];

interface CategoriesSectionProps {
  messages: Messages;
  locale: Locale;
}

// Tesla-style: cada categoría ocupa 100vh con imagen de fondo completa
export default function CategoriesSection({ locale }: CategoriesSectionProps) {
  return (
    <>
      {categories.map((cat) => (
        <section
          key={cat.slug}
          style={{
            height: '100vh',
            scrollSnapAlign: 'start',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
            backgroundImage: `url(${cat.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay oscuro: más intenso abajo para leer los CTAs */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.68) 100%)',
              zIndex: 1,
            }}
          />

          {/* Título arriba */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              padding: '120px 24px 0',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '14px',
                lineHeight: 1.1,
              }}
            >
              {cat.label}
            </h2>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                color: 'rgba(255,255,255,0.75)',
                fontFamily: 'var(--font-body)',
                maxWidth: '480px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              {cat.description}
            </p>
          </motion.div>

          {/* CTAs abajo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              padding: '0 24px 72px',
            }}
          >
            <Link
              href={`/${locale}/catalogo/${cat.slug}`}
              style={{
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                padding: '10px 28px',
                borderRadius: '9999px',
                fontWeight: 500,
                fontSize: '0.88rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.02em',
                transition: 'background-color 0.2s, transform 0.15s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e0e0e0';
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Ver colección
            </Link>

            <Link
              href={`/${locale}/catalogo`}
              style={{
                backgroundColor: 'rgba(255,255,255,0.12)',
                color: '#ffffff',
                padding: '10px 28px',
                borderRadius: '9999px',
                fontWeight: 500,
                fontSize: '0.88rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.02em',
                border: '1px solid rgba(255,255,255,0.55)',
                backdropFilter: 'blur(4px)',
                transition: 'background-color 0.2s, transform 0.15s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.22)';
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Ver catálogo
            </Link>
          </motion.div>
        </section>
      ))}
    </>
  );
}
