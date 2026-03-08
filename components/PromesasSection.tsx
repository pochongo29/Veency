'use client';

import { motion } from 'framer-motion';

// ─── Iconos SVG inline ────────────────────────────────────────────────────────

function IconEnvio() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="2" y="9" width="24" height="16" rx="2" stroke="#D4B483" strokeWidth="1.7" />
      <path d="M26 13h5l3 5v5h-8V13z" stroke="#D4B483" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="9" cy="27" r="2.5" stroke="#D4B483" strokeWidth="1.7" />
      <circle cx="27" cy="27" r="2.5" stroke="#D4B483" strokeWidth="1.7" />
    </svg>
  );
}

function IconManos() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M18 6c0 0-8 5-8 13a8 8 0 0016 0C26 11 18 6 18 6z"
        stroke="#D4B483"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M18 14v10" stroke="#D4B483" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M14 18l4-4 4 4" stroke="#D4B483" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconEstrella() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M18 4l3.9 8.1L31 13.5l-6.5 6.3 1.5 9L18 24.4l-8 4.4 1.5-9L5 13.5l9.1-1.4L18 4z"
        stroke="#D4B483"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="14" stroke="#D4B483" strokeWidth="1.7" />
      <path
        d="M24 21.5c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.1-.2.2-.8.9-1 1.1-.2.2-.4.2-.7.1C16.4 21 14 18.4 13.8 18c-.2-.4 0-.6.2-.8l.5-.6c.1-.2.2-.4.3-.6.1-.2 0-.4-.1-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5H12c-.2 0-.5.1-.8.4C10.9 14.1 10 15.1 10 17c0 1.9 1.4 3.7 1.6 4 .2.3 2.7 4.1 6.5 5.7 3.9 1.6 3.9 1 4.6.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.7-.1-.1-.3-.2-.6-.3z"
        fill="#D4B483"
      />
    </svg>
  );
}

const promesas = [
  {
    icon: <IconEnvio />,
    titulo: 'Envío a toda la República',
    desc: 'Llevamos tu collar favorito hasta la puerta de tu casa, a cualquier rincón de México.',
  },
  {
    icon: <IconManos />,
    titulo: 'Hecho a mano',
    desc: 'Cada pieza se elabora artesanalmente con dedicación y técnicas tradicionales mexicanas.',
  },
  {
    icon: <IconEstrella />,
    titulo: 'Materiales seleccionados',
    desc: 'Usamos solo materiales de primera calidad: oro 18k, piedras naturales y vidrio importado.',
  },
  {
    icon: <IconWhatsApp />,
    titulo: 'Atención personalizada',
    desc: 'Estamos aquí para ayudarte. Contáctanos por WhatsApp y te asesoramos al momento.',
  },
];

const tileVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
};

export default function PromesasSection() {
  return (
    <section
      style={{
        backgroundColor: '#1A1210',
        padding: 'clamp(72px, 10vw, 110px) clamp(24px, 5vw, 80px)',
      }}
    >
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 72px)' }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
            fontWeight: 400,
            color: '#ffffff',
            marginBottom: '28px',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}
        >
          Nuestra promesa
        </h2>

        {/* Línea divisora dorada */}
        <div
          style={{
            width: '48px',
            height: '1px',
            backgroundColor: '#D4B483',
            margin: '0 auto',
            opacity: 0.6,
          }}
        />
      </motion.div>

      {/* Grid 4 tiles */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(24px, 3vw, 40px)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {promesas.map((p, i) => (
          <motion.div
            key={p.titulo}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={tileVariants}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: 'clamp(28px, 3vw, 40px) clamp(16px, 2vw, 24px)',
              borderTop: '1px solid rgba(212,180,131,0.15)',
            }}
          >
            {/* Ícono */}
            <div style={{ marginBottom: '24px' }}>{p.icon}</div>

            {/* Título */}
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
                fontWeight: 400,
                color: '#ffffff',
                marginBottom: '12px',
                lineHeight: 1.3,
              }}
            >
              {p.titulo}
            </p>

            {/* Descripción */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.8rem, 1vw, 0.88rem)',
                color: 'rgba(255,255,255,0.48)',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
