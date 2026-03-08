import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// Configuración de locales (duplicada aquí para evitar importar desde lib/
// ya que el middleware corre en el Edge runtime y no puede usar dynamic import)
// ---------------------------------------------------------------------------
const locales = ['es', 'en', 'fr', 'pt'] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = 'es';

// Patrones de rutas que el middleware debe ignorar completamente.
// Se excluyen archivos estáticos, API routes y rutas especiales de Next.js.
const EXCLUDED_PATTERNS = [
  /^\/_next\//,        // Archivos internos de Next.js
  /^\/api\//,          // API routes
  /^\/favicon\.ico$/,  // Favicon
  /^\/sitemap\.xml$/,  // Sitemap
  /^\/robots\.txt$/,   // Robots
  /^\/og-image/,       // Open Graph images
  /^\/logo\./,         // Logo
  /^\/apple-touch/,    // Apple touch icon
  /\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|otf|css|js|map|mp4|mp3|webm|ogg|wav)$/i, // Estáticos
];

// ---------------------------------------------------------------------------
// Detecta el locale preferido del usuario a partir del header Accept-Language.
// Retorna el primer locale soportado que encuentre, o el defaultLocale.
// ---------------------------------------------------------------------------
function getPreferredLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  // Parsea los valores como "es-MX,es;q=0.9,en;q=0.8"
  const preferred = acceptLanguage
    .split(',')
    .map((entry) => {
      const [lang, q] = entry.trim().split(';q=');
      return {
        lang: lang.trim().toLowerCase().split('-')[0], // Toma solo el prefijo: "es"
        q: q ? parseFloat(q) : 1.0,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferred) {
    if (locales.includes(lang as Locale)) {
      return lang as Locale;
    }
  }

  return defaultLocale;
}

// ---------------------------------------------------------------------------
// Middleware principal
// ---------------------------------------------------------------------------
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ignorar rutas excluidas
  for (const pattern of EXCLUDED_PATTERNS) {
    if (pattern.test(pathname)) {
      return NextResponse.next();
    }
  }

  // 2. Verificar si la URL ya tiene un prefijo de locale válido
  // Ejemplo: /es/catalogo -> tiene prefijo "es"
  const firstSegment = pathname.split('/')[1];
  const hasLocalePrefix = locales.includes(firstSegment as Locale);

  if (hasLocalePrefix) {
    // Ya tiene locale en la URL — continuar sin redirigir
    return NextResponse.next();
  }

  // 3. La URL no tiene locale — detectar el preferido y redirigir
  const locale = getPreferredLocale(request);

  // Construir la nueva URL con el locale como primer segmento
  // Ejemplo: /catalogo -> /es/catalogo
  //          /          -> /es
  const newPathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = newPathname;

  return NextResponse.redirect(redirectUrl, { status: 307 }); // 307 preserva el método HTTP
}

// ---------------------------------------------------------------------------
// Configuración del matcher — qué rutas ejecutan el middleware.
// Excluimos explícitamente los archivos estáticos de _next y public/.
// ---------------------------------------------------------------------------
export const config = {
  matcher: [
    /*
     * Ejecutar en todas las rutas EXCEPTO:
     * - _next/static (archivos estáticos de Next.js)
     * - _next/image (optimización de imágenes de Next.js)
     * - favicon.ico
     * - Archivos con extensión conocida en la raíz (imágenes, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf|css|js|map|mp4|mp3|webm|ogg|wav)$).*)',
  ],
};
