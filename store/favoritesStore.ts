import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

interface FavoritesStore {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
  favoritesCount: () => number;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (product) => {
        const already = get().favorites.some((f) => f.id === product.id);
        if (!already) {
          set({ favorites: [...get().favorites, product] });
        }
      },

      removeFromFavorites: (productId) => {
        set({
          favorites: get().favorites.filter((f) => f.id !== productId),
        });
      },

      isFavorite: (productId) =>
        get().favorites.some((f) => f.id === productId),

      toggleFavorite: (product) => {
        if (get().isFavorite(product.id)) {
          get().removeFromFavorites(product.id);
        } else {
          get().addToFavorites(product);
        }
      },

      favoritesCount: () => get().favorites.length,
    }),
    {
      name: 'veency-favorites',
    }
  )
);
