// ---------------------------------------------------------------------------
// Layout raíz mínimo — solo provee la estructura HTML base.
// El idioma real (lang) se setea en app/[locale]/layout.tsx
// donde tenemos acceso al parámetro de locale.
// ---------------------------------------------------------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
