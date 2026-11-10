"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, useCartTotal } from "@/store/useCart";
import { formatPHP } from "@/lib/products";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCart();
  const total = useCartTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l-3 border-accent bg-purple-950 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-purple-700 p-4">
              <h2 className="font-display text-2xl uppercase">Your Cart</h2>
              <button onClick={closeCart} className="rounded-lg border border-purple-700 px-3 py-1 text-lavender hover:text-white" aria-label="Close cart">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="text-lavender">Your cart is empty. Puff something in?</p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={`${item.id}-${item.flavor}-${item.nicotine}`} className="flex gap-3 rounded-xl border border-purple-700 bg-purple-900/40 p-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-purple-800">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-lavender">{[item.flavor, item.nicotine].filter(Boolean).join(" / ")}</p>
                        <p className="mt-1 text-accent">{formatPHP(item.price)}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.flavor, item.nicotine)} className="h-8 w-8 rounded border border-purple-600">-</button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.flavor, item.nicotine)} className="h-8 w-8 rounded border border-purple-600">+</button>
                          <button onClick={() => removeItem(item.id, item.flavor, item.nicotine)} className="ml-auto text-xs text-lavender hover:text-accent">Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-t border-purple-700 p-4">
              <div className="mb-3 flex items-center justify-between text-lg">
                <span className="text-lavender">Subtotal</span>
                <span className="font-bold text-accent">{formatPHP(total)}</span>
              </div>
              <Link href="/checkout" onClick={closeCart} className={`block rounded-xl border-2 border-accent bg-accent px-4 py-3 text-center font-bold text-black transition hover:bg-accent-light ${items.length === 0 ? "pointer-events-none opacity-50" : ""}`}>
                Proceed to Checkout
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
