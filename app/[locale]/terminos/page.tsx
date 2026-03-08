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
    title: 'Términos y Condiciones',
    description: 'Lee los términos y condiciones de compra en Veency.',
    path: `/${locale}/terminos`,
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

export default async function TerminosPage({ params }: Props) {
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
            Términos y Condiciones
          </h1>
          <p style={{ ...pStyle, color: '#8A7060' }}>Última actualización: marzo de 2025</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: 'clamp(28px, 5vw, 48px)', border: '1px solid rgba(160,144,112,0.2)' }}>

          <div style={sectionStyle}>
            <h2 style={h2Style}>1. Acerca de Veency</h2>
            <p style={pStyle}>
              Veency es una marca de joyería artesanal mexicana dedicada a la creación y venta de collares hechos a mano. Al realizar una compra o contactarnos, aceptas los presentes términos y condiciones.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>2. Productos</h2>
            <p style={pStyle}>
              Todas nuestras piezas son artesanales y hechas a mano, por lo que pueden existir ligeras variaciones entre el producto mostrado en fotos y el producto final. Estas variaciones son parte del encanto de lo hecho a mano y no constituyen defecto.
            </p>
            <p style={pStyle}>
              Los precios están en Pesos Mexicanos (MXN) y pueden cambiar sin previo aviso. El precio válido es el vigente al momento de confirmar tu pedido.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>3. Proceso de compra</h2>
            <p style={pStyle}>
              Los pedidos se confirman a través de WhatsApp o correo electrónico. Un pedido se considera confirmado una vez que Veency lo acepta y se recibe el pago o anticipo acordado.
            </p>
            <p style={pStyle}>
              Nos reservamos el derecho de cancelar un pedido si el producto no está disponible, en cuyo caso se realizará el reembolso correspondiente.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>4. Pagos</h2>
            <p style={pStyle}>
              Aceptamos pagos en efectivo, transferencia bancaria, tarjeta de crédito/débito y PayPal. Los detalles de pago se coordinan directamente con el cliente al confirmar el pedido.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>5. Devoluciones y cambios</h2>
            <p style={pStyle}>
              Aceptamos devoluciones o cambios dentro de los primeros 7 días naturales después de recibir el producto, siempre que este se encuentre en condiciones originales (sin uso, con empaque original). Los gastos de envío por devolución corren a cargo del cliente.
            </p>
            <p style={pStyle}>
              No se aceptan devoluciones en piezas personalizadas o con grabado especial.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>6. Propiedad intelectual</h2>
            <p style={pStyle}>
              Todos los diseños, fotografías y contenido de Veency son propiedad exclusiva de la marca. Queda prohibida su reproducción o uso sin autorización expresa por escrito.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>7. Contacto</h2>
            <p style={pStyle}>
              Para cualquier duda sobre estos términos:{' '}
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
