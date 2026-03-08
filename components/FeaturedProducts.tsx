'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import type { Locale, Messages } from '@/lib/i18n';

const products = getFeaturedProducts();

interface FeaturedProductsProps {
  messages?: Messages;
  locale?: Locale;
}

export default function FeaturedProducts({ locale }: FeaturedProductsProps) {
  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundColor: '#1A1210',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{
          textAlign: 'center',
          paddingTop: 'clamp(64px, 10vh, 96px)',
          paddingBottom: '48px',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <span style={{
          display: 'block',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: '#D4B483',
          textTransform: 'uppercase',
          letterSpacing: '0.32em',
          marginBottom: '16px',
          fontFamily: 'var(--font-body)',
        }}>
          Los más amados
        </span>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.05,
        }}>
          Productos Destacados
        </h2>
      </motion.div>

      {/* Grid */}
      <div style={{ width: '100%', flex: 1, padding: '0 24px 48px' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>

      {/* CTA inferior */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          padding: '0 24px 64px',
        }}
      >
        <Link
          href={locale ? `/${locale}/catalogo` : '/catalogo'}
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
          Ver catálogo completo
        </Link>

        <Link
          href={locale ? `/${locale}/contacto` : '/contacto'}
          style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            color: '#ffffff',
            padding: '10px 28px',
            borderRadius: '9999px',
            fontWeight: 500,
            fontSize: '0.88rem',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.02em',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(4px)',
            transition: 'background-color 0.2s, transform 0.15s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.transform = 'scale(1.03)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Contactar
        </Link>
      </motion.div>
    </section>
  );
}
