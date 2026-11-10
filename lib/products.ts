import productsData from "@/data/products.json";
import { Product } from "@/types";

export const products: Product[] = productsData as Product[];

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured).slice(0, 8);
}

export function getBestSellers() {
  return products.filter((p) => p.bestSeller).slice(0, 8);
}

export function getSaleProducts() {
  return products.filter((p) => p.salePrice && p.salePrice < p.price);
}

export function getCategories() {
  return Array.from(new Set(products.map((p) => p.category)));
}

export function getBrands() {
  return Array.from(new Set(products.map((p) => p.brand)));
}

export function formatPHP(amount: number) {
  return `₱${amount.toLocaleString("en-PH")}`;
}

export function effectivePrice(p: Product) {
  return p.salePrice && p.salePrice < p.price ? p.salePrice : p.price;
}
