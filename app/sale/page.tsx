import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import CountdownTimer from "@/components/CountdownTimer";
import SmokeBackground from "@/components/SmokeBackground";
import { getSaleProducts } from "@/lib/products";

export const metadata = { title: "Sale" };

export default function SalePage() {
  const products = getSaleProducts();
  return (
    <div>
      <section className="relative overflow-hidden border-b border-purple-800 bg-gradient-to-r from-purple-900 to-purple-950">
        <SmokeBackground />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-14 md:flex-row">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent">Hot Deals</p>
            <h1 className="font-display text-4xl uppercase md:text-6xl">Puffin Sale</h1>
            <p className="mt-2 text-lavender">Discounted favorites with strike-through prices and % OFF badges.</p>
          </div>
          <CountdownTimer />
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading eyebrow="Limited offers" title="On Sale Now" subtitle={`${products.length} deals available`} />
        {products.length === 0 ? (
          <p className="text-lavender">No sale items right now. Check back soon!</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
