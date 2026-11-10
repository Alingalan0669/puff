"use client";

import { useEffect, useState } from "react";

const KEY = "puffin-dose-age-verified";

export default function AgeGate() {
  const [status, setStatus] = useState<"loading" | "allowed" | "blocked" | "ask">("loading");

  useEffect(() => {
    const v = localStorage.getItem(KEY);
    if (v === "yes") setStatus("allowed");
    else if (v === "no") setStatus("blocked");
    else setStatus("ask");
  }, []);

  const allow = () => {
    localStorage.setItem(KEY, "yes");
    setStatus("allowed");
  };
  const deny = () => {
    localStorage.setItem(KEY, "no");
    setStatus("blocked");
  };

  if (status === "loading" || status === "allowed") return null;

  if (status === "blocked") {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background p-6 text-center">
        <div className="max-w-md rounded-2xl border-3 border-accent bg-purple-950 p-8">
          <h1 className="font-display text-3xl uppercase text-accent">Access Denied</h1>
          <p className="mt-4 text-lavender">You must be 18 years or older to enter Puffin Dose. Please come back when you are of legal age.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border-3 border-accent bg-purple-950 p-6 text-center shadow-glow sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">Age Verification</p>
        <h1 className="mt-2 font-display text-3xl uppercase sm:text-4xl">You must be 18+</h1>
        <p className="mt-4 text-lavender">You must be 18 years or older to enter this site. This website contains products intended for adult smokers only.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button onClick={allow} className="rounded-xl border-2 border-accent bg-accent px-6 py-3 font-bold text-black hover:bg-accent-light">Yes, I am 18+</button>
          <button onClick={deny} className="rounded-xl border-2 border-purple-600 px-6 py-3 font-bold text-white hover:border-accent">No</button>
        </div>
        <p className="mt-4 text-xs text-lavender">Nicotine is addictive. For adult smokers only. Not for minors.</p>
      </div>
    </div>
  );
}
