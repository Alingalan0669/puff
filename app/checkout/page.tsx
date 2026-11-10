"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart, useCartTotal } from "@/store/useCart";
import { formatPHP } from "@/lib/products";
import SectionHeading from "@/components/SectionHeading";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const total = useCartTotal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: "Cash on Delivery" });
  const [order, setOrder] = useState<{ name: string; phone: string; address: string; payment: string; total: number; summary: string } | null>(null);

  const summaryText = useMemo(() => {
    const lines = items.map((i) => `- ${i.name} x${i.quantity} (${[i.flavor, i.nicotine].filter(Boolean).join("/") || "Standard"}) = ${formatPHP(i.price * i.quantity)}`);
    return `Puffin Dose Order\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\nPayment: ${form.payment}\nItems:\n${lines.join("\n")}\nTotal: ${formatPHP(total)}`;
  }, [items, form, total]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setOrder({ ...form, total, summary: summaryText });
    setSubmitted(true);
    clearCart();
  };

  const messengerLink = order ? `https://m.me/` : "#";
  const smsBody = order ? encodeURIComponent(order.summary) : "";
  const smsLink = order ? `sms:09857938596?&body=${smsBody}` : "#";

  if (submitted && order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border-3 border-accent bg-purple-900/40 p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">Order Confirmed</p>
          <h1 className="mt-2 font-display text-4xl uppercase">Thank you, {order.name}!</h1>
          <p className="mt-3 text-lavender">Your order has been prepared. Send the pre-filled message below via Facebook Messenger or SMS to complete coordination with Puffin Dose.</p>
          <div className="mt-5 rounded-xl border border-purple-700 bg-purple-950 p-4">
            <pre className="whitespace-pre-wrap text-sm text-lavender">{order.summary}</pre>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a href={messengerLink} target="_blank" rel="noreferrer" className="rounded-xl border-2 border-accent bg-accent px-5 py-3 text-center font-bold text-black hover:bg-accent-light">Open Messenger</a>
            <a href={smsLink} className="rounded-xl border-2 border-accent px-5 py-3 text-center font-bold text-accent hover:bg-accent/10">Send via SMS</a>
            <Link href="/shop" className="rounded-xl border-2 border-purple-600 px-5 py-3 text-center font-bold hover:border-accent">Continue Shopping</Link>
          </div>
          <p className="mt-4 text-xs text-lavender">Tip: On Messenger, search for <span className="text-white">Puffin Dose Vs</span> and paste your order message.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeading eyebrow="Secure your order" title="Checkout" subtitle="Cash on Delivery or GCash. We'll confirm your order via message." />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border-2 border-purple-700 bg-purple-900/40 p-6">
          <div>
            <label className="mb-1 block text-sm text-lavender">Full Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2 focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-lavender">Phone Number</label>
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2 focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-lavender">Delivery Address</label>
            <textarea required rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2 focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-lavender">Payment Method</label>
            <select value={form.payment} onChange={(e) => setForm({ ...form, payment: e.target.value })} className="w-full rounded-lg border border-purple-700 bg-purple-950 px-3 py-2 focus:border-accent focus:outline-none">
              <option>Cash on Delivery</option>
              <option>GCash</option>
            </select>
          </div>
          <button type="submit" disabled={items.length === 0} className="w-full rounded-xl border-2 border-accent bg-accent px-6 py-3 font-bold text-black hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50">Place Order</button>
          {items.length === 0 && <p className="text-sm text-lavender">Your cart is empty. <Link href="/shop" className="text-accent underline">Shop now</Link></p>}
        </form>

        <aside className="h-fit rounded-2xl border-2 border-purple-700 bg-purple-900/40 p-6">
          <h3 className="font-display text-2xl uppercase text-accent">Order Summary</h3>
          <ul className="mt-4 space-y-3">
            {items.map((i) => (
              <li key={`${i.id}-${i.flavor}-${i.nicotine}`} className="flex justify-between gap-3 text-sm">
                <span className="text-lavender">{i.name} x{i.quantity}</span>
                <span>{formatPHP(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          {items.length === 0 && <p className="mt-4 text-sm text-lavender">No items yet.</p>}
          <div className="mt-4 flex items-center justify-between border-t border-purple-700 pt-4 text-lg font-bold">
            <span>Total</span>
            <span className="text-accent">{formatPHP(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
