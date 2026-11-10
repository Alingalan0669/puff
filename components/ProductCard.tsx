"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { formatPHP } from "@/lib/products";
import { useCart } from "@/store/useCart";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const onSale = !!(product.salePrice && product.salePrice < product.price);
  const discount = onSale
    ? Math.round(((product.price - (product.salePrice as number)) / product.price) * 100)
    : 0;
  const price = onSale ? (product.salePrice as number) : product.price;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-3 border-purple-700 bg-purple-900/50 shadow-card transition hover:border-accent"
    >
      {onSale && (
        <span className="absolute left-3 top-3 z-10 rounded-full border-2 border-black bg-accent px-3 py-1 text-xs font-bold text-black">
          {discount}% OFF
        </span>
      )}
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-purple-950">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-wider text-accent">{product.brand} • {product.category}</p>
        <Link href={`/product/${product.slug}`} className="mt-1 font-semibold text-white hover:text-accent">
          {product.name}
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-white">{formatPHP(price)}</span>
          {onSale && <span className="text-sm text-lavender line-through">{formatPHP(product.price)}</span>}
        </div>
        <p className="mt-1 text-xs text-lavender">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
        <button
          onClick={() =>
            addItem({
              id: product.id,
              slug: product.slug,
              name: product.name,
              price,
              image: product.image,
              flavor: product.flavors[0],
              nicotine: product.nicotineStrengths[0],
            })
          }
          disabled={product.stock <= 0}
          className="mt-4 rounded-xl border-2 border-accent bg-accent px-4 py-2 font-semibold text-black transition hover:bg-accent-light disabled:cursor-not-allowed disabled:border-purple-700 disabled:bg-purple-800 disabled:text-lavender"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
