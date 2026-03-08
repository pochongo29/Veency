'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import type { Messages, Locale } from '@/lib/i18n';
import { t, tArray } from '@/lib/i18n';

const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } } };
const fadeLeft: Variants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } } };
const fadeRight: Variants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } } };
const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };
const cardVariant: Variants = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } };
const trustItemVariant: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } } };

type FormState = { nombre: string; email: string; asunto: string; mensaje: string };
type FormErrors = Partial<Record<keyof FormState, string>>;
type SendStatus = 'idle' | 'sending' | 'success';

function IconCheck() {
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  );
}

function BronzeSpinner() {
  return (
    <>
      <style>{`@keyframes veency-spin{to{transform:rotate(360deg)}}.veency-spinner{width:28px;height:28px;border:3px solid rgba(185,150,91,0.25);border-top-color:#B9965B;border-radius:50%;animation:veency-spin 0.75s linear infinite}`}</style>
      <div className="veency-spinner" role="status" />
    </>
  );
}

// Iconos de tarjetas de contacto
const contactIcons = [
  <svg key="whatsapp" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M9 10h.01M12 10h.01M15 10h.01" /></svg>,
  <svg key="email" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  <svg key="instagram" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  <svg key="location" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
];

const contactData = [
  { id: 'whatsapp', dato: '+52 55 1234 5678', href: 'https://wa.me/5215512345678' },
  { id: 'email', dato: 'hola@veency.mx', href: 'mailto:hola@veency.mx' },
  { id: 'instagram', dato: '@veency.mx', href: 'https://instagram.com/veency.mx' },
  { id: 'location', dato: 'Ciudad de México, México', href: null },
];

const trustEmojis = ['🚚', '✋', '💬'];
const trustEmojiKeys = ['contact.trustEmojis.0', 'contact.trustEmojis.1', 'contact.trustEmojis.2'];

interface Props {
  messages: Messages;
  locale: Locale;
}

export default function ContactoClient({ messages }: Props) {
  const heroBadgeRef = useRef<HTMLSpanElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);

  const [form, setForm] = useState<FormState>({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle');
  const [columnsVisible, setColumnsVisible] = useState(false);
  const layoutRef = useRef<HTMLDivElement>(null);
  const [trustVisible, setTrustVisible] = useState(false);
  const trustRef = useRef<HTMLDivElement>(null);
  const [closingVisible, setClosingVisible] = useState(false);
  const closingRef = useRef<HTMLDivElement>(null);

  const subjectOptions = tArray(messages, 'contact.form.subjectOptions');
  const trustItems = tArray(messages, 'contact.trust');
  const trustEmojiLabels = tArray(messages, 'contact.trustEmojis');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(heroBadgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(heroTitleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.4')
      .fromTo(heroSubtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');
    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const el = layoutRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setColumnsVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = trustRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setTrustVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = closingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setClosingVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.nombre.trim()) errs.nombre = t(messages, 'contact.form.nameRequired');
    if (!form.email.trim()) errs.email = t(messages, 'contact.form.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t(messages, 'contact.form.emailInvalid');
    if (!form.mensaje.trim()) errs.mensaje = t(messages, 'contact.form.messageRequired');
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSendStatus('sending');

    // Armar mensaje para WhatsApp con los datos del formulario
    const asunto = form.asunto || 'Consulta general';
    const texto = [
      `Hola Veency 👋 Me comunico desde su sitio web.`,
      ``,
      `*Nombre:* ${form.nombre}`,
      `*Email:* ${form.email}`,
      `*Asunto:* ${asunto}`,
      ``,
      `*Mensaje:*`,
      form.mensaje,
    ].join('\n');

    const waUrl = `https://wa.me/5215512345678?text=${encodeURIComponent(texto)}`;

    await new Promise((res) => setTimeout(res, 600));
    setSendStatus('success');
    window.open(waUrl, '_blank');
    setTimeout(() => { setForm({ nombre: '', email: '', asunto: '', mensaje: '' }); setSendStatus('idle'); }, 3500);
  }

  const inputBaseStyle: React.CSSProperties = { width: '100%', padding: '13px 16px', border: '1.5px solid #8A7060', borderRadius: '10px', fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#2B1F1A', backgroundColor: '#ffffff', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box' };
  const inputErrorStyle: React.CSSProperties = { ...inputBaseStyle, borderColor: '#c0392b' };
  const labelStyle: React.CSSProperties = { display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, color: '#2B1F1A', marginBottom: '7px', letterSpacing: '0.02em' };
  const errorTextStyle: React.CSSProperties = { fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#c0392b', marginTop: '5px', display: 'block' };

  return (
    <>
      {/* SECCION 1 — Hero */}
      <section aria-label={t(messages, 'contact.hero.badge')} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #3D2B23 0%, #2B1F1A 45%, #1A1210 100%)', position: 'relative', overflow: 'hidden', padding: '100px 24px 80px' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(185,150,91,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-8%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,237,227,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />

        <div style={{ textAlign: 'center', maxWidth: '680px', position: 'relative', zIndex: 1 }}>
          <span ref={heroBadgeRef} style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#B9965B', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '20px', fontFamily: 'var(--font-body)', opacity: 0 }}>
            {t(messages, 'contact.hero.badge')}
          </span>
          <h1 ref={heroTitleRef} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', fontWeight: 700, color: '#F5EDE3', lineHeight: 1.1, marginBottom: '24px', opacity: 0 }}>
            {t(messages, 'contact.hero.title')}
          </h1>
          <p ref={heroSubtitleRef} style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(245,237,227,0.82)', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto', fontFamily: 'var(--font-body)', opacity: 0 }}>
            {t(messages, 'contact.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* SECCION 2 — Columnas */}
      <section aria-label={t(messages, 'contact.channels.badge')} style={{ backgroundColor: '#F5EDE3', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div ref={layoutRef} style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(40px, 5vw, 72px)', alignItems: 'start' }}>

          {/* Izquierda: tarjetas */}
          <motion.div variants={staggerContainer} initial="hidden" animate={columnsVisible ? 'visible' : 'hidden'}>
            <motion.div variants={fadeLeft} style={{ marginBottom: '36px' }}>
              <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#B9965B', textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>
                {t(messages, 'contact.channels.badge')}
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: '#2B1F1A', lineHeight: 1.2, margin: 0 }}>
                {t(messages, 'contact.channels.title')}{' '}
                <span style={{ color: '#B9965B' }}>{t(messages, 'contact.channels.titleAccent')}</span>
              </h2>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {contactData.map((card, i) => {
                const cardKey = ['whatsapp', 'email', 'instagram', 'location'][i] as 'whatsapp' | 'email' | 'instagram' | 'location';
                const inner = (
                  <motion.div
                    key={card.id}
                    variants={cardVariant}
                    style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '22px 24px', border: '1.5px solid rgba(160,144,112,0.3)', boxShadow: '0 2px 12px rgba(185,150,91,0.06)', display: 'flex', gap: '18px', alignItems: 'flex-start', textDecoration: 'none', color: 'inherit' }}
                    whileHover={card.href ? { borderColor: '#B9965B', boxShadow: '0 6px 24px rgba(185,150,91,0.14)', y: -2 } : {}}
                  >
                    <div style={{ flexShrink: 0, width: '52px', height: '52px', borderRadius: '12px', backgroundColor: 'rgba(185,150,91,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {contactIcons[i]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, color: '#8A7060', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>
                        {t(messages, `contact.cards.${cardKey}.title`)}
                      </p>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: '#2B1F1A', margin: '0 0 4px' }}>{card.dato}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: '#8A7060', margin: 0, lineHeight: 1.5 }}>
                        {t(messages, `contact.cards.${cardKey}.sub`)}
                      </p>
                    </div>
                    {card.href && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '4px' }} aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </motion.div>
                );

                if (card.href) {
                  return (
                    <a key={card.id} href={card.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }} aria-label={t(messages, `contact.cards.${cardKey}.ariaLabel`) || card.dato}>
                      {inner}
                    </a>
                  );
                }
                return <div key={card.id}>{inner}</div>;
              })}
            </div>
          </motion.div>

          {/* Derecha: formulario */}
          <motion.div variants={fadeRight} initial="hidden" animate={columnsVisible ? 'visible' : 'hidden'}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: 'clamp(28px, 4vw, 44px)', border: '1px solid rgba(160,144,112,0.2)', boxShadow: '0 8px 40px rgba(185,150,91,0.1)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: '#2B1F1A', marginBottom: '8px', marginTop: 0 }}>
                {t(messages, 'contact.form.title')}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#8A7060', marginBottom: '28px', lineHeight: 1.6 }}>
                {t(messages, 'contact.form.subtitle')}
              </p>

              {sendStatus === 'success' && (
                <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: 'easeOut' as const }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '44px 24px', textAlign: 'center' }} role="alert" aria-live="polite">
                  <IconCheck />
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: '#B9965B', margin: '0 0 6px' }}>{t(messages, 'contact.form.successTitle')}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#4a4a4a', margin: 0 }}>{t(messages, 'contact.form.successSub')}</p>
                  </div>
                </motion.div>
              )}

              {sendStatus !== 'success' && (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label htmlFor="nombre" style={labelStyle}>{t(messages, 'contact.form.name')} <span style={{ color: '#B9965B' }}>*</span></label>
                    <input id="nombre" name="nombre" type="text" autoComplete="name" placeholder={t(messages, 'contact.form.namePlaceholder')} value={form.nombre} onChange={handleChange}
                      style={errors.nombre ? inputErrorStyle : inputBaseStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#B9965B'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(185,150,91,0.12)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.nombre ? '#c0392b' : '#8A7060'; e.currentTarget.style.boxShadow = 'none'; }}
                      aria-invalid={!!errors.nombre} aria-describedby={errors.nombre ? 'error-nombre' : undefined}
                    />
                    {errors.nombre && <span id="error-nombre" style={errorTextStyle} role="alert">{errors.nombre}</span>}
                  </div>

                  <div>
                    <label htmlFor="email" style={labelStyle}>{t(messages, 'contact.form.email')} <span style={{ color: '#B9965B' }}>*</span></label>
                    <input id="email" name="email" type="email" autoComplete="email" placeholder={t(messages, 'contact.form.emailPlaceholder')} value={form.email} onChange={handleChange}
                      style={errors.email ? inputErrorStyle : inputBaseStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#B9965B'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(185,150,91,0.12)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.email ? '#c0392b' : '#8A7060'; e.currentTarget.style.boxShadow = 'none'; }}
                      aria-invalid={!!errors.email} aria-describedby={errors.email ? 'error-email' : undefined}
                    />
                    {errors.email && <span id="error-email" style={errorTextStyle} role="alert">{errors.email}</span>}
                  </div>

                  <div>
                    <label htmlFor="asunto" style={labelStyle}>{t(messages, 'contact.form.subject')}</label>
                    <select id="asunto" name="asunto" value={form.asunto} onChange={handleChange}
                      style={{ ...inputBaseStyle, cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23A09070' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '44px' }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#B9965B'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(185,150,91,0.12)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#8A7060'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <option value="" disabled>{t(messages, 'contact.form.subjectDefault')}</option>
                      {subjectOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensaje" style={labelStyle}>{t(messages, 'contact.form.message')} <span style={{ color: '#B9965B' }}>*</span></label>
                    <textarea id="mensaje" name="mensaje" rows={5} placeholder={t(messages, 'contact.form.messagePlaceholder')} value={form.mensaje} onChange={handleChange}
                      style={{ ...(errors.mensaje ? inputErrorStyle : inputBaseStyle), resize: 'vertical', minHeight: '120px' }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#B9965B'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(185,150,91,0.12)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.mensaje ? '#c0392b' : '#8A7060'; e.currentTarget.style.boxShadow = 'none'; }}
                      aria-invalid={!!errors.mensaje} aria-describedby={errors.mensaje ? 'error-mensaje' : undefined}
                    />
                    {errors.mensaje && <span id="error-mensaje" style={errorTextStyle} role="alert">{errors.mensaje}</span>}
                  </div>

                  <button
                    type="submit" disabled={sendStatus === 'sending'}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: sendStatus === 'sending' ? '#D4B483' : '#B9965B', color: '#ffffff', padding: '15px 32px', borderRadius: '10px', fontWeight: 600, fontSize: '0.95rem', fontFamily: 'var(--font-body)', border: 'none', cursor: sendStatus === 'sending' ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(185,150,91,0.3)', width: '100%' }}
                    onMouseOver={(e) => { if (sendStatus !== 'sending') { e.currentTarget.style.backgroundColor = '#A07C42'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = sendStatus === 'sending' ? '#D4B483' : '#B9965B'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    aria-label={sendStatus === 'sending' ? t(messages, 'contact.form.sending') : t(messages, 'contact.form.send')}
                  >
                    {sendStatus === 'sending' ? <><BronzeSpinner /><span>{t(messages, 'contact.form.sending')}</span></> : <><span>{t(messages, 'contact.form.send')}</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCION 3 — Franja de confianza */}
      <section aria-label="Por qué elegirnos" style={{ backgroundColor: '#ffffff', padding: 'clamp(44px, 6vw, 72px) 24px', borderTop: '1px solid rgba(160,144,112,0.2)', borderBottom: '1px solid rgba(160,144,112,0.2)' }}>
        <div ref={trustRef} style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer} initial="hidden" animate={trustVisible ? 'visible' : 'hidden'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0' }}>
            {trustItems.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <motion.div variants={trustItemVariant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: 'clamp(16px, 3vw, 28px) clamp(24px, 4vw, 52px)', textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem', lineHeight: 1 }} role="img" aria-label={trustEmojiLabels[index] || item}>
                    {trustEmojis[index]}
                  </span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#8A7060', margin: 0, fontWeight: 500, letterSpacing: '0.02em', lineHeight: 1.4, maxWidth: '160px' }}>
                    {item}
                  </p>
                </motion.div>
                {index < trustItems.length - 1 && (
                  <motion.div variants={trustItemVariant} style={{ width: '1px', height: '48px', backgroundColor: 'rgba(185,150,91,0.35)', flexShrink: 0 }} aria-hidden="true" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECCION 4 — Frase de cierre */}
      <section aria-label="Filosofía" style={{ backgroundColor: '#2B1F1A', padding: 'clamp(70px, 10vw, 120px) 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(185,150,91,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />
        <div ref={closingRef} style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={fadeUp} initial="hidden" animate={closingVisible ? 'visible' : 'hidden'} style={{ maxWidth: '680px', margin: '0 auto' }}>
            <blockquote style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', fontWeight: 700, fontStyle: 'italic', color: '#F5EDE3', lineHeight: 1.2, margin: '0 0 20px', quotes: 'none' }}>
              &ldquo;{t(messages, 'contact.closing')}&rdquo;
            </blockquote>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: 'rgba(245,237,227,0.72)', margin: 0, letterSpacing: '0.02em' }}>
              {t(messages, 'contact.closingSub')}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
