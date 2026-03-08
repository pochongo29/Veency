'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product, ProductCategory, categoryLabels } from '@/data/products';
import type { Messages, Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';

interface Props {
  products: Product[];
  label: string;
  categoria: ProductCategory;
  messages: Messages;
  locale: Locale;
}

const allCats: ProductCategory[] = ['chapa-de-oro', 'shakiras', 'shakirones', 'artesanal'];

export default function CategoriaClient({ products, label, categoria, messages, locale }: Props) {
  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#F5EDE3', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '24px', fontSize: '0.85rem', color: '#8A7060', fontFamily: 'var(--font-body)' }}>
          <Link href={`/${locale}`} style={{ color: '#8A7060', textDecoration: 'none' }}>
            {t(messages, 'product.breadcrumb.home')}
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href={`/${locale}/catalogo`} style={{ color: '#8A7060', textDecoration: 'none' }}>
            {t(messages, 'product.breadcrumb.catalog')}
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: '#B9965B', fontWeight: 600 }}>{label}</span>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#2B1F1A',
            marginBottom: '8px',
          }}>
            {label}
          </h1>
          <p style={{ color: '#8A7060', fontSize: '0.95rem', fontFamily: 'var(--font-body)' }}>
            {products.length} {t(messages, 'catalog.available')}
          </p>
        </div>

        {/* Tabs de categorias */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
          <Link
            href={`/${locale}/catalogo`}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: '1px solid rgba(160, 144, 112, 0.35)',
              backgroundColor: 'transparent',
              color: '#8A7060',
              fontSize: '0.85rem',
              fontWeight: 500,
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
            }}
          >
            {t(messages, 'catalog.tabs.all')}
          </Link>
          {allCats.map((cat) => (
            <Link
              key={cat}
              href={`/${locale}/catalogo/${cat}`}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: `1px solid ${cat === categoria ? '#B9965B' : 'rgba(160, 144, 112, 0.35)'}`,
                backgroundColor: cat === categoria ? '#B9965B' : 'transparent',
                color: cat === categoria ? '#fff' : '#8A7060',
                fontSize: '0.85rem',
                fontWeight: cat === categoria ? 600 : 500,
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              {t(messages, `categories.${cat}`) || categoryLabels[cat]}
            </Link>
          ))}
        </div>

        {/* Grid productos */}
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: '#8A7060', fontFamily: 'var(--font-body)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{t(messages, 'catalog.noResults')}</p>
            <Link href={`/${locale}/catalogo`} style={{ color: '#B9965B', fontWeight: 600 }}>
              {t(messages, 'product.breadcrumb.catalog')}
            </Link>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
