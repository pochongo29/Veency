'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';

export default function CarritoPage() {
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice);

  const total = totalPrice();

  const formattedTotal = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(total);

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '70vh', backgroundColor: '#F4EFE0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '20px' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#A09070" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: '#2E2E2E', marginBottom: '12px' }}>
            Tu carrito esta vacio
          </h1>
          <p style={{ color: '#A09070', marginBottom: '28px', fontSize: '1rem', fontFamily: 'var(--font-body)' }}>
            Agrega collares de nuestra coleccion.
          </p>
          <Link
            href="/catalogo"
            style={{
              display: 'inline-block',
              backgroundColor: '#6B7C4E',
              color: '#fff',
              padding: '12px 28px',
              borderRadius: '10px',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-body)',
            }}
          >
            Ir al catalogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '70vh', backgroundColor: '#F4EFE0', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#2E2E2E', marginBottom: '36px' }}>
          Mi Carrito
        </h1>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Lista de items */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <AnimatePresence>
              {items.map((item) => {
                const itemTotal = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(item.product.precio * item.quantity);
                const itemPrice = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(item.product.precio);

                return (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      backgroundColor: '#ffffff',
                      borderRadius: '14px',
                      padding: '16px',
                      marginBottom: '12px',
                      border: '1px solid rgba(160, 144, 112, 0.2)',
                      boxShadow: '0 2px 8px rgba(107, 124, 78, 0.07)',
                      alignItems: 'center',
                    }}
                  >
                    {/* Imagen */}
                    <div style={{ width: '90px', height: '90px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, position: 'relative', backgroundColor: '#ede8d6' }}>
                      <Image
                        src={item.product.imagen}
                        alt={item.product.nombre}
                        fill
                        sizes="90px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link href={`/producto/${item.product.id}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.product.nombre}
                        </h3>
                      </Link>
                      <p style={{ fontSize: '0.78rem', color: '#A09070', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>
                        {item.product.material}
                      </p>
                      <p style={{ fontSize: '0.82rem', color: '#B87333', fontFamily: 'var(--font-body)' }}>
                        {itemPrice} c/u
                      </p>
                    </div>

                    {/* Controles cantidad */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid rgba(160, 144, 112, 0.4)', borderRadius: '8px', overflow: 'hidden' }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{ width: '30px', height: '30px', border: 'none', backgroundColor: '#ffffff', cursor: 'pointer', color: '#6B7C4E', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' }}
                        >
                          -
                        </button>
                        <span style={{ width: '30px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, color: '#2E2E2E', lineHeight: '30px', fontFamily: 'var(--font-body)' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{ width: '30px', height: '30px', border: 'none', backgroundColor: '#ffffff', cursor: 'pointer', color: '#6B7C4E', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' }}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#6B7C4E', fontSize: '1rem' }}>
                        {itemTotal}
                      </span>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        aria-label="Eliminar producto"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B87333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <button
              onClick={clearCart}
              style={{
                marginTop: '8px',
                background: 'none',
                border: '1px solid rgba(160, 144, 112, 0.5)',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#A09070',
                fontSize: '0.8rem',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
              }}
            >
              Vaciar carrito
            </button>
          </div>

          {/* Resumen */}
          <div style={{
            width: '300px',
            flexShrink: 0,
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(160, 144, 112, 0.2)',
            boxShadow: '0 4px 20px rgba(107, 124, 78, 0.1)',
            position: 'sticky',
            top: '90px',
          }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: '#2E2E2E', marginBottom: '20px' }}>
              Resumen
            </h2>

            <div style={{ borderTop: '1px solid rgba(160, 144, 112, 0.2)', paddingTop: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#A09070', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>Subtotal</span>
                <span style={{ fontWeight: 600, color: '#2E2E2E', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>{formattedTotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#A09070', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>Envio</span>
                <span style={{ fontWeight: 600, color: '#6B7C4E', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>Gratis</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(160, 144, 112, 0.2)', paddingTop: '12px', marginTop: '12px' }}>
                <span style={{ fontWeight: 700, color: '#2E2E2E', fontSize: '1rem', fontFamily: 'var(--font-body)' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#6B7C4E', fontSize: '1.2rem' }}>{formattedTotal}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#6B7C4E',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                marginBottom: '10px',
              }}
            >
              Proceder al pago
            </motion.button>

            <Link
              href="/catalogo"
              style={{
                display: 'block',
                textAlign: 'center',
                color: '#A09070',
                fontSize: '0.85rem',
                textDecoration: 'none',
                marginTop: '8px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
