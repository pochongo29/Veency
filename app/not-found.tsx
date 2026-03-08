import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="es">
      <body style={{ margin: 0, backgroundColor: '#1A1210', color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow decorativo */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,180,131,0.08) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          <span style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            letterSpacing: '0.32em',
            marginBottom: '24px',
          }}>
            Error 404
          </span>

          <h1 style={{
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1,
            marginBottom: '20px',
          }}>
            Veency
          </h1>

          <div style={{
            width: '56px',
            height: '2px',
            backgroundColor: '#D4B483',
            borderRadius: '2px',
            marginBottom: '24px',
          }} />

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
            maxWidth: '420px',
            marginBottom: '40px',
          }}>
            Esta página no existe o fue movida.<br />
            Volvamos a lo que importa.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/es"
              style={{
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                padding: '11px 28px',
                borderRadius: '9999px',
                fontWeight: 500,
                fontSize: '0.9rem',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              Ir al inicio
            </Link>
            <Link
              href="/es/catalogo"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                padding: '11px 28px',
                borderRadius: '9999px',
                fontWeight: 500,
                fontSize: '0.9rem',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
