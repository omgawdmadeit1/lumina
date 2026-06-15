"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Zap } from "lucide-react";
import { toast } from "sonner";

const caches = [
  { name: "Red Clay Cache", rarity: "common", desc: "Small-town quantum dirt road memory. Unlocks basic stems + logs.", points: 12 },
  { name: "27 Graveyard", rarity: "rare", desc: "Branch collapse site. Includes full ASCAP package + alter vocal stems.", points: 47 },
  { name: "Entangled Lobby", rarity: "legendary", desc: "The warm public space where all versions play. Full Dream Kit + on-chain fortune voucher.", points: 120 },
];

export default function LuminaClaims() {
  const [claims, setClaims] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("lumina_claims") || "[]");
    setClaims(saved);
  }, []);

  const claim = (cache: any) => {
    toast.success(`Claimed ${cache.name}`, {
      description: `+${cache.points} Lumina XP. Fortune cracked. Voucher signed (simulated Base).`,
    });

    const newClaim = {
      id: "claim_" + Date.now(),
      listingId: "cache_" + cache.name.toLowerCase().replace(/\s+/g, "-"),
      type: "gps" as const,
      status: "fulfilled" as const,
      createdAt: new Date().toISOString(),
      note: cache.name,
    };
    const existing = JSON.parse(localStorage.getItem("lumina_claims") || "[]");
    localStorage.setItem("lumina_claims", JSON.stringify([...existing, newClaim]));
    setClaims((c) => [...c, newClaim] as any);

    // Simulate tying to a creation / fortune NFT
    setTimeout(() => {
      toast("On-chain tie-in (Phase 3)", {
        description: "In full version this would call generalized FortuneCookieNFT.mintWithSignature using your saved project logs.",
      });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6 text-white cyber-grid">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Lumina
        </a>

        <div className="flex items-center gap-3 mb-4">
          <MapPin className="h-8 w-8 text-[#E31937]" />
          <div>
            <div className="section-header">PHASE 3 • PHYGITAL CLAIMS</div>
            <h1 className="text-5xl font-bold tracking-tighter">Real-world discovery meets on-chain fortune</h1>
          </div>
        </div>

        <p className="max-w-2xl text-xl text-white/70 mb-10">
          Inspired by your Tesla Trek + Fortune Cookie system. GPS or code-based claims unlock artist assets with full provenance.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {caches.map((c, i) => (
            <div key={i} className={`energy-cache glass rounded-3xl p-8 border ${c.rarity === "legendary" ? "tier-legend border-[#ffd700]" : c.rarity === "rare" ? "border-[#00f9ff]" : "border-white/20"}`}>
              <div className={`text-xs uppercase tracking-[2px] mb-2 ${c.rarity === "legendary" ? "text-[#ffd700]" : c.rarity === "rare" ? "neon-cyan" : ""}`}>
                {c.rarity} • {c.points} XP
              </div>
              <div className="text-3xl font-semibold tracking-tight mb-3">{c.name}</div>
              <p className="text-white/70 mb-8">{c.desc}</p>

              <button 
                onClick={() => claim(c)}
                className="epic-btn w-full rounded-2xl bg-white py-3 font-semibold text-black flex items-center justify-center gap-2"
              >
                <Zap className="h-4 w-4" /> CLAIM THIS CACHE
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-white/40">
          Full version would use device GPS + optional XYO bound witness (your existing tesla_fleet.py + xyo-witness code) → signed voucher → generalized FortuneCookieNFT on Base.
        </div>

        {claims.length > 0 && (
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="section-header mb-3">YOUR CLAIMS</div>
            <div className="space-y-2 text-sm">
              {claims.map((c, i) => (
                <div key={i} className="glass rounded-2xl p-4 font-mono text-xs flex justify-between">
                  <span>{c.createdAt} • {c.type} • {c.note || c.listingId}</span>
                  <span className="text-emerald-400">{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
