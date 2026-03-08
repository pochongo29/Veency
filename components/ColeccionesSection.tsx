'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';

const collections = [
  {
    slug: 'chapa-de-oro',
    label: 'Chapa de Oro',
    tagline: 'Brillo eterno',
    desc: 'Baño en oro 18k aplicado sobre piezas artesanales. Resistente, elegante y accesible. Para el día a día y las noches especiales.',
    pieces: '12 piezas',
    image: 'https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=1200&q=85',
    imageSide: 'right' as const,
    bg: '#EDE6D9',
  },
  {
    slug: 'shakiras',
    label: 'Shakiras',
    tagline: 'Color que habla',
    desc: 'Mostacillas de vidrio importadas tejidas a mano. Cada collar es irrepetible — mismo diseño, distinta energía. Bohemio, vibrante, libre.',
    pieces: '10 piezas',
    image: 'https://images.unsplash.com/photo-1579624054375-72037da740e5?auto=format&fit=crop&w=1200&q=85',
    imageSide: 'left' as const,
    bg: '#F5EDE3',
  },
  {
    slug: 'shakirones',
    label: 'Shakirones',
    tagline: 'Presencia real',
    desc: 'Cuentas grandes con carácter. Madera, piedra natural, semillas amazónicas. Piezas que no pasan desapercibidas y que cuentan historias de la tierra.',
    pieces: '8 piezas',
    image: 'https://images.unsplash.com/photo-1595208599319-c1dcf5776170?auto=format&fit=crop&w=1200&q=85',
    imageSide: 'right' as const,
    bg: '#EDE6D9',
  },
  {
    slug: 'artesanal',
    label: 'Artesanal',
    tagline: 'De la tierra, para ti',
    desc: 'Macramé, conchitas del mar, hilo dorado y materiales naturales. La colección más auténtica de Veency — donde cada nudo es intencional.',
    pieces: '9 piezas',
    image: 'https://images.unsplash.com/photo-1627756781760-17c0217d9a3e?auto=format&fit=crop&w=1200&q=85',
    imageSide: 'left' as const,
    bg: '#F5EDE3',
  },
];

const process = [
  { num: '01', title: 'Materiales seleccionados', desc: 'Buscamos los mejores insumos: oro, vidrio importado, piedras naturales y materiales orgánicos.' },
  { num: '02', title: 'Tejido a mano', desc: 'Cada pieza pasa por manos artesanas que cuidan cada detalle, cada nudo, cada vuelta.' },
  { num: '03', title: 'Control de calidad', desc: 'Revisamos que el acabado, el cierre y los colores sean perfectos antes de salir al mundo.' },
  { num: '04', title: 'Lista para ti', desc: 'Empacada con amor y lista para convertirse en tu pieza favorita o en el regalo ideal.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
};

interface Props { locale: Locale; }

export default function ColeccionesSection({ locale }: Props) {
  return (
    <section style={{ backgroundColor: '#F5EDE3' }}>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <div style={{
        backgroundColor: '#1A1210',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)',
        textAlign: 'center',
      }}>
        <motion.span
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: 'block', fontSize: '0.65rem', fontWeight: 600, color: '#D4B483', textTransform: 'uppercase', letterSpacing: '0.34em', marginBottom: '20px', fontFamily: 'var(--font-body)' }}
        >
          Veency · Joyería Artesanal
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 400, color: '#ffffff', lineHeight: 1.0, marginBottom: '20px', letterSpacing: '-0.02em' }}
        >
          Nuestras<br />
          <em style={{ fontStyle: 'italic', color: '#D4B483' }}>Colecciones</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.8 }}
        >
          Cuatro mundos distintos, una sola esencia: lo artesanal mexicano.
          Cada colección tiene su carácter, su historia y su forma de contarte.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {collections.map((c) => (
            <Link key={c.slug} href={`/${locale}/catalogo/${c.slug}`}
              style={{ padding: '8px 20px', border: '1px solid rgba(212,180,131,0.35)', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#D4B483'; e.currentTarget.style.color = '#D4B483'; }}
              onMouseOut={(e)  => { e.currentTarget.style.borderColor = 'rgba(212,180,131,0.35)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
            >
              {c.label}
            </Link>
          ))}
        </motion.div>
      </div>

      {/* ── 2. COLECCIONES EDITORIALES ──────────────────────────────────────── */}
      {collections.map((col) => (
        <motion.div
          key={col.slug}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: 'easeOut' as const }}
          style={{
            display: 'grid',
            gridTemplateColumns: col.imageSide === 'right' ? '45% 55%' : '55% 45%',
            minHeight: '80vh',
            backgroundColor: col.bg,
          }}
        >
          {/* Texto */}
          <div
            style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: 'clamp(48px, 8vw, 100px) clamp(36px, 6vw, 80px)',
              order: col.imageSide === 'right' ? 0 : 1,
            }}
          >
            <span style={{ display: 'block', fontSize: '0.6rem', fontWeight: 600, color: '#B9965B', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
              {col.tagline}
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem, 4vw, 4rem)', fontWeight: 400, color: '#2B1F1A', lineHeight: 1.05, marginBottom: '8px', letterSpacing: '-0.01em' }}>
              {col.label}
            </h2>
            <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 600, color: '#B98C73', fontFamily: 'var(--font-body)', letterSpacing: '0.12em', marginBottom: '24px' }}>
              {col.pieces}
            </span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)', color: '#8A7060', lineHeight: 1.8, marginBottom: '36px', maxWidth: '400px' }}>
              {col.desc}
            </p>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <Link href={`/${locale}/catalogo/${col.slug}`}
                style={{ display: 'inline-block', backgroundColor: '#2B1F1A', color: '#ffffff', padding: '13px 30px', fontSize: '0.76rem', fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', letterSpacing: '0.14em', textTransform: 'uppercase', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#B9965B'; }}
                onMouseOut={(e)  => { e.currentTarget.style.backgroundColor = '#2B1F1A'; }}
              >
                Ver colección
              </Link>
              <Link href={`/${locale}/catalogo`}
                style={{ fontSize: '0.75rem', fontWeight: 400, fontFamily: 'var(--font-body)', color: '#8A7060', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid rgba(138,112,96,0.4)', paddingBottom: '2px', transition: 'color 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.color = '#2B1F1A'; }}
                onMouseOut={(e)  => { e.currentTarget.style.color = '#8A7060'; }}
              >
                Todo el catálogo
              </Link>
            </div>
          </div>

          {/* Imagen */}
          <div style={{ position: 'relative', overflow: 'hidden', order: col.imageSide === 'right' ? 1 : 0 }}>
            <Image src={col.image} alt={col.label} fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="55vw" />
          </div>
        </motion.div>
      ))}

      {/* ── 3. PROCESO ──────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#2B1F1A', padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}
        >
          <span style={{ display: 'block', fontSize: '0.62rem', fontWeight: 600, color: '#D4B483', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
            Detrás de cada pieza
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, color: '#ffffff', margin: 0 }}>
            Nuestro proceso
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(16px, 3vw, 32px)' }}>
          {process.map((step, i) => (
            <motion.div
              key={i} custom={i} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
              style={{ borderTop: '1px solid rgba(212,180,131,0.25)', paddingTop: '28px' }}
            >
              <span style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 400, color: 'rgba(212,180,131,0.3)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                {step.num}
              </span>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', fontWeight: 400, color: '#ffffff', marginBottom: '12px', lineHeight: 1.3 }}>
                {step.title}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 4. CTA FINAL ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ backgroundColor: '#F5EDE3', padding: 'clamp(60px, 8vw, 100px) 24px', textAlign: 'center' }}
      >
        <span style={{ display: 'block', fontSize: '0.62rem', fontWeight: 600, color: '#B9965B', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
          ¿Lista para elegir?
        </span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: '#2B1F1A', marginBottom: '20px', lineHeight: 1.1 }}>
          Encuentra tu pieza perfecta
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#8A7060', marginBottom: '36px', maxWidth: '440px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Explora el catálogo completo o contáctanos si necesitas ayuda para elegir.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={`/${locale}/catalogo`}
            style={{ backgroundColor: '#2B1F1A', color: '#ffffff', padding: '14px 36px', fontSize: '0.78rem', fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', letterSpacing: '0.14em', textTransform: 'uppercase', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#B9965B'; }}
            onMouseOut={(e)  => { e.currentTarget.style.backgroundColor = '#2B1F1A'; }}
          >
            Ver todo el catálogo
          </Link>
          <Link href={`/${locale}/contacto`}
            style={{ backgroundColor: 'transparent', color: '#2B1F1A', padding: '14px 36px', fontSize: '0.78rem', fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', letterSpacing: '0.14em', textTransform: 'uppercase', border: '1px solid rgba(43,31,26,0.4)', transition: 'border-color 0.2s, color 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#B9965B'; e.currentTarget.style.color = '#B9965B'; }}
            onMouseOut={(e)  => { e.currentTarget.style.borderColor = 'rgba(43,31,26,0.4)'; e.currentTarget.style.color = '#2B1F1A'; }}
          >
            Asesoría personalizada
          </Link>
        </div>
      </motion.div>

    </section>
  );
}
