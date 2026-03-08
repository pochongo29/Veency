export type ProductCategory =
  | 'chapa-de-oro'
  | 'shakiras'
  | 'shakirones'
  | 'artesanal';

export type Tecnica =
  | 'alambrismo'
  | 'engarce'
  | 'tejido'
  | 'peyote'
  | 'macrame'
  | 'tejido-ruso'
  | 'punto-peruano';

export type Genero = 'ellas' | 'ellos' | 'unisex';

export interface Product {
  id: string;
  nombre: string;
  categoria: ProductCategory;
  genero: Genero;
  tecnica: Tecnica;
  material: string;
  precio: number;
  descripcion: string;
  imagen: string;
  galeria?: string[];  // imágenes adicionales para la galería
  stock: number;
  isNew: boolean;
  isBestSeller: boolean;
}

export const categoryLabels: Record<ProductCategory, string> = {
  'chapa-de-oro': 'Chapa de Oro',
  shakiras: 'Shakiras',
  shakirones: 'Shakirones',
  artesanal: 'Artesanal',
};

export const tecnicaLabels: Record<Tecnica, string> = {
  alambrismo: 'Alambrismo',
  engarce: 'Engarce',
  tejido: 'Tejido',
  peyote: 'Peyote',
  macrame: 'Macramé',
  'tejido-ruso': 'Tejido Ruso',
  'punto-peruano': 'Punto Peruano',
};

export const products: Product[] = [
  {
    id: 'COL-001',
    nombre: 'Collar Cadena Dorada Clásica',
    categoria: 'chapa-de-oro',
    genero: 'ellas',
    tecnica: 'engarce',
    material: 'Chapa de Oro 18k',
    precio: 28000,
    descripcion:
      'Elegante collar de cadena fina en chapa de oro 18k. Perfecto para uso diario, resistente al agua y al sudor. Cierre de langosta de alta calidad.',
    // Gold chain necklace on white surface — by Syed F Hashemi
    imagen: 'https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=600&q=80',
    galeria: [
      'https://images.unsplash.com/photo-1573408301185-9519f94815b1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    ],
    stock: 15,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'COL-002',
    nombre: 'Collar Corazón Enchapado',
    categoria: 'chapa-de-oro',
    genero: 'ellas',
    tecnica: 'engarce',
    material: 'Chapa de Oro 18k',
    precio: 32000,
    descripcion:
      'Delicado collar con dije de corazón en chapa de oro 18k. Un clásico regalo para quienes amas. Cadena de 45 cm ajustable.',
    // Woman wearing gold necklace with silver pendant — by lilartsy
    imagen: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?auto=format&fit=crop&w=600&q=80',
    stock: 8,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'COL-003',
    nombre: 'Collar Gargantilla Dorada',
    categoria: 'chapa-de-oro',
    genero: 'ellas',
    tecnica: 'alambrismo',
    material: 'Chapa de Oro 18k',
    precio: 24500,
    descripcion:
      'Gargantilla estilo minimalista en chapa de oro 18k. Diseño moderno que se adapta a cualquier escote. Ideal para regalar.',
    // Woman wearing gold necklace and earrings — by Mohammed Sultan Farooqui
    imagen: 'https://images.unsplash.com/photo-1645856049138-bcb23afaeefb?auto=format&fit=crop&w=600&q=80',
    stock: 12,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'COL-004',
    nombre: 'Shakira Multicolor Boho',
    categoria: 'shakiras',
    genero: 'ellas',
    tecnica: 'peyote',
    material: 'Mostacillas de vidrio',
    precio: 15000,
    descripcion:
      'Collar artesanal tejido a mano con mostacillas de vidrio importadas en colores tierra y dorado. Estilo bohemio único.',
    // Black green and purple beaded necklace — by Eduardo Casajús Gorostiaga
    imagen: 'https://images.unsplash.com/photo-1579624054375-72037da740e5?auto=format&fit=crop&w=600&q=80',
    galeria: [
      'https://images.unsplash.com/photo-1589422453619-3171862e49d2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80',
    ],
    stock: 20,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'COL-005',
    nombre: 'Shakira Turquesa y Coral',
    categoria: 'shakiras',
    genero: 'ellas',
    tecnica: 'peyote',
    material: 'Mostacillas de vidrio',
    precio: 16500,
    descripcion:
      'Collar de mostacillas en tonos turquesa y coral con acabado artesanal. Cada pieza es unica ya que se teje a mano.',
    // Blue and silver beaded necklace — by Sabrianna
    imagen: 'https://images.unsplash.com/photo-1589422453619-3171862e49d2?auto=format&fit=crop&w=600&q=80',
    stock: 7,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'COL-006',
    nombre: 'Shakira Minimalista Blanca',
    categoria: 'shakiras',
    genero: 'ellas',
    tecnica: 'tejido',
    material: 'Mostacillas de vidrio',
    precio: 13000,
    descripcion:
      'Diseño delicado en mostacillas blancas y plateadas. Minimalista y elegante, perfecto para el dia a dia.',
    // Gold and silver beaded necklace — by Martin de Arriba
    imagen: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80',
    stock: 18,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'COL-007',
    nombre: 'Shakira Tropical Verano',
    categoria: 'shakiras',
    genero: 'ellas',
    tecnica: 'punto-peruano',
    material: 'Mostacillas de vidrio',
    precio: 17000,
    descripcion:
      'Explosión de colores tropicales en mostacillas de vidrio. Naranja, verde y amarillo en patron geometrico artesanal.',
    // Woman wearing black and gold beaded necklace — by Tamanna Rumee
    imagen: 'https://images.unsplash.com/photo-1594174060421-3eec0d749162?auto=format&fit=crop&w=600&q=80',
    stock: 5,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'COL-008',
    nombre: 'Shakiron Madera y Dorado',
    categoria: 'shakirones',
    genero: 'unisex',
    tecnica: 'engarce',
    material: 'Cuentas de madera y metal dorado',
    precio: 22000,
    descripcion:
      'Impactante collar de cuentas grandes en madera natural combinada con separadores dorados. Presencia y caracter.',
    // Wooden beaded necklace hanging from a string
    imagen: 'https://images.unsplash.com/photo-1682761794593-9687dcfd1d1c?auto=format&fit=crop&w=600&q=80',
    galeria: [
      'https://images.unsplash.com/photo-1595208599319-c1dcf5776170?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80',
    ],
    stock: 10,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'COL-009',
    nombre: 'Shakiron Piedra Natural',
    categoria: 'shakirones',
    genero: 'ellos',
    tecnica: 'engarce',
    material: 'Piedras naturales semipreciosas',
    precio: 35000,
    descripcion:
      'Collar de cuentas grandes en piedras naturales tipo ojo de tigre y cuarzo ahumado. Pieza unica con propiedades energeticas.',
    // Silver and gold beaded necklace macro — by Laura Ockel
    imagen: 'https://images.unsplash.com/photo-1595208599319-c1dcf5776170?auto=format&fit=crop&w=600&q=80',
    stock: 4,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'COL-010',
    nombre: 'Shakiron Cerámica Pintada',
    categoria: 'shakirones',
    genero: 'ellos',
    tecnica: 'tejido-ruso',
    material: 'Cuentas de ceramica artesanal',
    precio: 26000,
    descripcion:
      'Collar de cuentas grandes en ceramica pintada a mano con motivos florales. Cada pieza es irrepetible.',
    // Red and gold beaded necklace — by Tamanna Rumee
    imagen: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80',
    stock: 6,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'COL-011',
    nombre: 'Collar Macramé Natural',
    categoria: 'artesanal',
    genero: 'ellas',
    tecnica: 'macrame',
    material: 'Hilo encerado y piedra ojo de tigre',
    precio: 19000,
    descripcion:
      'Collar artesanal en tecnica de macrame con hilo encerado beige y dije de piedra ojo de tigre. Estilo natural y terroso.',
    // Collection of gold necklaces displayed in a store — by Zayed Ahmed Zadu
    imagen: 'https://images.unsplash.com/photo-1758995115867-4ef47c98824e?auto=format&fit=crop&w=600&q=80',
    stock: 9,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 'COL-012',
    nombre: 'Collar Conchitas Mar',
    categoria: 'artesanal',
    genero: 'ellas',
    tecnica: 'engarce',
    material: 'Conchitas naturales y hilo',
    precio: 14500,
    descripcion:
      'Collar con conchitas del mar recogidas a mano y ensartadas en hilo de algodon. Perfecto para el verano y la playa.',
    // Woman in white tank top wearing gold necklace — by Clayton Cardinalli
    imagen: 'https://images.unsplash.com/photo-1627756781760-17c0217d9a3e?auto=format&fit=crop&w=600&q=80',
    stock: 14,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 'COL-013',
    nombre: 'Collar Hilo Dorado Tejido',
    categoria: 'artesanal',
    genero: 'ellas',
    tecnica: 'tejido-ruso',
    material: 'Hilo dorado metalizado',
    precio: 20000,
    descripcion:
      'Collar tejido a mano con hilo metalizado dorado en patron trenzado. Brillante y elegante para ocasiones especiales.',
    // Woman wearing gold necklace and white shirt — by Max Ducourneau
    imagen: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=600&q=80',
    stock: 11,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'COL-014',
    nombre: 'Collar Medalla Virgen',
    categoria: 'chapa-de-oro',
    genero: 'ellos',
    tecnica: 'engarce',
    material: 'Chapa de Oro 18k',
    precio: 38000,
    descripcion:
      'Collar religioso con medalla de la Virgen Maria en chapa de oro 18k. Cadena de 50cm. Una joya con significado especial.',
    // Gold chain necklace on white paper — by Laura Ohlman
    imagen: 'https://images.unsplash.com/photo-1611012525567-90be7e060d92?auto=format&fit=crop&w=600&q=80',
    stock: 3,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 'COL-015',
    nombre: 'Shakiron Semilla de la Amazonia',
    categoria: 'shakirones',
    genero: 'ellos',
    tecnica: 'macrame',
    material: 'Semillas naturales amazónicas',
    precio: 18500,
    descripcion:
      'Collar de cuentas grandes elaborado con semillas naturales de la Amazonia, pintadas y barnizadas. Conexion con la naturaleza.',
    // Red and silver beaded necklace
    imagen: 'https://images.unsplash.com/photo-1593806967876-4ad6cd0c5759?auto=format&fit=crop&w=600&q=80',
    stock: 7,
    isNew: true,
    isBestSeller: false,
  },

  // ── PARA ELLAS (5 adicionales → total 15) ──────────────────────────────────
  {
    id: 'COL-016',
    nombre: 'Collar Floral Bordado',
    categoria: 'artesanal',
    genero: 'ellas',
    tecnica: 'tejido',
    material: 'Hilo de seda y abalorios',
    precio: 17500,
    descripcion:
      'Delicado collar artesanal con motivos florales bordados a mano en hilo de seda. Colores pastel que evocan un jardín en primavera.',
    imagen: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80',
    stock: 8,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'COL-017',
    nombre: 'Collar Luna Encantada',
    categoria: 'chapa-de-oro',
    genero: 'ellas',
    tecnica: 'engarce',
    material: 'Chapa de Oro 18k con dije de luna',
    precio: 34000,
    descripcion:
      'Collar en chapa de oro 18k con dije de luna creciente. Delicado y poético, ideal para regalar a quien amas. Cadena fina de 42cm.',
    imagen: 'https://images.unsplash.com/photo-1573408301185-9519f94815b1?auto=format&fit=crop&w=600&q=80',
    stock: 6,
    isNew: true,
    isBestSeller: true,
  },
  {
    id: 'COL-018',
    nombre: 'Shakira Cuarzo Rosa',
    categoria: 'shakiras',
    genero: 'ellas',
    tecnica: 'peyote',
    material: 'Mostacillas de vidrio y cuarzo rosa',
    precio: 18000,
    descripcion:
      'Collar tejido en peyote con mostacillas rosas y champagne. El cuarzo rosa al centro lo convierte en un amuleto de amor y ternura.',
    imagen: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    stock: 10,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'COL-019',
    nombre: 'Collar Perlas Naturales',
    categoria: 'artesanal',
    genero: 'ellas',
    tecnica: 'engarce',
    material: 'Perlas de río y chapa de oro',
    precio: 42000,
    descripcion:
      'Collar clásico de perlas de río engarzadas a mano con separadores en chapa de oro. Elegancia atemporal para cualquier ocasión.',
    imagen: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?auto=format&fit=crop&w=600&q=80',
    stock: 4,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'COL-020',
    nombre: 'Shakira Atardecer Dorado',
    categoria: 'shakiras',
    genero: 'ellas',
    tecnica: 'punto-peruano',
    material: 'Mostacillas terracota, naranja y dorado',
    precio: 16000,
    descripcion:
      'Collar tejido en punto peruano con una paleta que imita los colores del atardecer: terracota, naranja quemado y dorado cálido.',
    imagen: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80',
    stock: 12,
    isNew: true,
    isBestSeller: false,
  },

  // ── PARA ELLOS (11 adicionales → total 15) ─────────────────────────────────
  {
    id: 'COL-021',
    nombre: 'Collar Cuero y Acero',
    categoria: 'artesanal',
    genero: 'ellos',
    tecnica: 'macrame',
    material: 'Cuero genuino y dije de acero inoxidable',
    precio: 21000,
    descripcion:
      'Collar masculino en cuero genuino trenzado con dije de acero inoxidable grabado. Robusto, duradero y con estilo urbano.',
    imagen: 'https://images.unsplash.com/photo-1599595700478-0b87e25e2aaf?auto=format&fit=crop&w=600&q=80',
    stock: 9,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'COL-022',
    nombre: 'Collar Cruz Enchapada',
    categoria: 'chapa-de-oro',
    genero: 'ellos',
    tecnica: 'engarce',
    material: 'Chapa de Oro 18k',
    precio: 36000,
    descripcion:
      'Cadena gruesa tipo cubana en chapa de oro 18k con dije de cruz. Un clásico masculino con presencia y significado.',
    imagen: 'https://images.unsplash.com/photo-1611012525567-90be7e060d92?auto=format&fit=crop&w=600&q=80',
    stock: 5,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'COL-023',
    nombre: 'Shakiron Obsidiana',
    categoria: 'shakirones',
    genero: 'ellos',
    tecnica: 'engarce',
    material: 'Obsidiana natural y hematita',
    precio: 28000,
    descripcion:
      'Collar de cuentas grandes en obsidiana volcánica negra combinada con hematita plateada. Protección y fuerza en cada pieza.',
    imagen: 'https://images.unsplash.com/photo-1593806967876-4ad6cd0c5759?auto=format&fit=crop&w=600&q=80',
    stock: 7,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'COL-024',
    nombre: 'Collar Macramé Masculino',
    categoria: 'artesanal',
    genero: 'ellos',
    tecnica: 'macrame',
    material: 'Hilo encerado negro y cuenta de madera',
    precio: 15500,
    descripcion:
      'Collar artesanal en macramé con hilo encerado negro y cuenta central de madera de cedro. Minimalista y con carácter.',
    imagen: 'https://images.unsplash.com/photo-1682761794593-9687dcfd1d1c?auto=format&fit=crop&w=600&q=80',
    stock: 13,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'COL-025',
    nombre: 'Shakiron Lava Volcánica',
    categoria: 'shakirones',
    genero: 'ellos',
    tecnica: 'engarce',
    material: 'Piedra de lava y ónix negro',
    precio: 24000,
    descripcion:
      'Cuentas grandes de piedra de lava volcánica, porosa y ligera. Absorbe aceites esenciales. Combinada con ónix negro para un look poderoso.',
    imagen: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80',
    stock: 8,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'COL-026',
    nombre: 'Collar Alambre Cobre',
    categoria: 'artesanal',
    genero: 'ellos',
    tecnica: 'alambrismo',
    material: 'Alambre de cobre y turquesa',
    precio: 23000,
    descripcion:
      'Pieza única de alambrismo en cobre con piedra de turquesa envuelta a mano. El proceso artesanal hace que cada collar sea irrepetible.',
    imagen: 'https://images.unsplash.com/photo-1595208599319-c1dcf5776170?auto=format&fit=crop&w=600&q=80',
    stock: 5,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'COL-027',
    nombre: 'Collar Tejido Ruso Oscuro',
    categoria: 'artesanal',
    genero: 'ellos',
    tecnica: 'tejido-ruso',
    material: 'Mostacillas negras y grises',
    precio: 19500,
    descripcion:
      'Collar tejido en técnica rusa con mostacillas en tonos oscuros: negro mate, gris carbón y plata vieja. Elegante y masculino.',
    imagen: 'https://images.unsplash.com/photo-1579624054375-72037da740e5?auto=format&fit=crop&w=600&q=80',
    stock: 9,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 'COL-028',
    nombre: 'Shakiron Ónix Negro',
    categoria: 'shakirones',
    genero: 'ellos',
    tecnica: 'engarce',
    material: 'Ónix negro natural',
    precio: 31000,
    descripcion:
      'Impactante collar de cuentas grandes en ónix negro pulido. Energía de protección y elegancia oscura para el hombre con estilo propio.',
    imagen: 'https://images.unsplash.com/photo-1682761794593-9687dcfd1d1c?auto=format&fit=crop&w=600&q=80',
    stock: 6,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'COL-029',
    nombre: 'Collar Punto Peruano Tierra',
    categoria: 'artesanal',
    genero: 'ellos',
    tecnica: 'punto-peruano',
    material: 'Hilo encerado en tonos tierra',
    precio: 14000,
    descripcion:
      'Collar tejido en punto peruano con hilos en tonos tierra: café, ocre y negro. Diseño geométrico ancestral con un giro contemporáneo.',
    imagen: 'https://images.unsplash.com/photo-1758995115867-4ef47c98824e?auto=format&fit=crop&w=600&q=80',
    stock: 14,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 'COL-030',
    nombre: 'Collar Cuarzo Ahumado',
    categoria: 'shakirones',
    genero: 'ellos',
    tecnica: 'engarce',
    material: 'Cuarzo ahumado y acero negro',
    precio: 27000,
    descripcion:
      'Collar de cuentas medianas en cuarzo ahumado transparente con separadores de acero negro. Sofisticado y discreto, para el hombre moderno.',
    imagen: 'https://images.unsplash.com/photo-1595208599319-c1dcf5776170?auto=format&fit=crop&w=600&q=80',
    stock: 10,
    isNew: true,
    isBestSeller: true,
  },
  {
    id: 'COL-031',
    nombre: 'Collar Tejido Indigo',
    categoria: 'artesanal',
    genero: 'ellos',
    tecnica: 'tejido',
    material: 'Hilo encerado índigo y cuenta de jade negro',
    precio: 16500,
    descripcion:
      'Collar artesanal tejido con hilo índigo profundo y cuenta de jade negro al centro. Conexión con la naturaleza y la artesanía tradicional.',
    imagen: 'https://images.unsplash.com/photo-1627756781760-17c0217d9a3e?auto=format&fit=crop&w=600&q=80',
    stock: 11,
    isNew: true,
    isBestSeller: false,
  },
];

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.isBestSeller).slice(0, 6);

export const getNewProducts = (): Product[] =>
  products.filter((p) => p.isNew).slice(0, 6);

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getProductsByCategory = (categoria: ProductCategory): Product[] =>
  products.filter((p) => p.categoria === categoria);
