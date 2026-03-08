'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product, ProductCategory, categoryLabels } from '@/data/products';

interface Props {
  products: Product[];
  label: string;
  categoria: ProductCategory;
}

const allCats: ProductCategory[] = ['chapa-de-oro', 'shakiras', 'shakirones', 'artesanal'];

export default function CategoriaClient({ products, label, categoria }: Props) {
  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#F4EFE0', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '24px', fontSize: '0.85rem', color: '#A09070', fontFamily: 'var(--font-body)' }}>
          <Link href="/" style={{ color: '#A09070', textDecoration: 'none' }}>Inicio</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href="/catalogo" style={{ color: '#A09070', textDecoration: 'none' }}>Catalogo</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: '#6B7C4E', fontWeight: 600 }}>{label}</span>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#2E2E2E',
            marginBottom: '8px',
          }}>
            {label}
          </h1>
          <p style={{ color: '#A09070', fontSize: '0.95rem', fontFamily: 'var(--font-body)' }}>
            {products.length} productos disponibles
          </p>
        </div>

        {/* Tabs de categorias */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
          <Link
            href="/catalogo"
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: '1px solid rgba(160, 144, 112, 0.35)',
              backgroundColor: 'transparent',
              color: '#A09070',
              fontSize: '0.85rem',
              fontWeight: 500,
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
            }}
          >
            Todos
          </Link>
          {allCats.map((cat) => (
            <Link
              key={cat}
              href={`/catalogo/${cat}`}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: `1px solid ${cat === categoria ? '#6B7C4E' : 'rgba(160, 144, 112, 0.35)'}`,
                backgroundColor: cat === categoria ? '#6B7C4E' : 'transparent',
                color: cat === categoria ? '#fff' : '#A09070',
                fontSize: '0.85rem',
                fontWeight: cat === categoria ? 600 : 500,
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              {categoryLabels[cat]}
            </Link>
          ))}
        </div>

        {/* Grid productos */}
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: '#A09070', fontFamily: 'var(--font-body)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Sin productos en esta categoria</p>
            <Link href="/catalogo" style={{ color: '#6B7C4E', fontWeight: 600 }}>Ver todo el catalogo</Link>
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
