'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products, categoryLabels, tecnicaLabels, ProductCategory, Tecnica } from '@/data/products';
import type { Messages } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

type SortOption = 'relevancia' | 'precio-asc' | 'precio-desc' | 'nombre';
type GeneroFilter = 'todo' | 'ellas' | 'ellos';

const allCategories: ProductCategory[] = ['chapa-de-oro', 'shakiras', 'shakirones', 'artesanal'];
const allTecnicas: Tecnica[] = ['alambrismo', 'engarce', 'tejido', 'peyote', 'macrame', 'tejido-ruso', 'punto-peruano'];

interface Props {
  messages: Messages;
  locale: Locale;
}

export default function CatalogoClient({ messages, locale }: Props) {
  const [genero, setGenero] = useState<GeneroFilter>('todo');
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [selectedTecnicas, setSelectedTecnicas] = useState<Tecnica[]>([]);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortBy, setSortBy] = useState<SortOption>('relevancia');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const closeFilters = useCallback(() => setFiltersOpen(false), []);
  const activeFiltersCount =
    (genero !== 'todo' ? 1 : 0) +
    selectedCategories.length +
    selectedTecnicas.length +
    (maxPrice < 50000 ? 1 : 0);

  const toggleCategory = (cat: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleTecnica = (tec: Tecnica) => {
    setSelectedTecnicas((prev) =>
      prev.includes(tec) ? prev.filter((t) => t !== tec) : [...prev, tec]
    );
  };

  const clearAll = () => {
    setGenero('todo');
    setSelectedCategories([]);
    setSelectedTecnicas([]);
    setMaxPrice(50000);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (genero !== 'todo') {
      result = result.filter((p) => p.genero === genero || p.genero === 'unisex');
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.categoria));
    }

    if (selectedTecnicas.length > 0) {
      result = result.filter((p) => selectedTecnicas.includes(p.tecnica));
    }

    result = result.filter((p) => p.precio <= maxPrice);

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
  }, [genero, selectedCategories, selectedTecnicas, maxPrice, sortBy]);

  const sidebarFilterContent = (
    <>
      {/* Para Ellas / Para Ellos */}
      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8A7060', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
          Colección
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {(['todo', 'ellas', 'ellos'] as GeneroFilter[]).map((g) => {
            const label = g === 'todo' ? 'Todo' : g === 'ellas' ? 'Para Ellas' : 'Para Ellos';
            const isActive = genero === g;
            return (
              <button
                key={g}
                onClick={() => setGenero(g)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: isActive ? '1.5px solid #B9965B' : '1.5px solid transparent',
                  backgroundColor: isActive ? 'rgba(185,150,91,0.08)' : 'transparent',
                  color: isActive ? '#B9965B' : '#2B1F1A',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '1rem' }}>
                  {g === 'todo' ? '✦' : g === 'ellas' ? '♀' : '♂'}
                </span>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categorias */}
      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8A7060', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
          {t(messages, 'catalog.category')}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {allCategories.map((cat) => (
            <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                style={{ accentColor: '#B9965B', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.875rem', color: '#2B1F1A', fontWeight: selectedCategories.includes(cat) ? 600 : 400, fontFamily: 'var(--font-body)' }}>
                {t(messages, `categories.${cat}`) || categoryLabels[cat]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Técnicas */}
      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8A7060', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
          Técnicas
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {allTecnicas.map((tec) => (
            <label key={tec} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selectedTecnicas.includes(tec)}
                onChange={() => toggleTecnica(tec)}
                style={{ accentColor: '#B9965B', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.875rem', color: '#2B1F1A', fontWeight: selectedTecnicas.includes(tec) ? 600 : 400, fontFamily: 'var(--font-body)' }}>
                {tecnicaLabels[tec]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8A7060', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
          {t(messages, 'catalog.maxPrice')}
        </h3>
        <input
          type="range"
          min={0}
          max={50000}
          step={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#B9965B' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#8A7060', marginTop: '6px', fontFamily: 'var(--font-body)' }}>
          <span>$0</span>
          <span style={{ color: '#B9965B', fontWeight: 600 }}>${maxPrice.toLocaleString('es-MX')}</span>
        </div>
      </div>

      {/* Reset */}
      {activeFiltersCount > 0 && (
        <button
          onClick={clearAll}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #B98C73',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: '#B98C73',
            fontSize: '0.8rem',
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
          }}
        >
          {t(messages, 'catalog.clearFilters')}
        </button>
      )}
    </>
  );

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#F5EDE3', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#B98C73',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            marginBottom: '10px',
            fontFamily: 'var(--font-body)',
          }}>
            {t(messages, 'catalog.badge')}
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#2B1F1A',
          }}>
            {t(messages, 'catalog.title')}
          </h1>
        </div>

        {/* Para Ellas / Para Ellos — tabs top-level */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}>
          {(['todo', 'ellas', 'ellos'] as GeneroFilter[]).map((g) => {
            const label = g === 'todo' ? 'Todo' : g === 'ellas' ? 'Para Ellas' : 'Para Ellos';
            const isActive = genero === g;
            return (
              <button
                key={g}
                onClick={() => setGenero(g)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  border: isActive ? '1.5px solid #B9965B' : '1.5px solid rgba(160,144,112,0.35)',
                  backgroundColor: isActive ? '#B9965B' : '#ffffff',
                  color: isActive ? '#ffffff' : '#2B1F1A',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                  transition: 'all 0.2s',
                  boxShadow: isActive ? '0 2px 12px rgba(185,150,91,0.25)' : 'none',
                }}
              >
                {g === 'ellas' ? '♀ ' : g === 'ellos' ? '♂ ' : ''}{label}
              </button>
            );
          })}
        </div>

        {/* Botón de filtros — solo móvil */}
        <div className="md:hidden" style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setFiltersOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: '#ffffff',
              border: '1.5px solid rgba(160,144,112,0.4)',
              borderRadius: '10px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#2B1F1A',
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="10" y1="18" x2="14" y2="18" />
            </svg>
            {t(messages, 'catalog.filters')}
            {activeFiltersCount > 0 && (
              <span style={{
                backgroundColor: '#B98C73',
                color: '#fff',
                borderRadius: '9999px',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Overlay móvil */}
        {filtersOpen && (
          <div
            onClick={closeFilters}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 200,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '85%',
                maxWidth: '320px',
                backgroundColor: '#ffffff',
                padding: '24px',
                overflowY: 'auto',
                boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: '#2B1F1A', margin: 0 }}>
                  {t(messages, 'catalog.filters')}
                </h2>
                <button
                  onClick={closeFilters}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#8A7060' }}
                  aria-label="Cerrar filtros"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {sidebarFilterContent}

              <button
                onClick={closeFilters}
                style={{ width: '100%', marginTop: '16px', padding: '12px', backgroundColor: '#B9965B', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer' }}
              >
                Ver {filteredProducts.length} productos
              </button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Sidebar filtros — solo desktop */}
          <aside className="hidden md:block" style={{
            width: '240px',
            flexShrink: 0,
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(160, 144, 112, 0.2)',
            boxShadow: '0 2px 12px rgba(185, 150, 91, 0.08)',
          }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#2B1F1A', marginBottom: '20px' }}>
              {t(messages, 'catalog.filters')}
            </h2>
            {sidebarFilterContent}
          </aside>

          {/* Productos */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Barra superior */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{ fontSize: '0.875rem', color: '#8A7060', fontFamily: 'var(--font-body)' }}>
                {filteredProducts.length} {t(messages, 'catalog.products')}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(160, 144, 112, 0.4)',
                  backgroundColor: '#ffffff',
                  color: '#2B1F1A',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="relevancia">{t(messages, 'catalog.sortOptions.relevancia')}</option>
                <option value="precio-asc">{t(messages, 'catalog.sortOptions.precioAsc')}</option>
                <option value="precio-desc">{t(messages, 'catalog.sortOptions.precioDesc')}</option>
                <option value="nombre">{t(messages, 'catalog.sortOptions.nombre')}</option>
              </select>
            </div>

            {/* Tags activos */}
            {(selectedCategories.length > 0 || selectedTecnicas.length > 0) && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'rgba(185, 150, 91, 0.1)',
                      border: '1px solid #B9965B',
                      borderRadius: '20px',
                      padding: '4px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#B9965B',
                      fontFamily: 'var(--font-body)',
                      cursor: 'pointer',
                    }}
                  >
                    {t(messages, `categories.${cat}`) || categoryLabels[cat]} ×
                  </span>
                ))}
                {selectedTecnicas.map((tec) => (
                  <span
                    key={tec}
                    onClick={() => toggleTecnica(tec)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'rgba(185,150,91,0.1)',
                      border: '1px solid #B9965B',
                      borderRadius: '20px',
                      padding: '4px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#B9965B',
                      fontFamily: 'var(--font-body)',
                      cursor: 'pointer',
                    }}
                  >
                    {tecnicaLabels[tec]} ×
                  </span>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 24px', color: '#8A7060', fontFamily: 'var(--font-body)' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{t(messages, 'catalog.noResults')}</p>
                <p style={{ fontSize: '0.875rem' }}>{t(messages, 'catalog.noResultsSub')}</p>
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
