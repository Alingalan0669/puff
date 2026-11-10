import SectionHeading from "@/components/SectionHeading";
import SmokeBackground from "@/components/SmokeBackground";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-purple-800">
        <SmokeBackground />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">Since 2022</p>
          <h1 className="mt-2 font-display text-4xl uppercase md:text-6xl">About Puffin Dose</h1>
          <p className="mt-4 text-lg text-lavender">Your legit local vape shop in Purok Malinawon, Bagumbayan, Lupon, Philippines.</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-16 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-purple-700 bg-purple-900/40 p-6">
          <SectionHeading eyebrow="Our story" title="Puffin Dose Since 2022" />
          <p className="text-lavender">Puffin Dose started in 2022 with a simple goal: bring authentic vape products and friendly local service to the community of Lupon. What began as a small passion for quality flavors and reliable devices has grown into a trusted neighborhood shop.</p>
          <p className="mt-4 text-lavender">We take pride in serving adult smokers with legit products, honest recommendations, and fast local delivery. From disposables to pods, e-juice, and accessories, we keep our shelves stocked with favorites our customers love.</p>
        </div>
        <div className="rounded-2xl border-2 border-accent/50 bg-purple-950 p-6">
          <h3 className="font-display text-2xl uppercase text-accent">Local & Legit</h3>
          <ul className="mt-4 space-y-3 text-lavender">
            <li><span className="font-semibold text-white">Location:</span> Purok Malinawon, Bagumbayan, Lupon, Philippines 8207</li>
            <li><span className="font-semibold text-white">Established:</span> 2022</li>
            <li><span className="font-semibold text-white">What we offer:</span> Disposable vapes, pods, devices/kits, e-juice, coils & accessories</li>
            <li><span className="font-semibold text-white">Promise:</span> 100% authentic products, fast local service, and a welcoming vibe</li>
          </ul>
          <div className="mt-6 rounded-xl border border-purple-700 bg-background/40 p-4 text-sm text-lavender">
            <p className="font-semibold text-accent">For adult smokers only.</p>
            <p>Not for minors. Nicotine is addictive.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
