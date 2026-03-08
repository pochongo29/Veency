import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo';
import { locales, defaultLocale, localeMetadata } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface Props {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[localeMetadata[loc].htmlLang] = `${siteConfig.url}/${loc}/contacto`;
  }

  return {
    ...generatePageMetadata({
      title: 'Contacto | Hablemos de tu Collar Ideal',
      description:
        'Contáctanos por WhatsApp, correo o Instagram. Respondemos en menos de 24 horas. Pedidos personalizados, consultas y envíos a toda la República Mexicana.',
      path: `/${locale}/contacto`,
      keywords: [
        'contacto Veency', 'comprar collar artesanal', 'pedido personalizado collar',
        'consulta collar artesanal', 'envío collares México', 'WhatsApp joyería artesanal',
      ],
    }),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/contacto`,
      languages,
    },
  };
}

export default function ContactoLayout({ children }: Props) {
  return <>{children}</>;
}
