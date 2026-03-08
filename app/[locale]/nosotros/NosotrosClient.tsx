'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Messages, Locale } from '@/lib/i18n';
import { t, tObjectArray } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  messages: Messages;
  locale: Locale;
}

// ---------------------------------------------------------------------------
// Iconos SVG para valores
// ---------------------------------------------------------------------------
const valueIcons = [
  (
    <svg key="handmade" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v0m0 0V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6m0 0V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8l4 4h6a2 2 0 0 0 2-2v-2.5" />
    </svg>
  ),
  (
    <svg key="materials" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12" />
      <path d="M12 6v6l4 2" />
      <path d="M2 2l4 4" />
    </svg>
  ),
  (
    <svg key="design" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
];

// ---------------------------------------------------------------------------
// Estadísticas
// ---------------------------------------------------------------------------
const statsData = [
  { number: 500, prefix: '+', labelKey: 'about.stats.pieces' },
  { number: 200, prefix: '+', labelKey: 'about.stats.clients' },
  { number: 4, prefix: '', labelKey: 'about.stats.collections' },
];

// ---------------------------------------------------------------------------
// Hook genérico para animación al entrar en viewport (Framer Motion)
// ---------------------------------------------------------------------------
function useFadeInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return { ref, controls };
}

// ---------------------------------------------------------------------------
// Variantes de animación
// ---------------------------------------------------------------------------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

// ---------------------------------------------------------------------------
// Componente contador animado
// ---------------------------------------------------------------------------
function AnimatedCounter({ target, prefix }: { target: number; prefix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const duration = 1800;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      if (ref.current) ref.current.textContent = prefix + current.toLocaleString('es-CL');
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [isInView, target, prefix]);

  return <span ref={ref} aria-label={`${prefix}${target}`}>{prefix}0</span>;
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------
export default function NosotrosClient({ messages, locale }: Props) {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroBadgeRef = useRef<HTMLSpanElement>(null);
  const timelineItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const origenTexto = useFadeInView();
  const origenImagen = useFadeInView();
  const valoresSection = useFadeInView();
  const cifrasSection = useFadeInView();
  const ctaSection = useFadeInView();

  const processSteps = tObjectArray<{ title: string; desc: string }>(messages, 'about.process.steps');
  const valoresTitles = [
    t(messages, 'about.values.handmade.title'),
    t(messages, 'about.values.materials.title'),
    t(messages, 'about.values.design.title'),
  ];
  const valoresDescs = [
    t(messages, 'about.values.handmade.desc'),
    t(messages, 'about.values.materials.desc'),
    t(messages, 'about.values.design.desc'),
  ];

  // GSAP — entrada del Hero
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(heroBadgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(heroTitleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.4')
      .fromTo(heroSubtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');
    return () => { tl.kill(); };
  }, []);

  // GSAP ScrollTrigger — timeline del proceso
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const triggers: ScrollTrigger[] = [];
    timelineItemRefs.current.forEach((el, i) => {
      if (!el) return;
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(el,
            { opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 20 },
            { opacity: 1, x: 0, y: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.1 }
          );
        },
      });
      triggers.push(trigger);
    });
    return () => { triggers.forEach((tr) => tr.kill()); };
  }, []);

  return (
    <>
      {/* SECCION 1 — Hero */}
      <section
        aria-label={t(messages, 'about.hero.badge')}
        style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #3D2B23 0%, #2B1F1A 45%, #1A1210 100%)', position: 'relative', overflow: 'hidden', padding: '100px 24px 80px' }}
      >
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(185,150,91,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-8%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,239,224,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ textAlign: 'center', maxWidth: '740px', position: 'relative', zIndex: 1 }}>
          <span ref={heroBadgeRef} style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#B9965B', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '20px', fontFamily: 'var(--font-body)', opacity: 0 }}>
            {t(messages, 'about.hero.badge')}
          </span>
          <h1 ref={heroTitleRef} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)', fontWeight: 700, color: '#F5EDE3', lineHeight: 1.15, marginBottom: '24px', opacity: 0 }}>
            {t(messages, 'about.hero.title')} <br />
            <em style={{ color: '#B9965B', fontStyle: 'italic' }}>{t(messages, 'about.hero.titleAccent')}</em>
          </h1>
          <p ref={heroSubtitleRef} style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(245,237,227,0.82)', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto', fontFamily: 'var(--font-body)', opacity: 0 }}>
            {t(messages, 'about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* SECCION 2 — Origen */}
      <section aria-label={t(messages, 'about.origin.badge')} style={{ backgroundColor: '#ffffff', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
          <motion.div ref={origenTexto.ref} variants={fadeLeft} initial="hidden" animate={origenTexto.controls}>
            <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#B9965B', textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
              {t(messages, 'about.origin.badge')}
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#2B1F1A', lineHeight: 1.2, marginBottom: '24px' }}>
              {t(messages, 'about.origin.title')}{' '}
              <span style={{ color: '#B9965B' }}>{t(messages, 'about.origin.titleAccent')}</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.75, color: '#4a4a4a' }}>
              <p>{t(messages, 'about.origin.p1')}</p>
              <p>{t(messages, 'about.origin.p2')}</p>
              <p>{t(messages, 'about.origin.p3')}</p>
            </div>
            <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '3px', backgroundColor: '#B9965B', borderRadius: '2px' }} />
              <span style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '1rem', color: '#B9965B' }}>
                &ldquo;{t(messages, 'about.origin.quote')}&rdquo;
              </span>
            </div>
          </motion.div>

          <motion.div ref={origenImagen.ref} variants={fadeRight} initial="hidden" animate={origenImagen.controls} style={{ position: 'relative' }}>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/5', boxShadow: '0 20px 60px rgba(185,150,91,0.18)' }}>
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80"
                alt="Manos trabajando joyería artesanal"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(43,31,26,0.25) 100%)' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '-16px', right: '-16px', backgroundColor: '#F5EDE3', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', border: '1px solid rgba(185,150,91,0.2)' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#B9965B', margin: 0, lineHeight: 1 }}>
                {t(messages, 'about.origin.statNumber')}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#B9965B', margin: 0, marginTop: '2px' }}>
                {t(messages, 'about.origin.statLabel')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCION 3 — Valores */}
      <section aria-label={t(messages, 'about.values.badge')} style={{ backgroundColor: '#F5EDE3', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div ref={valoresSection.ref} variants={fadeUp} initial="hidden" animate={valoresSection.controls} style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 60px)' }}>
            <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#B9965B', textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
              {t(messages, 'about.values.badge')}
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#2B1F1A', lineHeight: 1.2 }}>
              {t(messages, 'about.values.title')}
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate={valoresSection.controls} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[0, 1, 2].map((i) => (
              <motion.article key={i} variants={cardVariant} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '36px 28px', border: '1px solid rgba(185,150,91,0.2)', boxShadow: '0 4px 20px rgba(185,150,91,0.07)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '14px', backgroundColor: 'rgba(185,150,91,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {valueIcons[i]}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#2B1F1A', margin: 0 }}>
                  {valoresTitles[i]}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.7, color: '#4a4a4a', margin: 0 }}>
                  {valoresDescs[i]}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECCION 4 — Proceso */}
      <section aria-label={t(messages, 'about.process.badge')} style={{ backgroundColor: '#ffffff', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
            <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#B9965B', textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
              {t(messages, 'about.process.badge')}
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#2B1F1A', lineHeight: 1.2 }}>
              {t(messages, 'about.process.title')}{' '}
              <span style={{ color: '#B9965B' }}>{t(messages, 'about.process.titleAccent')}</span>
            </h2>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '28px', top: '8px', bottom: '8px', width: '2px', backgroundColor: 'rgba(185,150,91,0.2)', borderRadius: '2px' }} aria-hidden="true" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {processSteps.map((paso, i) => (
                <div
                  key={i}
                  ref={(el) => { timelineItemRefs.current[i] = el; }}
                  style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', opacity: 0 }}
                  aria-label={`${t(messages, 'about.process.badge')} ${i + 1}: ${paso.title}`}
                >
                  <div style={{ flexShrink: 0, width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#B9965B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, boxShadow: '0 4px 16px rgba(185,150,91,0.35)', zIndex: 1, position: 'relative' }} aria-hidden="true">
                    {i + 1}
                  </div>
                  <div style={{ paddingTop: '10px', flex: 1 }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: '#2B1F1A', margin: '0 0 8px' }}>{paso.title}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.75, color: '#4a4a4a', margin: 0 }}>{paso.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECCION 5 — Cifras */}
      <section aria-label={t(messages, 'about.stats.badge')} style={{ backgroundColor: '#2B1F1A', padding: 'clamp(60px, 8vw, 100px) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(185,150,91,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div ref={cifrasSection.ref} variants={fadeUp} initial="hidden" animate={cifrasSection.controls} style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 60px)' }}>
            <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#B9965B', textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
              {t(messages, 'about.stats.badge')}
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#F5EDE3', lineHeight: 1.2 }}>
              {t(messages, 'about.stats.title')}{' '}
              <span style={{ color: '#B9965B' }}>{t(messages, 'about.stats.titleAccent')}</span>
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate={cifrasSection.controls} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {statsData.map((stat, i) => (
              <motion.div key={i} variants={cardVariant} style={{ padding: '36px 24px', borderRadius: '16px', backgroundColor: 'rgba(245,237,227,0.08)', border: '1px solid rgba(185,150,91,0.3)' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 5vw, 4rem)', fontWeight: 700, color: '#B9965B', margin: '0 0 8px', lineHeight: 1 }}>
                  <AnimatedCounter target={stat.number} prefix={stat.prefix} />
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(245,237,227,0.85)', margin: 0, letterSpacing: '0.03em' }}>
                  {t(messages, stat.labelKey)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECCION 6 — CTA */}
      <section aria-label={t(messages, 'about.cta.badge')} style={{ backgroundColor: '#F5EDE3', padding: 'clamp(70px, 10vw, 120px) 24px', textAlign: 'center' }}>
        <motion.div ref={ctaSection.ref} variants={fadeUp} initial="hidden" animate={ctaSection.controls} style={{ maxWidth: '620px', margin: '0 auto' }}>
          <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#B9965B', textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
            {t(messages, 'about.cta.badge')}
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: '#2B1F1A', lineHeight: 1.2, marginBottom: '20px' }}>
            {t(messages, 'about.cta.title')}{' '}
            <em style={{ color: '#B9965B', fontStyle: 'italic' }}>{t(messages, 'about.cta.titleAccent')}</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.75, color: '#4a4a4a', marginBottom: '40px' }}>
            {t(messages, 'about.cta.subtitle')}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={`/${locale}/catalogo`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#B9965B', color: '#fff', padding: '14px 32px', borderRadius: '10px', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', fontFamily: 'var(--font-body)', boxShadow: '0 4px 20px rgba(185,150,91,0.3)' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#A07C42'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#B9965B'; }}
            >
              {t(messages, 'about.cta.button')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/contacto`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'transparent', color: '#B9965B', padding: '14px 32px', borderRadius: '10px', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', fontFamily: 'var(--font-body)', border: '2px solid #B9965B' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#B9965B'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#B9965B'; }}
            >
              {t(messages, 'about.cta.contact')}
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
