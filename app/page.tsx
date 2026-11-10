"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SmokeBackground from "@/components/SmokeBackground";
import Marquee from "@/components/Marquee";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import CountdownTimer from "@/components/CountdownTimer";
import { getFeaturedProducts, getBestSellers, getSaleProducts } from "@/lib/products";

const categories = [
  { name: "Disposable Vapes", desc: "Grab-and-go flavor", emoji: "💨" },
  { name: "Pods", desc: "Prefilled & smooth", emoji: "🫧" },
  { name: "Devices/Kits", desc: "Reliable daily setups", emoji: "⚡" },
  { name: "E-Juice", desc: "Bold bottles & blends", emoji: "🧃" },
  { name: "Coils & Accessories", desc: "Keep it running fresh", emoji: "🛠️" },
];

const why = [
  { title: "100% Authentic", desc: "Legit products you can trust, sourced for quality." },
  { title: "Fast Delivery", desc: "Quick local delivery around Lupon and nearby areas." },
  { title: "Local Shop", desc: "Proudly serving Purok Malinawon, Bagumbayan." },
  { title: "Legit Since 2022", desc: "Your neighborhood vape spot, established 2022." },
];

const testimonials = [
  { name: "Mark D.", text: "Solid legit shop sa Lupon. Fast response and authentic items!" },
  { name: "Jessa R.", text: "Lami ang flavors and maayo kaayo ang service. Recommended!" },
  { name: "Arvin P.", text: "Best local vape shop. Prices are fair and delivery is quick." },
];

export default function HomePage() {
  const featured = getFeaturedProducts();
  const best = getBestSellers();
  const sale = getSaleProducts().slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-purple-800">
        <SmokeBackground />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-3 inline-block rounded-full border border-accent/60 bg-purple-900/50 px-4 py-1 text-sm uppercase tracking-widest text-accent">Lupon&apos;s Local Vape Shop • Est. 2022</p>
            <h1 className="font-display text-5xl uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              PUFF.<br /><span className="text-accent">CHILL.</span><br />REPEAT.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-lavender">Authentic vapes, pods, juices, and accessories in Bagumbayan, Lupon. Dark vibes, bold flavor, and legit service.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/shop" className="rounded-xl border-2 border-accent bg-accent px-6 py-3 font-bold text-black shadow-glow transition hover:bg-accent-light">Shop Now</Link>
              <Link href="/sale" className="rounded-xl border-2 border-accent px-6 py-3 font-bold text-accent transition hover:bg-accent/10">View Sale</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <div className="relative mx-auto aspect-square max-w-md rounded-[2rem] border-3 border-accent bg-gradient-to-br from-purple-800 to-purple-950 p-6 shadow-glow">
              <div className="flex h-full flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-accent/50 text-center">
                <div className="mb-3 rounded-full border-3 border-accent px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent">Est. 2022</div>
                <div className="font-display text-4xl uppercase text-white sm:text-5xl">Puffin<br />Dose</div>
                <p className="mt-3 text-lavender">Purok Malinawon, Bagumbayan, Lupon</p>
                <div className="mt-5 rounded-xl bg-accent px-4 py-2 font-bold text-black">FREE DELIVERY IN LUPON*</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Marquee items={["NEW ARRIVALS", "SALE", "FREE DELIVERY IN LUPON", "100% AUTHENTIC", "PUFFIN DOSE EST. 2022"]} />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="Shop by vibe" title="Categories" subtitle="Find your next puff from our curated local selection." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <Link key={c.name} href={`/shop?category=${encodeURIComponent(c.name)}`} className="group rounded-2xl border-3 border-purple-700 bg-purple-900/40 p-5 transition hover:-translate-y-1 hover:border-accent">
              <div className="text-3xl">{c.emoji}</div>
              <h3 className="mt-3 font-display text-lg uppercase leading-tight">{c.name}</h3>
              <p className="mt-1 text-sm text-lavender">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="Handpicked" title="Featured Products" action={<Link href="/shop" className="text-accent hover:underline">View all</Link>} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-purple-800 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900">
        <SmokeBackground className="opacity-70" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 py-14 md:flex-row">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent">Limited Time</p>
            <h2 className="font-display text-4xl uppercase md:text-5xl">Big Puffin Sale</h2>
            <p className="mt-2 max-w-xl text-lavender">Score sweet deals on disposables, pods, juices, and accessories. Don&apos;t sleep on it.</p>
            <Link href="/sale" className="mt-5 inline-block rounded-xl border-2 border-accent bg-accent px-6 py-3 font-bold text-black hover:bg-accent-light">Shop Sale</Link>
          </div>
          <CountdownTimer />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="Hot right now" title="Best Sellers" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {best.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="On sale" title="Steals & Deals" action={<Link href="/sale" className="text-accent hover:underline">See all sale</Link>} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sale.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="border-y border-purple-800 bg-purple-950/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading eyebrow="Why us" title="Why Choose Puffin Dose" align="center" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <div key={w.title} className="rounded-2xl border-2 border-purple-700 bg-background/40 p-5">
                <h3 className="font-display text-xl uppercase text-accent">{w.title}</h3>
                <p className="mt-2 text-sm text-lavender">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="Community" title="Testimonials" align="center" />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="rounded-2xl border-2 border-purple-700 bg-purple-900/40 p-6">
              <p className="text-lavender">“{t.text}”</p>
              <footer className="mt-4 font-semibold text-accent">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
