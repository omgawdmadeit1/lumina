"use client";

import { 
  ArrowRight, Sparkles, Shield, Zap, MapPin, Coins, Users, 
  Play, FileText, ExternalLink 
} from "lucide-react";
import { toast } from "sonner";

export default function LuminaHome() {
  const startCreation = () => {
    window.location.href = "/creation";
  };

  const viewPlan = () => {
    toast.info("Approved Plan", {
      description: "Full details (including Lumina name recs + storage/pricing model) live in the session plan.md. Implementation follows the 5 phases exactly.",
    });
    // In real: could open the plan path or a /docs page
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white cyber-grid">
      {/* HUD-style top nav */}
      <nav className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#E31937] to-red-600 shadow-[0_0_20px_rgb(227,25,55)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-2xl font-semibold tracking-tighter">LUMINA</div>
              <div className="text-[9px] text-[#E31937] -mt-1 font-mono tracking-[3px]">CREATION → CASH OS • v0.1 ALPHA</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <a href="/dashboard" className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 hover:bg-white/5">DASHBOARD</a>
            <a href="/marketplace" className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 hover:bg-white/5">MARKETPLACE</a>
            <a href="/claims" className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 hover:bg-white/5">CLAIMS</a>
            <button 
              onClick={viewPlan}
              className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 hover:bg-white/5"
            >
              <FileText className="h-4 w-4" /> PLAN
            </button>
            <button 
              onClick={startCreation}
              className="epic-btn flex items-center gap-2 rounded-full bg-[#E31937] px-5 py-1.5 font-semibold text-white hover:bg-red-700"
            >
              START CREATING <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero — Epic protocol style from plan + Trek reference */}
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E31937]/30 bg-[#E31937]/10 px-4 py-1 text-xs font-mono tracking-[2px] text-[#E31937]">
          APPROVED PLAN • HUMAN AUTHORSHIP FIRST • ANY ARTIST
        </div>

        <h1 className="protocol-header font-mono text-7xl font-bold tracking-tighter md:text-8xl">
          FROM SEED<br />TO CASH.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-2xl text-white/80">
          The epic all-in-one creator tool &amp; marketplace.<br />
          Idea → Packaged assets with ironclad logs → Listings, DogePay, NFT drops, real-world claims → Real revenue.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button 
            onClick={startCreation}
            className="epic-btn group flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:bg-zinc-200"
          >
            LAUNCH CREATION STUDIO <Play className="h-5 w-5 group-hover:translate-x-0.5 transition" />
          </button>
          <button 
            onClick={viewPlan}
            className="flex items-center gap-3 rounded-2xl border border-white/30 px-7 py-4 text-lg font-medium hover:bg-white/5"
          >
            READ THE FULL PLAN <ExternalLink className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 text-xs text-white/50">
          Public brand: <span className="text-[#E31937]">Lumina</span>. (Nextlify was the internal planning codename during the original 5-phase plan.)
        </div>
      </div>

      {/* Core pillars — directly from the approved plan */}
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Sparkles, title: "Creation Lab", desc: "Generalized QuantumBranch pipelines. Bible → multi-variant assets (music, visuals, UGC) with mandatory human review gates + immutable logs." },
            { icon: Shield, title: "Rights & Provenance", desc: "Every decision logged with timestamp + 'why'. ASCAP packs, provenance, on-chain vouchers. Human primary — always." },
            { icon: Coins, title: "Monetization Router", desc: "DogePay links (QR + manual paid), generalized Fortune NFT drops, Gumroad exports, sync outreach automation, real cash tracking." },
            { icon: MapPin, title: "Marketplace + Claims", desc: "Internal discovery for any artist. Phygital hooks (Trek-style GPS claims). Buy, claim, or license in one flow." },
          ].map((p, i) => (
            <div key={i} className="glass rounded-3xl p-6">
              <p.icon className="h-6 w-6 text-[#E31937] mb-4" />
              <div className="font-semibold text-lg tracking-tight">{p.title}</div>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick entry stubs (will become real routes) */}
      <div id="creation" className="border-t border-white/10 bg-black/40 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="section-header mb-3">PHASE 1 START</div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-semibold tracking-tight">Music Creation Module (MVP)</div>
              <div className="text-white/60">Seed → Bible → 3-variant lyrics + MIDI production notes → Review gates → ASCAP bundle. Exact patterns from your QuantumBranch27.</div>
            </div>
            <button 
              onClick={startCreation}
              className="epic-btn ml-6 shrink-0 rounded-2xl border border-[#E31937] px-6 py-3 text-sm font-semibold text-[#E31937] hover:bg-[#E31937] hover:text-white"
            >
              OPEN STUDIO (STUB)
            </button>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-white/60 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-4">✓ Human edit logs enforced at every step</div>
            <div className="rounded-2xl border border-white/10 p-4">✓ Local MIDI runner bridge (your quantum_midi_generator.py patterns)</div>
            <div className="rounded-2xl border border-white/10 p-4">✓ One-click export: bundle + dogepay link + marketplace listing</div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="mx-auto max-w-4xl px-6 py-12 text-center text-xs text-white/40">
        This is the living implementation of the approved plan (session 019ec734-...). 
        All reuse paths (QuantumBranch at C:\Auto hustle, fortune at C:\grok\income-accelerator, Trek HUD at OneDrive/tesla-fleet-client-main, etc.) documented in the plan. 
        Name decision, storage/pricing model (free tier + Pro with 8-12% fee), and 10 additional epic features also in the plan.
      </div>
    </div>
  );
}
