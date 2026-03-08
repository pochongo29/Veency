import Link from 'next/link';
import type { Locale, Messages } from '@/lib/i18n';
import { siteConfig } from '@/lib/seo';

interface FooterProps {
  locale: Locale;
  messages: Messages;
}

const linkStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.875rem',
  color: 'rgba(245,237,227,0.55)',
  textDecoration: 'none',
  fontFamily: 'var(--font-body)',
  paddingBottom: '10px',
  transition: 'color 0.2s',
};

const headingStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 700,
  color: 'rgba(245,237,227,0.35)',
  textTransform: 'uppercase',
  letterSpacing: '0.22em',
  marginBottom: '16px',
  fontFamily: 'var(--font-body)',
};

export default function Footer({ locale, messages }: FooterProps) {
  const year = new Date().getFullYear();
  const tagline = messages?.footer?.tagline ?? 'Joyería artesanal hecha con amor';
  const rights = messages?.footer?.rights ?? 'Todos los derechos reservados';

  return (
    <footer style={{ backgroundColor: '#1A1210', color: '#F5EDE3' }}>
      {/* Grid principal */}
      <div
        className="max-w-7xl mx-auto"
        style={{ padding: 'clamp(48px, 7vw, 72px) 24px 40px' }}
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: 'clamp(32px, 5vw, 48px)' }}
        >

          {/* Columna 1 — Marca */}
          <div>
            <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.04em',
                lineHeight: 1,
              }}>
                Veency
              </span>
              <span style={{
                display: 'block',
                fontSize: '0.58rem',
                letterSpacing: '0.22em',
                color: '#D4B483',
                textTransform: 'uppercase',
                marginTop: '3px',
                fontFamily: 'var(--font-body)',
              }}>
                Joyería Artesanal
              </span>
            </Link>

            <p style={{
              fontSize: '0.875rem',
              color: 'rgba(245,237,227,0.45)',
              lineHeight: 1.65,
              marginTop: '16px',
              marginBottom: '24px',
              fontFamily: 'var(--font-body)',
              maxWidth: '220px',
            }}>
              {tagline}
            </p>

            {/* Instagram */}
            <a
              href="https://instagram.com/veency.mx"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                color: 'rgba(245,237,227,0.55)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                marginBottom: '10px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              @veency.mx
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${siteConfig.whatsappPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                color: 'rgba(245,237,227,0.55)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.532 5.848L.057 23.492a.5.5 0 0 0 .61.61l5.644-1.475A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.373l-.36-.214-3.724.974.993-3.618-.234-.372A9.818 9.818 0 1 1 12 21.818z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Columna 2 — Tienda */}
          <div>
            <p style={headingStyle}>Tienda</p>
            <Link href={`/${locale}`} style={linkStyle}>Inicio</Link>
            <Link href={`/${locale}/catalogo`} style={linkStyle}>Catálogo</Link>
            <Link href={`/${locale}/nosotros`} style={linkStyle}>Nosotros</Link>
            <Link href={`/${locale}/contacto`} style={linkStyle}>Contacto</Link>
            <Link href={`/${locale}/favoritos`} style={linkStyle}>Mis Favoritos</Link>
            <Link href={`/${locale}/carrito`} style={linkStyle}>Mi Carrito</Link>
          </div>

          {/* Columna 3 — Colecciones */}
          <div>
            <p style={headingStyle}>Colecciones</p>
            <Link href={`/${locale}/catalogo/chapa-de-oro`} style={linkStyle}>Chapa de Oro</Link>
            <Link href={`/${locale}/catalogo/shakiras`} style={linkStyle}>Shakiras</Link>
            <Link href={`/${locale}/catalogo/shakirones`} style={linkStyle}>Shakirones</Link>
            <Link href={`/${locale}/catalogo/artesanal`} style={linkStyle}>Artesanal</Link>
          </div>

          {/* Columna 4 — Información */}
          <div>
            <p style={headingStyle}>Información</p>
            <Link href={`/${locale}/privacidad`} style={linkStyle}>Política de Privacidad</Link>
            <Link href={`/${locale}/terminos`} style={linkStyle}>Términos y Condiciones</Link>
            <Link href={`/${locale}/envios`} style={linkStyle}>Política de Envíos</Link>

            {/* Métodos de pago */}
            <div style={{ marginTop: '28px' }}>
              <p style={{ ...headingStyle, marginBottom: '10px' }}>Métodos de pago</p>
              <p style={{
                fontSize: '0.82rem',
                color: 'rgba(245,237,227,0.4)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.7,
              }}>
                Efectivo · Transferencia<br />
                Tarjeta · PayPal
              </p>
            </div>

            {/* Ciudad */}
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(245,237,227,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ fontSize: '0.78rem', color: 'rgba(245,237,227,0.35)', fontFamily: 'var(--font-body)' }}>
                Ciudad de México, México
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Barra inferior */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <p style={{
          fontSize: '0.78rem',
          color: 'rgba(245,237,227,0.3)',
          fontFamily: 'var(--font-body)',
          margin: 0,
        }}>
          &copy; {year} Veency &mdash; {rights}
        </p>
        <p style={{
          fontSize: '0.78rem',
          color: 'rgba(245,237,227,0.3)',
          fontFamily: 'var(--font-body)',
          margin: 0,
        }}>
          Hecho con amor en México
        </p>
      </div>
    </footer>
  );
}
