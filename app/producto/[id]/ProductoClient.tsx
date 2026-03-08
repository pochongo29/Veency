'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Product, categoryLabels } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';

interface Props {
  product: Product;
}

export default function ProductoClient({ product }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const favorite = isFavorite(product.id);

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(product.precio);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#F4EFE0', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '32px', fontSize: '0.85rem', color: '#A09070', fontFamily: 'var(--font-body)' }}>
          <Link href="/" style={{ color: '#A09070', textDecoration: 'none' }}>Inicio</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href="/catalogo" style={{ color: '#A09070', textDecoration: 'none' }}>Catalogo</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href={`/catalogo/${product.categoria}`} style={{ color: '#A09070', textDecoration: 'none' }}>
            {categoryLabels[product.categoria]}
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: '#6B7C4E', fontWeight: 600 }}>{product.nombre}</span>
        </nav>

        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              flex: '1',
              minWidth: '300px',
              maxWidth: '480px',
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              aspectRatio: '1/1',
              backgroundColor: '#ede8d6',
              boxShadow: '0 8px 40px rgba(107, 124, 78, 0.15)',
            }}
          >
            <Image
              src={product.imagen}
              alt={product.nombre}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              style={{ objectFit: 'cover' }}
              priority
            />
            {product.isNew && (
              <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: '#6B7C4E', color: '#fff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                Nuevo
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ flex: '1', minWidth: '280px' }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#B87333', textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'var(--font-body)' }}>
              {categoryLabels[product.categoria]}
            </span>

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 700,
              color: '#2E2E2E',
              marginTop: '8px',
              marginBottom: '16px',
              lineHeight: 1.2,
            }}>
              {product.nombre}
            </h1>

            <p style={{ fontSize: '0.9rem', color: '#A09070', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              <strong style={{ color: '#2E2E2E' }}>Material:</strong> {product.material}
            </p>

            <p style={{ fontSize: '0.95rem', color: '#2E2E2E', lineHeight: 1.8, marginBottom: '24px', fontFamily: 'var(--font-body)' }}>
              {product.descripcion}
            </p>

            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#6B7C4E',
              marginBottom: '28px',
            }}>
              {formattedPrice}
            </div>

            {/* Disponibilidad */}
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: product.stock > 0 ? '#6B7C4E' : '#B87333',
              }} />
              <span style={{ fontSize: '0.875rem', color: product.stock > 0 ? '#6B7C4E' : '#B87333', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
                {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
              </span>
            </div>

            {/* Cantidad */}
            {product.stock > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <span style={{ fontSize: '0.875rem', color: '#A09070', fontWeight: 500, fontFamily: 'var(--font-body)' }}>Cantidad:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid rgba(160, 144, 112, 0.4)', borderRadius: '8px', overflow: 'hidden' }}>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{ width: '36px', height: '36px', border: 'none', backgroundColor: '#fff', cursor: 'pointer', fontSize: '1.1rem', color: '#6B7C4E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' }}
                  >
                    -
                  </button>
                  <span style={{ width: '36px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#2E2E2E', lineHeight: '36px', fontFamily: 'var(--font-body)' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    style={{ width: '36px', height: '36px', border: 'none', backgroundColor: '#fff', cursor: 'pointer', fontSize: '1.1rem', color: '#6B7C4E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Acciones */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                style={{
                  flex: 1,
                  minWidth: '160px',
                  padding: '14px 24px',
                  backgroundColor: added ? '#556038' : '#6B7C4E',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                  opacity: product.stock === 0 ? 0.5 : 1,
                  transition: 'background-color 0.2s',
                }}
              >
                {added ? 'Agregado al carrito' : 'Agregar al carrito'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFavorite(product)}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  border: `1px solid ${favorite ? '#B87333' : 'rgba(160, 144, 112, 0.4)'}`,
                  backgroundColor: favorite ? 'rgba(184, 115, 51, 0.08)' : '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
                aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={favorite ? '#B87333' : 'none'} stroke={favorite ? '#B87333' : '#6B7C4E'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </motion.button>
            </div>

            {/* Referencia */}
            <p style={{ marginTop: '24px', fontSize: '0.75rem', color: '#A09070', fontFamily: 'var(--font-body)' }}>
              Referencia: {product.id}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
