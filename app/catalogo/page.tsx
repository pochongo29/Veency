'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products, categoryLabels, ProductCategory } from '@/data/products';

type SortOption = 'relevancia' | 'precio-asc' | 'precio-desc' | 'nombre';

const allCategories: ProductCategory[] = ['chapa-de-oro', 'shakiras', 'shakirones', 'artesanal'];

export default function CatalogoPage() {
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortBy, setSortBy] = useState<SortOption>('relevancia');

  const toggleCategory = (cat: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.categoria));
    }

    result = result.filter((p) => p.precio >= minPrice && p.precio <= maxPrice);

    switch (sortBy) {
      case 'precio-asc':
        result.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        result.sort((a, b) => b.precio - a.precio);
        break;
      case 'nombre':
        result.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [selectedCategories, minPrice, maxPrice, sortBy]);

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#F4EFE0', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#B87333',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            marginBottom: '10px',
            fontFamily: 'var(--font-body)',
          }}>
            Toda la coleccion
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#2E2E2E',
          }}>
            Catalogo Veency
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Sidebar filtros */}
          <aside style={{
            width: '240px',
            flexShrink: 0,
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(160, 144, 112, 0.2)',
            boxShadow: '0 2px 12px rgba(107, 124, 78, 0.08)',
          }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#2E2E2E', marginBottom: '20px' }}>
              Filtros
            </h2>

            {/* Categorias */}
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#A09070', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
                Categoria
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {allCategories.map((cat) => (
                  <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      style={{ accentColor: '#6B7C4E', width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '0.875rem', color: '#2E2E2E', fontWeight: selectedCategories.includes(cat) ? 600 : 400, fontFamily: 'var(--font-body)' }}>
                      {categoryLabels[cat]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Precio */}
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#A09070', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
                Precio maximo
              </h3>
              <input
                type="range"
                min={0}
                max={50000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#6B7C4E' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#A09070', marginTop: '6px', fontFamily: 'var(--font-body)' }}>
                <span>$0</span>
                <span style={{ color: '#6B7C4E', fontWeight: 600 }}>
                  ${maxPrice.toLocaleString('es-CL')}
                </span>
              </div>
            </div>

            {/* Reset */}
            {(selectedCategories.length > 0 || maxPrice < 50000) && (
              <button
                onClick={() => { setSelectedCategories([]); setMaxPrice(50000); }}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #B87333',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  color: '#B87333',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                }}
              >
                Limpiar filtros
              </button>
            )}
          </aside>

          {/* Productos */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Barra superior */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{ fontSize: '0.875rem', color: '#A09070', fontFamily: 'var(--font-body)' }}>
                {filteredProducts.length} productos
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(160, 144, 112, 0.4)',
                  backgroundColor: '#ffffff',
                  color: '#2E2E2E',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="nombre">Nombre A-Z</option>
              </select>
            </div>

            {/* Categorias activas */}
            {selectedCategories.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'rgba(107, 124, 78, 0.1)',
                      border: '1px solid #6B7C4E',
                      borderRadius: '20px',
                      padding: '4px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#6B7C4E',
                      fontFamily: 'var(--font-body)',
                      cursor: 'pointer',
                    }}
                  >
                    {categoryLabels[cat]} x
                  </span>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 24px', color: '#A09070', fontFamily: 'var(--font-body)' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Sin resultados</p>
                <p style={{ fontSize: '0.875rem' }}>Prueba con otros filtros.</p>
              </div>
            ) : (
              <motion.div
                layout
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '20px',
                }}
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
