"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeading eyebrow="Get in touch" title="Contact Us" subtitle="Questions, orders, or product availability? Reach out to Puffin Dose." />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border-2 border-purple-700 bg-purple-900/40 p-6">
          <h3 className="font-display text-2xl uppercase text-accent">Contact Details</h3>
          <ul className="mt-4 space-y-3 text-lavender">
            <li><span className="font-semibold text-white">Address:</span> Purok Malinawon, Bagumbayan, Lupon, Philippines, 8207</li>
            <li><span className="font-semibold text-white">Smart:</span> <a href="tel:09857938596" className="hover:text-accent">0985 793 8596</a></li>
            <li><span className="font-semibold text-white">Smart:</span> <a href="tel:09301263997" className="hover:text-accent">0930 126 3997</a></li>
            <li><span className="font-semibold text-white">Globe:</span> <a href="tel:09452117917" className="hover:text-accent">0945 211 7917</a></li>
            <li><span className="font-semibold text-white">Facebook:</span> Puffin Dose Vs</li>
          </ul>
          <div className="mt-6 overflow-hidden rounded-xl border border-purple-700">
            <iframe
              title="Puffin Dose map"
              src="https://www.google.com/maps?q=Purok%20Malinawon,%20Bagumbayan,%20Lupon,%20Philippines%208207&output=embed"
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="rounded-2xl border-2 border-purple-700 bg-purple-900/40 p-6">
          <h3 className="font-display text-2xl uppercase text-accent">Send a Message</h3>
          {sent ? (
            <div className="mt-4 rounded-xl border border-accent/50 bg-purple-950 p-4 text-lavender">
              <p className="font-semibold text-accent">Thanks for reaching out!</p>
              <p className="mt-1">We received your message. For faster response, you can also contact us via phone or Facebook (Puffin Dose Vs).</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm text-lavender">Name</label>
                <input required className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2 focus:border-accent focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-lavender">Phone</label>
                <input required className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2 focus:border-accent focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-lavender">Message</label>
                <textarea required rows={5} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2 focus:border-accent focus:outline-none" />
              </div>
              <button type="submit" className="rounded-xl border-2 border-accent bg-accent px-6 py-3 font-bold text-black hover:bg-accent-light">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
