'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Product, categoryLabels } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useToastStore } from '@/store/toastStore';
import type { Messages, Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';

interface Props {
  product: Product;
  messages: Messages;
  locale: Locale;
}

export default function ProductoClient({ product, messages, locale }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const addToast = useToastStore((s) => s.addToast);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Galería: imagen principal + extras
  const allImages = [product.imagen, ...(product.galeria ?? [])];
  const [selectedIdx, setSelectedIdx] = useState(0);

  const favorite = isFavorite(product.id);

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(product.precio);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    addToast(`"${product.nombre}" agregado al carrito`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#F5EDE3', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '32px', fontSize: '0.85rem', color: '#8A7060', fontFamily: 'var(--font-body)' }}>
          <Link href={`/${locale}`} style={{ color: '#8A7060', textDecoration: 'none' }}>
            {t(messages, 'product.breadcrumb.home')}
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href={`/${locale}/catalogo`} style={{ color: '#8A7060', textDecoration: 'none' }}>
            {t(messages, 'product.breadcrumb.catalog')}
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href={`/${locale}/catalogo/${product.categoria}`} style={{ color: '#8A7060', textDecoration: 'none' }}>
            {t(messages, `categories.${product.categoria}`) || categoryLabels[product.categoria]}
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: '#B9965B', fontWeight: 600 }}>{product.nombre}</span>
        </nav>

        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Galería de imágenes */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1', minWidth: '300px', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {/* Imagen principal */}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              aspectRatio: '1/1',
              backgroundColor: '#EDE6D9',
              boxShadow: '0 8px 40px rgba(107, 124, 78, 0.15)',
            }}>
              <Image
                key={selectedIdx}
                src={allImages[selectedIdx]}
                alt={`${product.nombre} — imagen ${selectedIdx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                style={{ objectFit: 'cover', transition: 'opacity 0.25s ease' }}
                priority={selectedIdx === 0}
              />
              {product.isNew && (
                <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: '#B9965B', color: '#fff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  {t(messages, 'product.new')}
                </div>
              )}
            </div>

            {/* Thumbnails — solo si hay más de 1 imagen */}
            {allImages.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIdx(idx)}
                    aria-label={`Ver imagen ${idx + 1}`}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: idx === selectedIdx
                        ? '2px solid #B98C73'
                        : '2px solid transparent',
                      padding: 0,
                      cursor: 'pointer',
                      position: 'relative',
                      backgroundColor: '#EDE6D9',
                      flexShrink: 0,
                      transition: 'border-color 0.15s',
                      opacity: idx === selectedIdx ? 1 : 0.65,
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="72px"
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                ))}
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
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#B98C73', textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'var(--font-body)' }}>
              {t(messages, `categories.${product.categoria}`) || categoryLabels[product.categoria]}
            </span>

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 700,
              color: '#2B1F1A',
              marginTop: '8px',
              marginBottom: '16px',
              lineHeight: 1.2,
            }}>
              {product.nombre}
            </h1>

            <p style={{ fontSize: '0.9rem', color: '#8A7060', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              <strong style={{ color: '#2B1F1A' }}>{t(messages, 'product.material')}:</strong> {product.material}
            </p>

            <p style={{ fontSize: '0.95rem', color: '#2B1F1A', lineHeight: 1.8, marginBottom: '24px', fontFamily: 'var(--font-body)' }}>
              {product.descripcion}
            </p>

            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#B9965B',
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
                backgroundColor: product.stock > 0 ? '#B9965B' : '#B98C73',
              }} />
              <span style={{ fontSize: '0.875rem', color: product.stock > 0 ? '#B9965B' : '#B98C73', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
                {product.stock > 0
                  ? `${product.stock} ${t(messages, 'product.inStock')}`
                  : t(messages, 'product.outOfStock')}
              </span>
            </div>

            {/* Cantidad */}
            {product.stock > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <span style={{ fontSize: '0.875rem', color: '#8A7060', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
                  {t(messages, 'product.quantity')}:
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid rgba(160, 144, 112, 0.4)', borderRadius: '8px', overflow: 'hidden' }}>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{ width: '36px', height: '36px', border: 'none', backgroundColor: '#fff', cursor: 'pointer', fontSize: '1.1rem', color: '#B9965B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' }}
                  >
                    -
                  </button>
                  <span style={{ width: '36px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#2B1F1A', lineHeight: '36px', fontFamily: 'var(--font-body)' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    style={{ width: '36px', height: '36px', border: 'none', backgroundColor: '#fff', cursor: 'pointer', fontSize: '1.1rem', color: '#B9965B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' }}
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
                  backgroundColor: added ? '#A07C42' : '#B9965B',
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
                {added ? t(messages, 'product.addedToCart') : t(messages, 'product.addToCart')}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFavorite(product)}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  border: `1px solid ${favorite ? '#B98C73' : 'rgba(160, 144, 112, 0.4)'}`,
                  backgroundColor: favorite ? 'rgba(184, 115, 51, 0.08)' : '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
                aria-label={favorite ? t(messages, 'product.removeFromFavorites') : t(messages, 'product.addToFavorites')}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={favorite ? '#B98C73' : 'none'} stroke={favorite ? '#B98C73' : '#B9965B'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </motion.button>
            </div>

            {/* Referencia */}
            <p style={{ marginTop: '24px', fontSize: '0.75rem', color: '#8A7060', fontFamily: 'var(--font-body)' }}>
              {t(messages, 'product.reference')}: {product.id}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
