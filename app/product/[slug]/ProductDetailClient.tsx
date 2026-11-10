"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types";
import { formatPHP } from "@/lib/products";
import { useCart } from "@/store/useCart";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";

export default function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const addItem = useCart((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [flavor, setFlavor] = useState(product.flavors[0] || "");
  const [nicotine, setNicotine] = useState(product.nicotineStrengths[0] || "");
  const onSale = !!(product.salePrice && product.salePrice < product.price);
  const price = onSale ? (product.salePrice as number) : product.price;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl border-3 border-purple-700 bg-purple-950">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            {onSale && <span className="absolute left-4 top-4 rounded-full border-2 border-black bg-accent px-4 py-1 font-bold text-black">SALE</span>}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`relative aspect-square overflow-hidden rounded-xl border-2 ${i === 0 ? "border-accent" : "border-purple-700"} bg-purple-950`}>
                <Image src={product.image} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="100px" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-accent">{product.brand} • {product.category}</p>
          <h1 className="mt-2 font-display text-4xl uppercase leading-tight">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-white">{formatPHP(price)}</span>
            {onSale && <span className="text-xl text-lavender line-through">{formatPHP(product.price)}</span>}
          </div>
          <p className="mt-4 text-lavender">{product.description}</p>
          <p className="mt-2 text-sm text-lavender">{product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}</p>

          <div className="mt-6 space-y-4">
            {product.flavors.length > 0 && (
              <div>
                <label className="mb-1 block text-sm text-lavender">Flavor</label>
                <select value={flavor} onChange={(e) => setFlavor(e.target.value)} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2 sm:max-w-xs">
                  {product.flavors.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            )}
            {product.nicotineStrengths.length > 0 && (
              <div>
                <label className="mb-1 block text-sm text-lavender">Nicotine Strength</label>
                <select value={nicotine} onChange={(e) => setNicotine(e.target.value)} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2 sm:max-w-xs">
                  {product.nicotineStrengths.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="mb-1 block text-sm text-lavender">Quantity</label>
              <div className="flex items-center gap-2">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-10 w-10 rounded-lg border border-purple-700">-</button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="h-10 w-10 rounded-lg border border-purple-700">+</button>
              </div>
            </div>
            <button
              onClick={() => addItem({ id: product.id, slug: product.slug, name: product.name, price, image: product.image, flavor, nicotine }, qty)}
              disabled={product.stock <= 0}
              className="w-full rounded-xl border-2 border-accent bg-accent px-6 py-3 font-bold text-black hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading eyebrow="You may also like" title="Related Products" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
