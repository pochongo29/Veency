'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import type { Locale, Messages } from '@/lib/i18n';

const HERO_VIDEO = '/video/hero.mp4';

interface HeroSectionProps {
  messages: Messages;
  locale: Locale;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const lineRef    = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLSpanElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Entrada GSAP — editorial, lenta, de abajo hacia arriba
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(lineRef.current,  { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.9 }, 0.6)
      .fromTo(badgeRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 1.0)
      .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.0 }, 1.2)
      .fromTo(ctaRef.current,   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 1.8);
    return () => { tl.kill(); };
  }, []);


  return (
    <section
      style={{
        height: '100vh',
        marginTop: '-64px',
        scrollSnapAlign: 'start',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1A1210',
      }}
    >
      {/* ── VIDEO ── */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* ── OVERLAY — muy sutil para que el video respire ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(160deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.62) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── FRANJA INFERIOR — gradiente más oscuro para que el texto sea legible ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '55%',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* ── CONTENIDO — abajo a la izquierda, estilo editorial ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(48px, 7vh, 80px)',
          left: 'clamp(28px, 6vw, 80px)',
          zIndex: 2,
          maxWidth: '540px',
        }}
      >
        {/* Línea decorativa */}
        <div
          ref={lineRef}
          style={{
            width: '40px',
            height: '1px',
            backgroundColor: '#D4B483',
            marginBottom: '18px',
            opacity: 0.85,
          }}
        />

        {/* Badge */}
        <span
          ref={badgeRef}
          style={{
            display: 'block',
            fontSize: '0.65rem',
            fontWeight: 600,
            color: 'rgba(212,180,131,0.85)',
            textTransform: 'uppercase',
            letterSpacing: '0.34em',
            marginBottom: '14px',
            fontFamily: 'var(--font-body)',
            opacity: 0,
          }}
        >
          Joyería artesanal · México
        </span>

        {/* Titular principal */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
            fontWeight: 400,
            color: '#ffffff',
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            marginBottom: '0',
            opacity: 0,
          }}
        >
          Cada collar<br />
          <em style={{ fontStyle: 'italic', color: '#D4B483', fontWeight: 400 }}>
            cuenta una historia
          </em>
        </h1>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            marginTop: '36px',
            opacity: 0,
          }}
        >
          <Link
            href={`/${locale}/catalogo`}
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              color: '#ffffff',
              textDecoration: 'none',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              paddingBottom: '3px',
              borderBottom: '1px solid rgba(255,255,255,0.6)',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#D4B483';
              e.currentTarget.style.borderColor = '#D4B483';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
            }}
          >
            Ver colección
          </Link>

          <Link
            href={`/${locale}/nosotros`}
            style={{
              fontSize: '0.8rem',
              fontWeight: 400,
              fontFamily: 'var(--font-body)',
              color: 'rgba(255,255,255,0.55)',
              textDecoration: 'none',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
            onMouseOut={(e)  => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
          >
            Nuestra historia
          </Link>
        </div>
      </div>


      {/* ── SCROLL INDICATOR — centro abajo, ultra minimal ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <motion.div
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '36px',
            backgroundColor: 'rgba(255,255,255,0.28)',
            transformOrigin: 'top',
          }}
        />
      </motion.div>

      {/* ── LOGO MARCA — esquina superior derecha (opcional, estilo DY) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{
          position: 'absolute',
          top: 'calc(64px + 28px)',
          right: 'clamp(28px, 4vw, 48px)',
          zIndex: 2,
          fontSize: '0.62rem',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
        }}
      >
        Hecho en México
      </motion.div>
    </section>
  );
}
