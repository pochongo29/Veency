import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Veency — Collares Artesanales Hechos a Mano en México';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow superior derecho */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,200,122,0.18) 0%, transparent 65%)',
            display: 'flex',
          }}
        />

        {/* Glow inferior izquierdo */}
        <div
          style={{
            position: 'absolute',
            bottom: -160,
            left: -80,
            width: 460,
            height: 460,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184,115,51,0.12) 0%, transparent 65%)',
            display: 'flex',
          }}
        />

        {/* Badge superior */}
        <div
          style={{
            display: 'flex',
            fontSize: 16,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginBottom: 28,
          }}
        >
          JOYERÍA ARTESANAL · HECHA A MANO · MÉXICO
        </div>

        {/* Nombre de marca */}
        <div
          style={{
            display: 'flex',
            fontSize: 128,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.06em',
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          Veency
        </div>

        {/* Línea dorada */}
        <div
          style={{
            width: 72,
            height: 3,
            backgroundColor: '#e8c87a',
            borderRadius: 2,
            marginBottom: 28,
            display: 'flex',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 400,
            letterSpacing: '0.05em',
          }}
        >
          Collares únicos hechos con alma
        </div>

        {/* URL en esquina inferior derecha */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            right: 48,
            display: 'flex',
            fontSize: 15,
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.08em',
          }}
        >
          veency.mx
        </div>
      </div>
    ),
    { ...size }
  );
}
