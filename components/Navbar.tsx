'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { locales, localeMetadata, type Locale, type Messages, t } from '@/lib/i18n';

interface NavbarProps {
  locale: Locale;
  messages: Messages;
}

export default function Navbar({ locale, messages }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const totalItems = useCartStore((s) => s.totalItems);
  const favoritesCount = useFavoritesStore((s) => s.favoritesCount);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    if (langOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langOpen]);

  const cartCount = mounted ? totalItems() : 0;
  const favCount = mounted ? favoritesCount() : 0;

  const navLinks = [
    { href: `/${locale}`, label: t(messages, 'nav.home') },
    { href: `/${locale}/nuevo-en`, label: t(messages, 'nav.newIn') },
    { href: `/${locale}/para-ellas`, label: t(messages, 'nav.forHer') },
    { href: `/${locale}/para-ellos`, label: t(messages, 'nav.forHim') },
    { href: `/${locale}/regalos`, label: t(messages, 'nav.gifts') },
    { href: `/${locale}/colecciones`, label: t(messages, 'nav.collections') },
    { href: `/${locale}/contacto`, label: t(messages, 'nav.contact') },
  ];

  function changeLocale(newLocale: Locale) {
    setLangOpen(false);
    setMenuOpen(false);
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/') || `/${newLocale}`;
    router.push(newPath);
  }

  const currentMeta = localeMetadata[locale];

  // Tesla-style: transparente en home (no scroll) → oscuro en home (scroll)
  // En otras páginas mantiene el estilo sand original
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
  const useDarkTheme = isHomePage;

  // Colores según tema
  const textColor = useDarkTheme ? '#ffffff' : '#2B1F1A';
  const logoColor = useDarkTheme ? '#ffffff' : '#B9965B';
  const taglineColor = useDarkTheme ? 'rgba(255,255,255,0.6)' : '#B98C73';
  const iconStroke = useDarkTheme ? '#ffffff' : '#B9965B';
  const activeLinkColor = useDarkTheme ? '#ffffff' : '#B9965B';
  const activeBorderColor = useDarkTheme ? '#D4B483' : '#B98C73';
  const langBorderColor = useDarkTheme
    ? (langOpen ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)')
    : (langOpen ? '#B9965B' : 'rgba(138,112,96,0.4)');
  const langBgColor = useDarkTheme
    ? (langOpen ? 'rgba(255,255,255,0.1)' : 'transparent')
    : (langOpen ? 'rgba(185,150,91,0.06)' : 'transparent');

  // Fondo del navbar
  const navBg = isHomePage
    ? (scrolled ? 'rgba(26,18,16,0.88)' : 'transparent')
    : (scrolled ? 'rgba(245,237,227,0.97)' : '#F5EDE3');
  const navBorderBottom = isHomePage
    ? (scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent')
    : (scrolled ? '1px solid rgba(138,112,96,0.25)' : '1px solid transparent');
  const navBoxShadow = (!isHomePage && scrolled) ? '0 2px 20px rgba(185,150,91,0.1)' : 'none';
  const navBackdropFilter = (isHomePage && scrolled) ? 'blur(12px)' : 'none';

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        backgroundColor: navBg,
        borderBottom: navBorderBottom,
        boxShadow: navBoxShadow,
        backdropFilter: navBackdropFilter,
        WebkitBackdropFilter: navBackdropFilter,
        transition: 'all 0.3s ease',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
              <span style={{ fontFamily: 'var(--font-heading)', color: logoColor, fontSize: '1.75rem', fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1, transition: 'color 0.3s' }}>
                Veency
              </span>
              <span style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.25em', color: taglineColor, textTransform: 'uppercase', marginTop: '-2px', fontFamily: 'var(--font-body)', transition: 'color 0.3s' }}>
                Joyería Artesanal
              </span>
            </motion.div>
          </Link>

          {/* Links desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? activeLinkColor : textColor,
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    paddingBottom: '2px',
                    borderBottom: isActive ? `2px solid ${activeBorderColor}` : '2px solid transparent',
                    transition: 'all 0.2s ease',
                    opacity: useDarkTheme && !isActive ? 0.85 : 1,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Iconos + selector de idioma */}
          <div className="flex items-center gap-2">

            {/* Selector de idioma */}
            <div ref={langRef} style={{ position: 'relative' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLangOpen((v) => !v)}
                aria-label={t(messages, 'langSelector.label')}
                aria-expanded={langOpen}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: `1.5px solid ${langBorderColor}`,
                  backgroundColor: langBgColor,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: textColor,
                  transition: 'all 0.2s',
                }}
              >
                <span role="img" aria-label={currentMeta.label} style={{ fontSize: '1rem', lineHeight: 1 }}>
                  {currentMeta.flag}
                </span>
                <span>{currentMeta.label}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.button>

              {/* Dropdown de idiomas */}
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid rgba(160, 144, 112, 0.25)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                      overflow: 'hidden',
                      minWidth: '140px',
                      zIndex: 60,
                    }}
                  >
                    {locales.map((loc) => {
                      const meta = localeMetadata[loc];
                      const isActive = loc === locale;
                      return (
                        <button
                          key={loc}
                          onClick={() => changeLocale(loc)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 16px',
                            border: 'none',
                            backgroundColor: isActive ? 'rgba(185, 150, 91, 0.08)' : 'transparent',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.85rem',
                            fontWeight: isActive ? 700 : 400,
                            color: isActive ? '#B9965B' : '#2B1F1A',
                            textAlign: 'left',
                            transition: 'background-color 0.15s',
                          }}
                          onMouseOver={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(185, 150, 91, 0.05)'; }}
                          onMouseOut={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                          <span role="img" aria-label={meta.label} style={{ fontSize: '1.1rem', lineHeight: 1 }}>{meta.flag}</span>
                          <span>{meta.label}</span>
                          {isActive && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B9965B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto' }} aria-hidden="true">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Favoritos */}
            <Link href={`/${locale}/favoritos`} className="relative p-2 group" aria-label={t(messages, 'nav.favorites')}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill={favCount > 0 ? '#B9965B' : 'none'} stroke={iconStroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s' }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {favCount > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: 'absolute', top: '0px', right: '0px', backgroundColor: '#B9965B', color: '#fff', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 700, width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {favCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Carrito */}
            <Link href={`/${locale}/carrito`} className="relative p-2 group" aria-label={t(messages, 'nav.cart')}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s' }}>
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && (
                  <motion.span key={cartCount} initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: 'absolute', top: '0px', right: '0px', backgroundColor: '#B9965B', color: '#fff', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 700, width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {cartCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Hamburguesa móvil */}
            <button className="md:hidden p-2" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menu">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} style={{ display: 'block', width: '22px', height: '2px', backgroundColor: iconStroke, borderRadius: '2px', transition: 'background-color 0.3s' }} />
                <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} style={{ display: 'block', width: '22px', height: '2px', backgroundColor: iconStroke, borderRadius: '2px', transition: 'background-color 0.3s' }} />
                <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} style={{ display: 'block', width: '22px', height: '2px', backgroundColor: iconStroke, borderRadius: '2px', transition: 'background-color 0.3s' }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              backgroundColor: useDarkTheme ? 'rgba(26,18,16,0.95)' : '#F5EDE3',
              borderTop: useDarkTheme
                ? '1px solid rgba(255,255,255,0.08)'
                : '1px solid rgba(138,112,96,0.25)',
              backdropFilter: useDarkTheme ? 'blur(12px)' : 'none',
            }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      color: isActive ? activeLinkColor : textColor,
                      fontWeight: isActive ? 600 : 400,
                      backgroundColor: isActive
                        ? (useDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(185,150,91,0.1)')
                        : 'transparent',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Selector de idioma en móvil */}
              <div style={{ borderTop: `1px solid ${useDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(138,112,96,0.2)'}`, marginTop: '8px', paddingTop: '12px' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 600, color: useDarkTheme ? 'rgba(255,255,255,0.4)' : '#8A7060', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-body)', marginBottom: '8px', paddingLeft: '12px' }}>
                  {t(messages, 'langSelector.label')}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '0 8px' }}>
                  {locales.map((loc) => {
                    const meta = localeMetadata[loc];
                    const isActive = loc === locale;
                    return (
                      <button
                        key={loc}
                        onClick={() => changeLocale(loc)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: `1.5px solid ${isActive
                            ? (useDarkTheme ? 'rgba(255,255,255,0.8)' : '#B9965B')
                            : (useDarkTheme ? 'rgba(255,255,255,0.25)' : 'rgba(138,112,96,0.3)')}`,
                          backgroundColor: isActive
                            ? (useDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(185,150,91,0.1)')
                            : 'transparent',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.82rem',
                          fontWeight: isActive ? 700 : 400,
                          color: textColor,
                        }}
                      >
                        <span role="img" aria-label={meta.label} style={{ fontSize: '1rem' }}>{meta.flag}</span>
                        <span>{meta.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
