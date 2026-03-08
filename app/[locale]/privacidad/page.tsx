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
    title: 'Política de Privacidad',
    description: 'Conoce cómo Veency protege y maneja tu información personal.',
    path: `/${locale}/privacidad`,
    noindex: true,
  });
}

const sectionStyle: React.CSSProperties = {
  marginBottom: '36px',
};

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

export default async function PrivacidadPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  await getMessages(locale);

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#F5EDE3', padding: '48px 24px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>

        {/* Header */}
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
            Política de Privacidad
          </h1>
          <p style={{ ...pStyle, color: '#8A7060' }}>
            Última actualización: marzo de 2025
          </p>
        </div>

        {/* Contenido */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: 'clamp(28px, 5vw, 48px)', border: '1px solid rgba(160,144,112,0.2)' }}>

          <div style={sectionStyle}>
            <h2 style={h2Style}>1. Información que recopilamos</h2>
            <p style={pStyle}>
              En Veency recopilamos únicamente la información necesaria para procesar tus pedidos y brindarte una mejor experiencia. Esto incluye: nombre completo, número de teléfono (WhatsApp), dirección de envío y correo electrónico cuando aplica.
            </p>
            <p style={pStyle}>
              No almacenamos datos de tarjetas bancarias. Los pagos se gestionan directamente entre cliente y vendedor por los canales acordados.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>2. Uso de tu información</h2>
            <p style={pStyle}>
              Utilizamos tu información exclusivamente para: confirmar y procesar tu pedido, coordinar el envío, enviarte actualizaciones sobre tu compra y, con tu consentimiento, informarte de nuevas colecciones y promociones.
            </p>
            <p style={pStyle}>
              Nunca venderemos, rentaremos ni compartiremos tu información personal con terceros con fines comerciales.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>3. Comunicaciones</h2>
            <p style={pStyle}>
              Las comunicaciones principales se realizan vía WhatsApp o correo electrónico. Si en algún momento deseas dejar de recibir comunicaciones de nuestra parte, puedes notificarnos en cualquier momento y eliminaremos tu información de nuestra lista de contactos.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>4. Seguridad</h2>
            <p style={pStyle}>
              Tomamos medidas razonables para proteger tu información personal. Sin embargo, ningún método de transmisión por internet o almacenamiento electrónico es 100% seguro. Hacemos nuestro mejor esfuerzo para proteger tu información.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>5. Tus derechos</h2>
            <p style={pStyle}>
              Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento. Para ejercer estos derechos, contáctanos a través de nuestro WhatsApp o correo electrónico y atenderemos tu solicitud en un plazo máximo de 5 días hábiles.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>6. Contacto</h2>
            <p style={pStyle}>
              Si tienes dudas sobre esta política, puedes contactarnos en:{' '}
              <a href="mailto:hola@veency.mx" style={{ color: '#B9965B', fontWeight: 600 }}>
                hola@veency.mx
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
