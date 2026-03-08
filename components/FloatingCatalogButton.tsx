'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';

export default function FloatingCatalogButton({ locale }: { locale: Locale }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 40,
      }}
    >
      <Link
        href={`/${locale}/catalogo`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#B9965B',
          color: '#ffffff',
          padding: '16px 28px',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          fontWeight: 700,
          fontFamily: 'var(--font-body)',
          textDecoration: 'none',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '0 8px 32px rgba(185,150,91,0.45)',
          transition: 'background-color 0.2s, transform 0.2s, box-shadow 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#A07C42';
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(185,150,91,0.55)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#B9965B';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(185,150,91,0.45)';
        }}
      >
        Catálogo
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </motion.div>
  );
}
