"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string, flavor?: string, nicotine?: string) => void;
  updateQuantity: (id: string, quantity: number, flavor?: string, nicotine?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const keyOf = (item: { id: string; flavor?: string; nicotine?: string }) =>
  `${item.id}__${item.flavor ?? ""}__${item.nicotine ?? ""}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item, quantity = 1) => {
        const items = get().items;
        const k = keyOf(item);
        const existing = items.find((i) => keyOf(i) === k);
        if (existing) {
          set({
            items: items.map((i) =>
              keyOf(i) === k ? { ...i, quantity: i.quantity + quantity } : i
            ),
            isOpen: true,
          });
        } else {
          set({ items: [...items, { ...item, quantity }], isOpen: true });
        }
      },
      removeItem: (id, flavor, nicotine) => {
        const k = keyOf({ id, flavor, nicotine });
        set({ items: get().items.filter((i) => keyOf(i) !== k) });
      },
      updateQuantity: (id, quantity, flavor, nicotine) => {
        const k = keyOf({ id, flavor, nicotine });
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => keyOf(i) !== k) });
          return;
        }
        set({
          items: get().items.map((i) => (keyOf(i) === k ? { ...i, quantity } : i)),
        });
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
    }),
    { name: "puffin-dose-cart", partialize: (state) => ({ items: state.items }) }
  )
);

export const useCartCount = () =>
  useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

export const useCartTotal = () =>
  useCart((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
