"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useCart, useCartCount } from "@/store/useCart";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=all#brands", label: "Brands" },
  { href: "/sale", label: "Sale" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const count = useCartCount();
  const toggleCart = useCart((s) => s.toggleCart);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (term) router.push(`/shop?q=${encodeURIComponent(term)}`);
    else router.push("/shop");
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-purple-800/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-accent bg-purple-900">
            <Image src="/logo.png" alt="Puffin Dose logo" fill className="object-cover" sizes="40px" />
          </div>
          <span className="font-display text-lg uppercase tracking-wide text-white">Puffin Dose</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className={`text-sm font-medium uppercase tracking-wide hover:text-accent ${pathname === l.href ? "text-accent" : "text-lavender"}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <form onSubmit={onSearch} className="hidden md:block">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
              className="w-36 rounded-lg border border-purple-700 bg-purple-950/70 px-3 py-2 text-sm text-white placeholder:text-lavender/60 focus:border-accent focus:outline-none lg:w-48"
              aria-label="Search products"
            />
          </form>
          <button onClick={toggleCart} className="relative rounded-lg border border-purple-700 px-3 py-2 text-sm font-semibold hover:border-accent" aria-label="Open cart">
            Cart
            {count > 0 && <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-black">{count}</span>}
          </button>
          <button onClick={() => setOpen((v) => !v)} className="rounded-lg border border-purple-700 px-3 py-2 md:hidden" aria-label="Toggle menu">☰</button>
        </div>
      </div>

      {open && (
        <div className="border-t border-purple-800 bg-purple-950 px-4 py-4 md:hidden">
          <form onSubmit={onSearch} className="mb-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-lg border border-purple-700 bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
              aria-label="Search products"
            />
          </form>
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-lavender hover:text-accent">{l.label}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
