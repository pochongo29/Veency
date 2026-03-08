'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Product, categoryLabels } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useToastStore } from '@/store/toastStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const addToast = useToastStore((s) => s.addToast);
  const [added, setAdded] = useState(false);

  const favorite = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(true);
    addToast(`"${product.nombre}" agregado al carrito`);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(product.precio);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(185, 150, 91, 0.1)',
        border: '1px solid rgba(160, 144, 112, 0.2)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Badges */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {product.isNew && (
          <span style={{
            backgroundColor: '#B9965B',
            color: '#fff',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            padding: '3px 8px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
          }}>
            Nuevo
          </span>
        )}
        {product.isBestSeller && (
          <span style={{
            backgroundColor: '#B98C73',
            color: '#fff',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            padding: '3px 8px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
          }}>
            Favorito
          </span>
        )}
      </div>

      {/* Boton favorito */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggleFavorite}
        aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: 'rgba(244, 239, 224, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={favorite ? '#B98C73' : 'none'}
          stroke={favorite ? '#B98C73' : '#B9965B'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </motion.button>

      {/* Imagen */}
      <Link href={`/producto/${product.id}`} className="block" style={{ position: 'relative', paddingBottom: '100%', backgroundColor: '#EDE6D9' }}>
        <Image
          src={product.imagen}
          alt={product.nombre}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
          className="hover:scale-105"
        />
        {product.stock === 0 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255,255,255,0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontWeight: 600, color: '#8A7060', fontSize: '0.9rem', letterSpacing: '0.05em', fontFamily: 'var(--font-body)' }}>
              Agotado
            </span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <span style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#B98C73',
          fontFamily: 'var(--font-body)',
        }}>
          {categoryLabels[product.categoria]}
        </span>

        <Link href={`/producto/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#2B1F1A',
            lineHeight: 1.3,
            marginBottom: '4px',
          }}>
            {product.nombre}
          </h3>
        </Link>

        <p style={{ fontSize: '0.78rem', color: '#8A7060', lineHeight: 1.5, flex: 1, fontFamily: 'var(--font-body)' }}>
          {product.material}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '12px' }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: '#B9965B',
          }}>
            {formattedPrice}
          </span>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              backgroundColor: added ? '#556038' : '#B9965B',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '0.78rem',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease',
              opacity: product.stock === 0 ? 0.5 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {added ? 'Agregado' : '+ Carrito'}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
