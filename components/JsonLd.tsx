// Componente para inyectar datos estructurados JSON-LD en cualquier pagina.
// Se renderiza del lado del servidor (no necesita 'use client').
// Uso: <JsonLd data={schemaObject} />

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML es la unica forma correcta de inyectar JSON-LD
      // en Next.js sin que React escape los caracteres especiales.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
