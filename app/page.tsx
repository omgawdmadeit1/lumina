"use client";

import { 
  ArrowRight, MapPin, Shield, Compass, Truck, Zap, ExternalLink, Mail, Phone
} from "lucide-react";

export default function TeslaTrekHome() {
  const exploreMarketplace = () => {
    window.location.href = "/marketplace";
  };

  const viewClaims = () => {
    window.location.href = "/claims";
  };

  const openDashboard = () => {
    window.location.href = "/dashboard";
  };

  const openReceive = () => {
    window.location.href = "/receive";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Professional Tesla Trek Nav */}
      <nav className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E31937] to-red-700 shadow-[0_0_24px_rgba(227,25,55,0.45)]">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-[21px] font-semibold tracking-[-1.2px] leading-none">TESLA TREK</div>
              <div className="text-[10px] text-[#E31937] font-mono tracking-[3.5px] -mt-px">A DIVISION OF LVL X LTD CO</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm">
            <a href="#experience" className="px-4 py-2 rounded-full hover:bg-white/5 transition text-white/80 hover:text-white">EXPERIENCE</a>
            <a href="/marketplace" className="px-4 py-2 rounded-full hover:bg-white/5 transition text-white/80 hover:text-white">MARKETPLACE</a>
            <a href="/claims" className="px-4 py-2 rounded-full hover:bg-white/5 transition text-white/80 hover:text-white">CLAIMS</a>
            <a href="/dashboard" className="px-4 py-2 rounded-full hover:bg-white/5 transition text-white/80 hover:text-white">FLEET DASHBOARD</a>
            <button 
              onClick={openReceive}
              className="ml-2 flex items-center gap-2 rounded-full border border-white/25 px-5 py-2 hover:bg-white/5 transition"
            >
              RECEIVE
            </button>
            <button 
              onClick={exploreMarketplace}
              className="epic-btn ml-1 flex items-center gap-2 rounded-full bg-[#E31937] px-5 py-2 font-semibold text-white hover:bg-red-700 transition"
            >
              EXPLORE MARKETPLACE <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Division Banner - prominent and professional */}
      <div className="border-b border-white/10 bg-black/60 py-2.5">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between text-xs tracking-[1px] text-white/70 font-mono">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-[#E31937]" />
            <span>tesla-trek.com — OFFICIAL DIVISION OF LVL X LTD CO</span>
          </div>
          <div>6167 GA 254, CLEVELAND, GEORGIA 30528 USA</div>
          <div className="hidden md:block">JOE@LVLLTD.COM • JOE@TESLA-TREK.COM • 706-768-0803</div>
        </div>
      </div>

      {/* Professional Hero */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E31937]/40 bg-[#E31937]/5 px-5 py-1 text-[10px] font-mono tracking-[3px] text-[#E31937]">
            PREMIUM TESLA EXPEDITIONS • PROVENANCE • LIFESTYLE
          </div>

          <h1 className="font-mono text-[92px] leading-[82px] font-semibold tracking-[-6.2px] md:text-[108px] md:leading-[94px]">
            TESLA TREK
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-2xl tracking-[-0.4px] text-white/75">
            The definitive expedition and lifestyle division for Tesla owners.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-lg text-white/55">
            Real-world adventures. GPS-verified claims. Limited authenticated drops. 
            Direct ecosystem participation.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button 
              onClick={exploreMarketplace}
              className="epic-btn group flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:bg-zinc-200"
            >
              ENTER THE MARKETPLACE <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition" />
            </button>
            <button 
              onClick={viewClaims}
              className="flex items-center gap-3 rounded-2xl border border-white/30 px-8 py-4 text-lg font-medium hover:bg-white/5 transition"
            >
              BEGIN A CLAIM <Compass className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 text-[11px] text-white/40 tracking-[1.5px] font-mono">
            POWERED BY ADVANCED CREATOR INFRASTRUCTURE • ALL RIGHTS RESERVED
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div id="experience" className="border-t border-white/10 bg-black/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="section-header mb-1">THE TESLA TREK EXPERIENCE</div>
              <div className="text-4xl font-semibold tracking-tight">Adventures that matter.</div>
            </div>
            <button onClick={openDashboard} className="hidden md:flex items-center gap-2 text-sm text-[#E31937] hover:text-red-400 font-medium">
              ACCESS FLEET DASHBOARD <ExternalLink className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { 
                icon: MapPin, 
                title: "GPS-Enabled Claims", 
                desc: "Verified real-world locations. Claim phygital assets and provenance-backed collectibles tied directly to Tesla journeys and expeditions." 
              },
              { 
                icon: Shield, 
                title: "Authenticated Provenance", 
                desc: "Every drop and claim carries immutable human-authorship logs, ownership records, and on-chain verification. Trust built into every piece." 
              },
              { 
                icon: Truck, 
                title: "Limited Tesla Lifestyle", 
                desc: "Premium merch funds, Cyberwhistle-style pieces, Giga Texas belt buckles, and exclusive owner passes. Proceeds allocated with full transparency." 
              },
              { 
                icon: Zap, 
                title: "Direct Ecosystem Flow", 
                desc: "Qualifying revenue supports Tesla Trek programs and owner initiatives. 50% allocation model for qualifying Trek SKUs. No intermediaries." 
              },
            ].map((p, i) => (
              <div key={i} className="glass rounded-3xl p-7 border border-white/5 hover:border-white/10 transition">
                <p.icon className="h-6 w-6 text-[#E31937] mb-5" />
                <div className="font-semibold text-xl tracking-[-0.3px] mb-2.5">{p.title}</div>
                <p className="text-[15px] leading-relaxed text-white/70">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Division & Headquarters */}
      <div className="border-t border-white/10 py-14">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="text-xs tracking-[3px] text-[#E31937] font-mono mb-3">HEADQUARTERS &amp; LEGAL</div>
          <div className="text-4xl font-semibold tracking-[-1px] mb-4">LVL X Ltd Co</div>
          <div className="text-xl text-white/80">Tesla Trek Division</div>

          <div className="mt-6 text-lg text-white/70 leading-relaxed max-w-md mx-auto">
            6167 GA 254<br />
            Cleveland, Georgia 30528<br />
            United States of America
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-x-8 gap-y-2 text-base">
            <a href="mailto:joe@lvlltd.com" className="flex items-center gap-2 hover:text-[#E31937] transition">
              <Mail className="h-4 w-4" /> joe@lvlltd.com
            </a>
            <a href="mailto:joe@tesla-trek.com" className="flex items-center gap-2 hover:text-[#E31937] transition">
              <Mail className="h-4 w-4" /> joe@tesla-trek.com
            </a>
            <a href="tel:7067680803" className="flex items-center gap-2 hover:text-[#E31937] transition">
              <Phone className="h-4 w-4" /> 706-768-0803
            </a>
          </div>
        </div>
      </div>

      {/* Professional CTA Bar */}
      <div className="border-t border-white/10 bg-black/60 py-10">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="text-sm uppercase tracking-[2.5px] text-white/50 mb-2">FOR OWNERS • COLLECTORS • ADVENTURERS</div>
          <div className="text-3xl font-semibold tracking-tight mb-6">Join the Tesla Trek.</div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={exploreMarketplace}
              className="epic-btn flex items-center gap-3 rounded-2xl bg-[#E31937] px-8 py-3.5 text-base font-semibold text-white hover:bg-red-700 transition"
            >
              BROWSE MARKETPLACE
            </button>
            <button 
              onClick={viewClaims}
              className="flex items-center gap-3 rounded-2xl border border-white/25 px-8 py-3.5 text-base font-medium hover:bg-white/5 transition"
            >
              EXPLORE CLAIMS
            </button>
            <button 
              onClick={openDashboard}
              className="flex items-center gap-3 rounded-2xl border border-white/25 px-8 py-3.5 text-base font-medium hover:bg-white/5 transition"
            >
              FLEET DASHBOARD
            </button>
          </div>

          <div className="mt-9 text-[11px] text-white/35 tracking-widest font-mono">
            © {new Date().getFullYear()} LVL X LTD CO — TESLA TREK DIVISION. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>

      {/* Subtle ecosystem note */}
      <div className="py-6 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 text-center text-xs text-white/30">
          Tesla Trek is the public brand and expedition division. Platform tools (marketplace, claims, creation infrastructure) power authenticated drops and owner experiences.
        </div>
      </div>
    </div>
  );
}
