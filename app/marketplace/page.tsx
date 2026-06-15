"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Coins, Shield } from "lucide-react";
import { toast } from "sonner";

export default function LuminaMarketplace() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("lumina_listings") || "[]");
    setListings(saved);
  }, []);

  const buy = (listing: any) => {
    if (listing.dogepayLink) {
      toast.success("DogePay Ready — copy & pay", {
        description: listing.dogepayLink,
      });
      navigator.clipboard?.writeText(listing.dogepayLink);
    } else {
      toast("Payment link generated (demo)", { description: "dogecoin:... (would open real QR flow)" });
    }

    // Finish the loop: record a fulfilled claim/purchase tied to this listing
    const claim = {
      id: "claim_" + Date.now(),
      listingId: listing.id,
      type: "purchase" as const,
      status: "fulfilled" as const,
      createdAt: new Date().toISOString(),
      txHash: "demo_" + Math.random().toString(36).slice(2, 10),
    };
    const existingClaims = JSON.parse(localStorage.getItem("lumina_claims") || "[]");
    localStorage.setItem("lumina_claims", JSON.stringify([...existingClaims, claim]));

    setTimeout(() => {
      toast.success("Purchase recorded", {
        description: "Claim created. View in /claims or Dashboard.",
      });
      // Optional auto nav
      // window.location.href = "/claims";
    }, 650);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <a href="/" className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Lumina
        </a>

        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-header">MARKETPLACE</div>
            <h1 className="text-5xl font-bold tracking-tighter">Discover • License • Collect</h1>
          </div>
          <a href="/dashboard" className="text-sm underline">Go to your creations →</a>
        </div>

        {listings.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <p className="text-2xl mb-4">No listings yet.</p>
            <p className="text-white/60">Create something in the studio and list it from your Dashboard.</p>
            <a href="/creation" className="mt-6 inline-block epic-btn rounded-2xl bg-white px-8 py-3 font-semibold text-black">Start Creating</a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((l, i) => (
              <div key={i} className="glass rounded-3xl p-6 flex flex-col">
                <div className="flex-1">
                  <div className="uppercase text-xs tracking-[2px] text-[#E31937]">{l.currency} • {l.price}</div>
                  <div className="text-2xl font-semibold tracking-tight mt-2">{l.title}</div>
                  <div className="mt-3 text-sm text-white/70 line-clamp-3">{l.rights}</div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex gap-3">
                  <button 
                    onClick={() => buy(l)}
                    className="epic-btn flex-1 rounded-2xl bg-[#E31937] py-3 font-semibold flex items-center justify-center gap-2"
                  >
                    <Coins className="h-4 w-4" /> BUY / CLAIM WITH DOGE
                  </button>
                  <button 
                    onClick={() => toast("Rights & logs would open here (full provenance)")}
                    className="flex-1 rounded-2xl border border-white/30 py-3 text-sm flex items-center justify-center gap-2"
                  >
                    <Shield className="h-4 w-4" /> View Proof
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-xs text-white/40 text-center">
          Phase 4 in progress • All listings carry full human authorship logs from creation.
        </div>
      </div>
    </div>
  );
}
