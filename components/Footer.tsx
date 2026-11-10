import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-purple-800 bg-purple-950/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="font-display text-xl uppercase text-accent">Puffin Dose</h3>
          <p className="mt-3 text-sm text-lavender">Legit local vape shop in Lupon since 2022. Puff. Chill. Repeat.</p>
          <p className="mt-2 text-sm text-lavender">Purok Malinawon, Bagumbayan,<br />Lupon, Philippines 8207</p>
        </div>
        <div>
          <h4 className="font-semibold uppercase tracking-wide">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-lavender">
            <li><Link href="/shop" className="hover:text-accent">All Products</Link></li>
            <li><Link href="/sale" className="hover:text-accent">Sale</Link></li>
            <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold uppercase tracking-wide">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-lavender">
            <li>Smart: <a href="tel:09857938596" className="hover:text-accent">0985 793 8596</a></li>
            <li>Smart: <a href="tel:09301263997" className="hover:text-accent">0930 126 3997</a></li>
            <li>Globe: <a href="tel:09452117917" className="hover:text-accent">0945 211 7917</a></li>
            <li>Facebook: <span className="text-white">Puffin Dose Vs</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold uppercase tracking-wide">Find Us</h4>
          <div className="mt-3 overflow-hidden rounded-xl border border-purple-700">
            <iframe
              title="Puffin Dose location map"
              src="https://www.google.com/maps?q=Purok%20Malinawon,%20Bagumbayan,%20Lupon,%20Philippines%208207&output=embed"
              className="h-40 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-purple-800 px-4 py-5 text-center text-xs text-lavender">
        <p className="font-semibold text-accent">For adult smokers only. Not for minors. Nicotine is addictive.</p>
        <p className="mt-1">&copy; {new Date().getFullYear()} Puffin Dose. Est. 2022. Lupon, Philippines.</p>
      </div>
    </footer>
  );
}
