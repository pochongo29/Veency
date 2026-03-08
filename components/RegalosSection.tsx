'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';

const HERO_IMG =
  'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1920&q=85';

const priceRanges = [
  {
    label: 'Hasta $300',
    sub: 'El detalle perfecto',
    image: 'https://images.unsplash.com/photo-1589422453619-3171862e49d2?auto=format&fit=crop&w=600&q=80',
    href: 'catalogo',
  },
  {
    label: 'Hasta $600',
    sub: 'Algo especial',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80',
    href: 'catalogo',
  },
  {
    label: 'Hasta $1,000',
    sub: 'Para quienes más quieres',
    image: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=600&q=80',
    href: 'catalogo',
  },
  {
    label: 'Sin límite',
    sub: 'Lujo artesanal',
    image: 'https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=600&q=80',
    href: 'catalogo',
  },
];

const recipients = [
  {
    label: 'Para Ella',
    desc: 'Collares que enamoran desde el primer vistazo.',
    image: 'https://images.unsplash.com/photo-1529467937013-eb7fcea5a862?auto=format&fit=crop&w=900&q=80',
    href: 'para-ellas',
  },
  {
    label: 'Para Él',
    desc: 'Estilo con carácter, hecho a mano.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    href: 'para-ellos',
  },
  {
    label: 'Para Teens',
    desc: 'Colorido, único y lleno de personalidad.',
    image: 'https://images.unsplash.com/photo-1579624054375-72037da740e5?auto=format&fit=crop&w=900&q=80',
    href: 'catalogo/shakiras',
  },
];

const occasions = [
  { label: 'Cumpleaños',     emoji: '🎂', href: 'catalogo' },
  { label: 'Aniversario',    emoji: '💛', href: 'catalogo' },
  { label: 'Graduación',     emoji: '🎓', href: 'catalogo' },
  { label: 'Día de Madres',  emoji: '🌸', href: 'catalogo' },
  { label: 'San Valentín',   emoji: '❤️', href: 'catalogo' },
  { label: 'Sin ocasión',    emoji: '✨', href: 'catalogo' },
];

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Envío a todo México',
    desc: 'Gratis en pedidos mayores a $500 MXN.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7m0 0a3 3 0 0 0-3-3 3 3 0 0 0 0 6h3zm0 0a3 3 0 0 1 3-3 3 3 0 0 1 0 6h-3"/>
      </svg>
    ),
    title: 'Empaque de regalo',
    desc: 'Presentación especial sin costo adicional.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Dedicatoria personalizada',
    desc: 'Agrega un mensaje especial a tu pedido.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Asesoría por WhatsApp',
    desc: 'Te ayudamos a elegir el regalo ideal.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
};

interface Props { locale: Locale; }

export default function RegalosSection({ locale }: Props) {
  return (
    <section style={{ backgroundColor: '#F5EDE3' }}>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
        <Image src={HERO_IMG} alt="Regalos Veency" fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="100vw" priority />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 24px',
        }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: '0.65rem', fontWeight: 600, color: '#D4B483', textTransform: 'uppercase', letterSpacing: '0.34em', marginBottom: '18px', fontFamily: 'var(--font-body)' }}
          >
            El arte de regalar
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 400, color: '#ffffff', lineHeight: 1.05, marginBottom: '16px' }}
          >
            Regalos que<br />
            <em style={{ fontStyle: 'italic', color: '#D4B483' }}>se recuerdan siempre</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: 'rgba(255,255,255,0.7)', marginBottom: '36px', maxWidth: '500px', lineHeight: 1.7 }}
          >
            Piezas artesanales mexicanas, hechas a mano con amor.<br />
            Hoy un regalo, mañana una herencia.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link href={`/${locale}/para-ellas`} style={{ backgroundColor: '#ffffff', color: '#1A1210', padding: '13px 32px', fontSize: '0.78rem', fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'background-color 0.2s' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#F5EDE3'; }}
              onMouseOut={(e)  => { e.currentTarget.style.backgroundColor = '#ffffff'; }}>
              Para Ella
            </Link>
            <Link href={`/${locale}/para-ellos`} style={{ backgroundColor: 'transparent', color: '#ffffff', padding: '13px 32px', fontSize: '0.78rem', fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.6)', transition: 'background-color 0.2s' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
              onMouseOut={(e)  => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
              Para Él
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── 2. REGALOS POR PRECIO ───────────────────────────────────────────── */}
      <div style={{ padding: 'clamp(60px, 8vw, 90px) clamp(24px, 5vw, 80px)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
          <span style={{ display: 'block', fontSize: '0.62rem', fontWeight: 600, color: '#B9965B', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>
            Encuentra el tuyo
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, color: '#2B1F1A', margin: 0 }}>
            Regalos por precio
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(12px, 2vw, 20px)' }}>
          {priceRanges.map((item, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
              <Link href={`/${locale}/${item.href}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden', backgroundColor: '#DDD3C4', marginBottom: '14px' }}>
                  <Image src={item.image} alt={item.label} fill style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }} sizes="25vw"
                    onMouseOver={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                    onMouseOut={(e)  => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
                  <div style={{ position: 'absolute', bottom: '18px', left: '18px' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 400, color: '#ffffff', margin: 0 }}>{item.label}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', margin: '4px 0 0', letterSpacing: '0.05em' }}>{item.sub}</p>
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, color: '#8A7060', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid rgba(138,112,96,0.45)', paddingBottom: '1px' }}>
                  Ver regalos →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 3. REGALOS POR DESTINATARIO ─────────────────────────────────────── */}
      <div style={{ padding: '0 clamp(24px, 5vw, 80px) clamp(60px, 8vw, 90px)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
          <span style={{ display: 'block', fontSize: '0.62rem', fontWeight: 600, color: '#B9965B', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>
            ¿Para quién es?
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, color: '#2B1F1A', margin: 0 }}>
            Regalos por destinatario
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(12px, 2vw, 24px)' }}>
          {recipients.map((r, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
              <Link href={`/${locale}/${r.href}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden', backgroundColor: '#2B1F1A', marginBottom: '16px' }}>
                  <Image src={r.image} alt={r.label} fill style={{ objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.6s ease' }} sizes="33vw"
                    onMouseOver={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                    onMouseOut={(e)  => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: '22px', left: '22px' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', fontWeight: 400, color: '#ffffff', margin: '0 0 4px' }}>{r.label}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', margin: 0, maxWidth: '220px' }}>{r.desc}</p>
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, color: '#8A7060', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid rgba(138,112,96,0.45)', paddingBottom: '1px' }}>
                  Ver regalos →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 4. OCASIONES ────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#EDE6D9', padding: 'clamp(60px, 8vw, 90px) clamp(24px, 5vw, 80px)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 52px)' }}>
          <span style={{ display: 'block', fontSize: '0.62rem', fontWeight: 600, color: '#B9965B', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>
            Cada momento importa
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, color: '#2B1F1A', margin: 0 }}>
            Regalos por ocasión
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 'clamp(8px, 1.5vw, 16px)' }}>
          {occasions.map((occ, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
              <Link href={`/${locale}/${occ.href}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: 'clamp(20px, 3vw, 32px) 12px', backgroundColor: '#ffffff', border: '1px solid rgba(185,150,91,0.15)', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#B9965B'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(185,150,91,0.12)'; }}
                onMouseOut={(e)  => { e.currentTarget.style.borderColor = 'rgba(185,150,91,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <span style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)' }}>{occ.emoji}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)', fontWeight: 600, color: '#2B1F1A', textAlign: 'center', letterSpacing: '0.04em' }}>{occ.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 5. SERVICIOS DE REGALO ──────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#1A1210', padding: 'clamp(60px, 8vw, 90px) clamp(24px, 5vw, 80px)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 52px)' }}>
          <span style={{ display: 'block', fontSize: '0.62rem', fontWeight: 600, color: '#D4B483', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>
            Lo hacemos fácil
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, color: '#ffffff', margin: 0 }}>
            Servicios de regalo
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(16px, 2.5vw, 28px)' }}>
          {services.map((s, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', padding: 'clamp(24px, 3vw, 36px) 16px', borderTop: '1px solid rgba(212,180,131,0.2)' }}
            >
              {s.icon}
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', fontWeight: 400, color: '#ffffff', margin: 0 }}>{s.title}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 'clamp(40px, 6vw, 60px)' }}
        >
          <Link href={`/${locale}/contacto`} style={{ display: 'inline-block', backgroundColor: '#B9965B', color: '#ffffff', padding: '14px 40px', fontSize: '0.78rem', fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', letterSpacing: '0.14em', textTransform: 'uppercase', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#A07C42'; }}
            onMouseOut={(e)  => { e.currentTarget.style.backgroundColor = '#B9965B'; }}
          >
            Pedir asesoría por WhatsApp
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
