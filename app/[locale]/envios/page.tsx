import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { getMessages, locales, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  return generatePageMetadata({
    title: 'Política de Envíos y Devoluciones',
    description: 'Información sobre envíos, tiempos de entrega y política de devoluciones de Veency.',
    path: `/${locale}/envios`,
    noindex: true,
  });
}

const sectionStyle: React.CSSProperties = { marginBottom: '36px' };
const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.2rem',
  fontWeight: 700,
  color: '#2B1F1A',
  marginBottom: '12px',
};
const pStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  lineHeight: 1.8,
  color: '#4a4a4a',
  marginBottom: '12px',
};

const infoCardStyle: React.CSSProperties = {
  backgroundColor: 'rgba(185,150,91,0.06)',
  border: '1px solid rgba(185,150,91,0.2)',
  borderRadius: '12px',
  padding: '20px 24px',
  marginBottom: '16px',
};

export default async function EnviosPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  await getMessages(locale);

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#F5EDE3', padding: '48px 24px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>

        <div style={{ marginBottom: '48px' }}>
          <span style={{
            display: 'block',
            fontSize: '0.72rem',
            fontWeight: 600,
            color: '#B98C73',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            marginBottom: '12px',
            fontFamily: 'var(--font-body)',
          }}>
            Legal
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: '#2B1F1A',
            marginBottom: '16px',
          }}>
            Política de Envíos y Devoluciones
          </h1>
          <p style={{ ...pStyle, color: '#8A7060' }}>Última actualización: marzo de 2025</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: 'clamp(28px, 5vw, 48px)', border: '1px solid rgba(160,144,112,0.2)' }}>

          {/* Resumen rápido */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '40px' }}>
            <div style={infoCardStyle}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#B9965B', margin: '0 0 4px' }}>
                Envío gratis
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#8A7060', margin: 0 }}>
                En pedidos mayores a $500 MXN
              </p>
            </div>
            <div style={infoCardStyle}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#B9965B', margin: '0 0 4px' }}>
                3–7 días hábiles
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#8A7060', margin: 0 }}>
                Tiempo de entrega estimado
              </p>
            </div>
            <div style={infoCardStyle}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#B9965B', margin: '0 0 4px' }}>
                7 días naturales
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#8A7060', margin: 0 }}>
                Para devoluciones y cambios
              </p>
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>1. Cobertura de envíos</h2>
            <p style={pStyle}>
              Realizamos envíos a toda la República Mexicana. Para pedidos internacionales, contáctanos directamente para coordinar opciones y costos.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>2. Costos de envío</h2>
            <p style={pStyle}>
              El envío es <strong style={{ color: '#B9965B' }}>gratuito</strong> en pedidos iguales o mayores a $500 MXN. Para pedidos menores, el costo de envío se calcula según la zona de destino y se informa al confirmar el pedido (generalmente entre $80 y $150 MXN).
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>3. Tiempos de entrega</h2>
            <p style={pStyle}>
              Los tiempos de entrega estimados son:
            </p>
            <ul style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#4a4a4a', lineHeight: 2, paddingLeft: '20px' }}>
              <li><strong>CDMX y Área Metropolitana:</strong> 1–3 días hábiles</li>
              <li><strong>Resto de la República:</strong> 3–7 días hábiles</li>
            </ul>
            <p style={{ ...pStyle, marginTop: '12px' }}>
              Los tiempos son estimados y pueden variar por temporadas altas (Día de las Madres, Navidad, etc.) o situaciones fuera de nuestro control.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>4. Seguimiento de pedido</h2>
            <p style={pStyle}>
              Una vez enviado tu pedido, te compartiremos el número de guía por WhatsApp para que puedas rastrear tu paquete en tiempo real.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>5. Devoluciones y cambios</h2>
            <p style={pStyle}>
              Aceptamos devoluciones y cambios dentro de los <strong>7 días naturales</strong> posteriores a la recepción del producto, bajo las siguientes condiciones:
            </p>
            <ul style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#4a4a4a', lineHeight: 2, paddingLeft: '20px' }}>
              <li>El producto debe estar en condiciones originales (sin uso)</li>
              <li>Debe conservar su empaque original</li>
              <li>Los gastos de envío por devolución corren a cargo del cliente</li>
              <li>No aplica para piezas personalizadas</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>6. Producto dañado o incorrecto</h2>
            <p style={pStyle}>
              Si recibes un producto dañado o diferente al pedido, contáctanos inmediatamente (dentro de las primeras 48 horas de recibido) y nos haremos cargo del cambio o reembolso sin costo alguno para ti.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>7. Contacto</h2>
            <p style={pStyle}>
              Para gestionar una devolución o resolver cualquier duda sobre tu pedido:{' '}
              <a href="mailto:hola@veency.mx" style={{ color: '#B9965B', fontWeight: 600 }}>
                hola@veency.mx
              </a>
              {' '}o directamente por WhatsApp.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
