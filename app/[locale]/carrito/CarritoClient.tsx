'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import type { Messages, Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { siteConfig } from '@/lib/seo';

interface Props {
  messages: Messages;
  locale: Locale;
}

export default function CarritoClient({ messages, locale }: Props) {
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

  const handleWhatsAppCheckout = () => {
    const fmt = (n: number) =>
      new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);

    const lines = items
      .map((item) => `• ${item.product.nombre} x${item.quantity} — ${fmt(item.product.precio * item.quantity)}`)
      .join('\n');

    const message =
      `¡Hola Veency! Me gustaría hacer el siguiente pedido:\n\n` +
      `*🛍 Mi pedido:*\n${lines}\n\n` +
      `*💰 Total: ${fmt(total)}*\n\n` +
      `¿Me pueden confirmar disponibilidad y los datos para pagar? ¡Gracias!`;

    const url = `https://wa.me/${siteConfig.whatsappPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '70vh', backgroundColor: '#F5EDE3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '20px' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#8A7060" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: '#2B1F1A', marginBottom: '12px' }}>
            {t(messages, 'cart.empty')}
          </h1>
          <p style={{ color: '#8A7060', marginBottom: '28px', fontSize: '1rem', fontFamily: 'var(--font-body)' }}>
            {t(messages, 'cart.emptySub')}
          </p>
          <Link
            href={`/${locale}/catalogo`}
            style={{ display: 'inline-block', backgroundColor: '#B9965B', color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem', fontFamily: 'var(--font-body)' }}
          >
            {t(messages, 'cart.emptyCta')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '70vh', backgroundColor: '#F5EDE3', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#2B1F1A', marginBottom: '36px' }}>
          {t(messages, 'cart.title')}
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
                    style={{ display: 'flex', gap: '16px', backgroundColor: '#ffffff', borderRadius: '14px', padding: '16px', marginBottom: '12px', border: '1px solid rgba(160, 144, 112, 0.2)', boxShadow: '0 2px 8px rgba(185, 150, 91, 0.07)', alignItems: 'center' }}
                  >
                    <div style={{ width: '90px', height: '90px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, position: 'relative', backgroundColor: '#EDE6D9' }}>
                      <Image src={item.product.imagen} alt={item.product.nombre} fill sizes="90px" style={{ objectFit: 'cover' }} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link href={`/${locale}/producto/${item.product.id}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, color: '#2B1F1A', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.product.nombre}
                        </h3>
                      </Link>
                      <p style={{ fontSize: '0.78rem', color: '#8A7060', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>{item.product.material}</p>
                      <p style={{ fontSize: '0.82rem', color: '#B98C73', fontFamily: 'var(--font-body)' }}>
                        {itemPrice} {t(messages, 'cart.each')}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(160, 144, 112, 0.4)', borderRadius: '8px', overflow: 'hidden' }}>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} style={{ width: '30px', height: '30px', border: 'none', backgroundColor: '#ffffff', cursor: 'pointer', color: '#B9965B', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' }}>-</button>
                        <span style={{ width: '30px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, color: '#2B1F1A', lineHeight: '30px', fontFamily: 'var(--font-body)' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width: '30px', height: '30px', border: 'none', backgroundColor: '#ffffff', cursor: 'pointer', color: '#B9965B', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' }}>+</button>
                      </div>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#B9965B', fontSize: '1rem' }}>{itemTotal}</span>
                      <button onClick={() => removeFromCart(item.product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }} aria-label={t(messages, 'cart.remove')}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B98C73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <button
              onClick={clearCart}
              style={{ marginTop: '8px', background: 'none', border: '1px solid rgba(160, 144, 112, 0.5)', borderRadius: '8px', padding: '8px 16px', color: '#8A7060', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer' }}
            >
              {t(messages, 'cart.clearCart')}
            </button>
          </div>

          {/* Resumen */}
          <div style={{ width: '300px', flexShrink: 0, backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid rgba(160, 144, 112, 0.2)', boxShadow: '0 4px 20px rgba(185, 150, 91, 0.1)', position: 'sticky', top: '90px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: '#2B1F1A', marginBottom: '20px' }}>
              {t(messages, 'cart.summary')}
            </h2>
            <div style={{ borderTop: '1px solid rgba(160, 144, 112, 0.2)', paddingTop: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#8A7060', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>{t(messages, 'cart.subtotal')}</span>
                <span style={{ fontWeight: 600, color: '#2B1F1A', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>{formattedTotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#8A7060', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>{t(messages, 'cart.shipping')}</span>
                <span style={{ fontWeight: 600, color: '#B9965B', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>{t(messages, 'cart.shippingFree')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(160, 144, 112, 0.2)', paddingTop: '12px', marginTop: '12px' }}>
                <span style={{ fontWeight: 700, color: '#2B1F1A', fontSize: '1rem', fontFamily: 'var(--font-body)' }}>{t(messages, 'cart.total')}</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#B9965B', fontSize: '1.2rem' }}>{formattedTotal}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsAppCheckout}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#25D366',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              {/* WhatsApp icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.532 5.848L.057 23.492a.5.5 0 0 0 .61.61l5.644-1.475A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.373l-.36-.214-3.724.974.993-3.618-.234-.372A9.818 9.818 0 1 1 12 21.818z"/>
              </svg>
              {t(messages, 'cart.checkout')}
            </motion.button>

            <Link
              href={`/${locale}/catalogo`}
              style={{ display: 'block', textAlign: 'center', color: '#8A7060', fontSize: '0.85rem', textDecoration: 'none', marginTop: '8px', fontFamily: 'var(--font-body)' }}
            >
              {t(messages, 'cart.continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
