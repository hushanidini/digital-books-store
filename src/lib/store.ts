import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Book, CartStore } from "@/types";
import { useEffect, useState } from "react";

/**
 * Cart Store using Zustand with localStorage persistence
 * Handles all cart operations including add, remove, update quantity
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      /**
       * Add a book to cart or increment quantity if already exists
       */
      addToCart: (book: Book) => {
        const items = get().items;
        const existingItem = items.find((item) => item.book.id === book.id);

        if (existingItem) {
          // If item exists, increment quantity
          set({
            items: items.map((item) =>
              item.book.id === book.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Add new item to cart
          set({
            items: [...items, { book, quantity: 1 }],
          });
        }
      },

      /**
       * Remove a book from cart
       */
      removeFromCart: (bookId: string) => {
        set({
          items: get().items.filter((item) => item.book.id !== bookId),
        });
      },

      /**
       * Update quantity of a book in cart
       * Removes item if quantity is 0 or less
       */
      updateQuantity: (bookId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(bookId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.book.id === bookId ? { ...item, quantity } : item
          ),
        });
      },

      /**
       * Clear all items from cart
       */
      clearCart: () => {
        set({ items: [] });
      },

      /**
       * Get total number of items in cart
       */
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      /**
       * Get total price of all items in cart
       */
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.book.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Optional: Export a hook to check if store is hydrated (for SSR compatibility)
export const useIsHydrated = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};
