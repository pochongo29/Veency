'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';

interface Props {
  locale: Locale;
}

const blocks = [
  {
    badge: 'Chapa de Oro',
    title: 'Oro que\ndura toda la vida',
    italic: false,
    desc: 'Nuestras piezas bañadas en oro 18k están diseñadas para resistir el tiempo. Materiales de primera seleccionados uno a uno para que brillen contigo cada día.',
    link: { label: 'Explorar →', href: (locale: string) => `/${locale}/catalogo/chapa-de-oro` },
    image: 'https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Collar de chapa de oro 18k — Veency',
    // imagen izquierda 60%, texto derecha 40%
    imageLeft: true,
    imageCols: '60%',
    textCols: '40%',
    bgColor: '#EDE6D9',
  },
  {
    badge: 'Hecho en México',
    title: 'Artesanal\ndesde el corazón',
    italic: false,
    desc: 'Cada collar que elaboramos nace de manos mexicanas. Técnicas heredadas, materiales naturales y una dedicación que se nota pieza por pieza.',
    link: { label: 'Ver colección →', href: (locale: string) => `/${locale}/catalogo/artesanal` },
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Joyería artesanal mexicana — Veency',
    // texto izquierda 40%, imagen derecha 60%
    imageLeft: false,
    imageCols: '60%',
    textCols: '40%',
    bgColor: '#F5EDE3',
  },
] as const;

const fadeVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: 'easeOut' as const },
  },
};

export default function HomeEditorial({ locale }: Props) {
  return (
    <div>
      {blocks.map((block) => (
        <div
          key={block.badge}
          style={{
            display: 'grid',
            gridTemplateColumns: block.imageLeft
              ? `${block.imageCols} ${block.textCols}`
              : `${block.textCols} ${block.imageCols}`,
            minHeight: '70vh',
            backgroundColor: block.bgColor,
          }}
        >
          {/* Imagen */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              order: block.imageLeft ? 0 : 1,
            }}
          >
            <Image
              src={block.image}
              alt={block.imageAlt}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>

          {/* Texto */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeVariants}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(48px, 8vw, 100px) clamp(36px, 6vw, 80px)',
              order: block.imageLeft ? 1 : 0,
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: '0.62rem',
                fontWeight: 600,
                color: '#B9965B',
                textTransform: 'uppercase',
                letterSpacing: '0.34em',
                marginBottom: '22px',
                fontFamily: 'var(--font-body)',
              }}
            >
              {block.badge}
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 3.6vw, 3.6rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#2B1F1A',
                lineHeight: 1.08,
                marginBottom: '24px',
                letterSpacing: '-0.01em',
                whiteSpace: 'pre-line',
              }}
            >
              {block.title}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.92rem, 1.3vw, 1rem)',
                color: '#8A7060',
                lineHeight: 1.85,
                marginBottom: '40px',
                maxWidth: '380px',
              }}
            >
              {block.desc}
            </p>

            <Link
              href={block.link.href(locale)}
              style={{
                alignSelf: 'flex-start',
                fontSize: '0.75rem',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                color: '#2B1F1A',
                textDecoration: 'none',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderBottom: '1px solid #2B1F1A',
                paddingBottom: '2px',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#B9965B';
                e.currentTarget.style.borderColor = '#B9965B';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#2B1F1A';
                e.currentTarget.style.borderColor = '#2B1F1A';
              }}
            >
              {block.link.label}
            </Link>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
