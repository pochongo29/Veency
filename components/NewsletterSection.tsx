'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Ingresa un correo válido');
      return;
    }
    setError('');

    // Notificar por WhatsApp con el correo del suscriptor
    const texto = `Hola Veency 👋 Quiero suscribirme a sus novedades.\n\n*Correo:* ${email}`;
    const waUrl = `https://wa.me/5215512345678?text=${encodeURIComponent(texto)}`;
    window.open(waUrl, '_blank');

    setStatus('success');
  }

  return (
    <section
      style={{
        backgroundColor: '#1A1210',
        padding: 'clamp(64px, 10vw, 100px) 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow decorativo */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,180,131,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 1, maxWidth: '560px', margin: '0 auto' }}
      >
        <span style={{
          display: 'block',
          fontSize: '0.7rem',
          fontWeight: 600,
          color: '#D4B483',
          textTransform: 'uppercase',
          letterSpacing: '0.32em',
          marginBottom: '20px',
          fontFamily: 'var(--font-body)',
        }}>
          Novedades
        </span>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.1,
          marginBottom: '16px',
        }}>
          Sé la primera en saberlo
        </h2>

        <p style={{
          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.7,
          marginBottom: '36px',
          fontFamily: 'var(--font-body)',
        }}>
          Nuevas piezas, colecciones exclusivas y ofertas antes que nadie.<br />
          Sin spam, solo lo bueno.
        </p>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: 'rgba(185,150,91,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '4px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
            }}>
              ¡Listo! Ya estás en la lista.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.45)',
              margin: 0,
            }}>
              Pronto recibirás novedades de Veency.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
            noValidate
          >
            <div style={{
              display: 'flex',
              width: '100%',
              maxWidth: '420px',
              gap: '0',
              borderRadius: '9999px',
              overflow: 'hidden',
              border: error ? '1.5px solid rgba(192,57,43,0.6)' : '1.5px solid rgba(255,255,255,0.15)',
              backgroundColor: 'rgba(255,255,255,0.06)',
              transition: 'border-color 0.2s',
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="tu@correo.com"
                aria-label="Correo electrónico para newsletter"
                style={{
                  flex: 1,
                  padding: '13px 20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.9rem',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#ffffff',
                  color: '#1a1a1a',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e8e8e8'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
              >
                Suscribirme
              </button>
            </div>

            {error && (
              <span style={{
                fontSize: '0.78rem',
                color: 'rgba(255,100,100,0.85)',
                fontFamily: 'var(--font-body)',
              }}>
                {error}
              </span>
            )}

            <p style={{
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.25)',
              fontFamily: 'var(--font-body)',
              margin: 0,
              letterSpacing: '0.03em',
            }}>
              Sin spam. Cancela cuando quieras.
            </p>
          </form>
        )}
      </motion.div>
    </section>
  );
}
