"use client";

import { getBrands, getCategories } from "@/lib/products";

export interface Filters {
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  flavor: string;
  nicotine: string;
  sort: string;
}

export default function FilterSidebar({
  filters,
  setFilters,
  allFlavors,
  allNicotine,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  allFlavors: string[];
  allNicotine: string[];
}) {
  const categories = ["All", ...getCategories()];
  const brands = ["All", ...getBrands()];
  const update = (key: keyof Filters, value: string) => setFilters({ ...filters, [key]: value });

  return (
    <aside className="space-y-5 rounded-2xl border-2 border-purple-700 bg-purple-900/40 p-4">
      <h3 className="font-display text-xl uppercase text-accent">Filters</h3>
      <div>
        <label className="mb-1 block text-sm text-lavender">Category</label>
        <select value={filters.category} onChange={(e) => update("category", e.target.value)} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2">
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div id="brands">
        <label className="mb-1 block text-sm text-lavender">Brand</label>
        <select value={filters.brand} onChange={(e) => update("brand", e.target.value)} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2">
          {brands.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-sm text-lavender">Min ₱</label>
          <input type="number" value={filters.minPrice} onChange={(e) => update("minPrice", e.target.value)} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-lavender">Max ₱</label>
          <input type="number" value={filters.maxPrice} onChange={(e) => update("maxPrice", e.target.value)} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm text-lavender">Flavor</label>
        <select value={filters.flavor} onChange={(e) => update("flavor", e.target.value)} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2">
          <option value="All">All</option>
          {allFlavors.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm text-lavender">Nicotine Strength</label>
        <select value={filters.nicotine} onChange={(e) => update("nicotine", e.target.value)} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2">
          <option value="All">All</option>
          {allNicotine.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm text-lavender">Sort</label>
        <select value={filters.sort} onChange={(e) => update("sort", e.target.value)} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>
      <button
        onClick={() => setFilters({ category: "All", brand: "All", minPrice: "", maxPrice: "", flavor: "All", nicotine: "All", sort: "featured" })}
        className="w-full rounded-lg border border-accent px-3 py-2 text-sm font-semibold text-accent hover:bg-accent/10"
      >
        Reset Filters
      </button>
    </aside>
  );
}
