"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import FilterSidebar, { Filters } from "@/components/FilterSidebar";
import SectionHeading from "@/components/SectionHeading";
import { products, effectivePrice } from "@/lib/products";

const PAGE_SIZE = 8;

function ShopContent() {
  const sp = useSearchParams();
  const initialCategory = sp.get("category") || "All";
  const initialQ = sp.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    category: initialCategory,
    brand: "All",
    minPrice: "",
    maxPrice: "",
    flavor: "All",
    nicotine: "All",
    sort: "featured",
  });

  const allFlavors = useMemo(() => Array.from(new Set(products.flatMap((p) => p.flavors))).sort(), []);
  const allNicotine = useMemo(() => Array.from(new Set(products.flatMap((p) => p.nicotineStrengths))).sort(), []);

  const filtered = useMemo(() => {
    let list = [...products];
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((p) => [p.name, p.brand, p.category, p.description, ...p.flavors].join(" ").toLowerCase().includes(q));
    if (filters.category !== "All") list = list.filter((p) => p.category === filters.category);
    if (filters.brand !== "All") list = list.filter((p) => p.brand === filters.brand);
    if (filters.flavor !== "All") list = list.filter((p) => p.flavors.includes(filters.flavor));
    if (filters.nicotine !== "All") list = list.filter((p) => p.nicotineStrengths.includes(filters.nicotine));
    const min = filters.minPrice ? Number(filters.minPrice) : null;
    const max = filters.maxPrice ? Number(filters.maxPrice) : null;
    if (min !== null) list = list.filter((p) => effectivePrice(p) >= min);
    if (max !== null) list = list.filter((p) => effectivePrice(p) <= max);
    if (filters.sort === "price-asc") list.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    else if (filters.sort === "price-desc") list.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    else if (filters.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [query, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const updateFilters = (f: Filters) => { setFilters(f); setPage(1); };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeading eyebrow="All products" title="Shop" subtitle="Browse authentic vapes, pods, juices, and accessories." />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Search by name, brand, flavor..."
          className="w-full rounded-xl border border-purple-700 bg-purple-950 px-4 py-3 focus:border-accent focus:outline-none sm:max-w-md"
          aria-label="Search products"
        />
        <p className="text-sm text-lavender">{filtered.length} products found</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <FilterSidebar filters={filters} setFilters={updateFilters} allFlavors={allFlavors} allNicotine={allNicotine} />
        <div>
          {paged.length === 0 ? (
            <div className="rounded-2xl border border-purple-700 p-8 text-center text-lavender">No products match your filters.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {paged.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1} className="rounded-lg border border-purple-700 px-3 py-2 disabled:opacity-40">Prev</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)} className={`rounded-lg border px-3 py-2 ${n === safePage ? "border-accent bg-accent text-black" : "border-purple-700"}`}>{n}</button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} className="rounded-lg border border-purple-700 px-3 py-2 disabled:opacity-40">Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12 text-lavender">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
