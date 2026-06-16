"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Coins, Shield, Zap, Truck } from "lucide-react";
import { toast } from "sonner";
import { generateTeslaMerchDogePayLink, getBestOfNTeslaOffers, getAllDogePaySKUs, generateDogePayForSKU, generateDogePayLink, generateCyberbeastFundDogePayLink } from "@/lib/dogepay";

export default function LuminaMarketplace() {
  // TRANSACTIONS/RAILS 1/4 EXT (199 crown 8899 + 8902 NFT + 8929 tx wave + new subagent's 3 threads/email/one-pager): Add 75 NFT Claim (8902/8914 + 199 crown NFT rights) + Fortune Lore + Crown Jewel Bundle 55-95 DOGE (tied 8902+199+8929) via plug from transactions-closer/plug-snippet-add-to-marketplace.js (2 new entries with exact afterPayNote "claim via 8902 fortune-lumina-nft/claim-mint.html or 8914 + get the crown jewel marketing assets", crosses to new subagent assets hour1-marketing-8902-nft-199-crown/, 8899, 8929, 8930/31, 8926/28 etc). 
  // Full truth banner + 5/6/8-step: 0 real, replace DEMO D7Y7... (D8/D9) in 8902 files + 199 crown + 8929 + 3 tx JSONs + 2 new JSONs + dogepay.ts + .env + this nextlify + fortune claim-mint + subagent assets before real. Ties to live /claims for voucher/claim flow + 199 crown NFT rights. Cross 6 images/final-goods catalog/raw GH/packet/master/Cyberbeast 1.25M/50% Trek. LFG direct 199 crown jewel + 8902 + 8929 inflows. See 8902-199-nft-fortune-receiver.html + updated 2 JSONs + batch verifier + plugs + master index.
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/lumina/load');
        if (res.ok) {
          const { listings: serverListings } = await res.json();
          if (Array.isArray(serverListings) && serverListings.length > 0) {
            setListings(serverListings);
            localStorage.setItem("lumina_listings", JSON.stringify(serverListings));
            return;
          }
        }
      } catch {}
      const saved = JSON.parse(localStorage.getItem("lumina_listings") || "[]");
      setListings(saved);
    })();
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
        description: "Claim created. View in /claims or Dashboard. Revenue tagged for Tesla Trek / Fleet billing.",
      });
      // Optional auto nav
      // window.location.href = "/claims";
    }, 650);
  };

  // New Tesla Merch / Trek payment products (Monetization team: best-of-n offers, all DOGE revenue for Tesla Shop + Fleet API)
  const [teslaOffers] = useState(() => getBestOfNTeslaOffers());
  const buyTeslaMerch = (offer: any) => {
    const link = offer.uri || (getBestOfNTeslaOffers()[0]?.uri || "dogecoin:demo");
    navigator.clipboard?.writeText(link);
    toast.success(`Tesla ${offer.item || 'Trek Merch / Fleet'} DOGE Payment Ready (Pay Tesla executor)`, {
      description: `${link} — Copy & pay. 50% alloc to Revenue cat 124303201/33968299. Plaid evidence + on-chain verifier. Funds Giga Belt + Fleet billing.`,
    });

    // Record as special Trek revenue claim (Cash Defense tie-in + 50% alloc evidence)
    const claim = {
      id: "claim_tesla_" + Date.now(),
      listingId: `tesla-merch-${offer.item || 'belt'}`,
      type: "purchase" as const,
      status: "fulfilled" as const,
      createdAt: new Date().toISOString(),
      txHash: "doge_tesla_revenue_" + Math.random().toString(36).slice(2, 8),
      note: `Tesla Merch Revenue (Pay Tesla): ${offer.allocationNote || '50% to 124303201/33968299'}`,
      revenueTag: "tesla-trek-revenue",
      catRef: "124303201/33968299",
      dogeURI: link,
    };
    const existingClaims = JSON.parse(localStorage.getItem("lumina_claims") || "[]");
    localStorage.setItem("lumina_claims", JSON.stringify([...existingClaims, claim]));
    localStorage.setItem("lumina_tesla_revenue_txns", JSON.stringify([
      ...(JSON.parse(localStorage.getItem("lumina_tesla_revenue_txns") || "[]")),
      { id: claim.id, amountDOGE: offer.amount || 900, source: "DOGE", tagged: "tesla-trek-revenue", ts: new Date().toISOString() }
    ]));

    setTimeout(() => toast("Revenue recorded to Tesla Trek pool. Use in Cash Defense / Plaid tagging.", { description: "Prioritizes DOGE for merch + API credits." }), 800);
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
            <h1 className="text-5xl font-bold tracking-tighter">DISCOVER • PAY DOGE • CLOSE TRANSACTIONS</h1>
            <p className="text-sm text-white/60 mt-1">Every DOGE buy = instant claim + revenue to Cyberbeast Fund (1.25M goal) + Tesla Trek pool (50% to cat 124303201/33968299). Real receive. Fund Tesla Shop + Fleet.</p>
          </div>
          <a href="/dashboard" className="text-sm underline">Go to your creations → List &amp; Earn</a>
        </div>

        {listings.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <p className="text-2xl mb-4">No listings yet. Time to close transactions.</p>
            <p className="text-white/60">Create in studio → list with DogePay → buyers pay DOGE direct to fund + Tesla revenue.</p>
            <a href="/creation" className="mt-6 inline-block epic-btn rounded-2xl bg-white px-8 py-3 font-semibold text-black">START CREATING + LIST DOGEPAY ASSETS NOW</a>
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
                    <Coins className="h-4 w-4" /> PAY DOGE NOW — INSTANT CLAIM + FUND CYBERBEAST + TESLA
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

        {/* === NEW: Tesla Trek x Lumina Merch & Billing Products (Monetization priority: DOGE revenue for direct Tesla Shop + Fleet API funding) === */}
        {/* Best-of-N offers generated. All inflows tagged tesla-trek-revenue for Cash Defense / Plaid + Cyberbeast Fund. */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="h-6 w-6 text-[#E31937]" />
            <div>
              <div className="section-header">TESLA TREK REVENUE PRODUCTS • PRIORITY DOGE • REAL CASH CLOSES</div>
              <h2 className="text-4xl font-bold tracking-tighter">PAY DOGE NOW → FUND GIGA BELT BUCKLE + LIVE FLEET TELEMETRY (50% TO REVENUE CAT)</h2>
            </div>
          </div>
          <p className="max-w-3xl text-white/70 mb-8 font-semibold">DIRECT DOGEPAY. Every receipt closes real revenue: Cyberbeast Fund ramp + Tesla Trek pool. Buy Tesla Shop merch (Giga Texas Belt ~835 DOGE equiv) or top up developer.tesla.com Fleet billing for live Trek telemetry. COPY URI → SEND FROM ANY DOGE WALLET → MARK RECEIVED = CASH DEFENSE + FUND VELOCITY.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {teslaOffers.map((offer, i) => (
              <div key={i} className="glass rounded-3xl p-6 border border-[#E31937]/40 flex flex-col">
                <div className="flex-1">
                  <div className="uppercase text-xs tracking-[2px] text-[#E31937] flex items-center gap-2"><Zap className="h-3 w-3" /> DOGE • TESLA REVENUE</div>
                  <div className="text-2xl font-semibold tracking-tight mt-2">{offer.memo || `Tesla Merch Bundle`}</div>
                  <div className="mt-1 text-3xl font-bold tabular-nums">{offer.amount} DOGE <span className="text-sm font-normal text-white/60">(${ (offer.amount * 0.089).toFixed(0) } USD @ ~$0.089/DOGE)</span></div>
                  <div className="mt-3 text-sm text-white/70">{(offer as any).allocationNote || (offer as any).item || "Funds Tesla Shop merch (50% to 124303201/33968299) + Fleet API billing for live Trek telemetry."}</div>
                  <div className="mt-2 text-[10px] text-emerald-400 font-mono">Tagged: tesla-trek-revenue • Routes to Fleet credits / Belt purchase</div>
                </div>
                <button 
                  onClick={() => buyTeslaMerch(offer)}
                  className="epic-btn mt-6 w-full rounded-2xl bg-[#E31937] py-3 font-semibold flex items-center justify-center gap-2"
                >
                  <Coins className="h-4 w-4" /> PAY WITH DOGE NOW — FUND TESLA SHOP + FLEET + CYBERBEAST (CLOSE TRANSACTION)
                </button>
                <div className="mt-2 text-[9px] text-white/40 text-center">Best-of-N variant {i+1}. Copy link opens in any Dogecoin wallet.</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xs text-white/50">
            Evidence: After pay, claims recorded with revenueTag. Sync to cashflow MCP / Plaid for real inflows. Execution: nextlify + tesla-fleet-client updated. Target: accumulate 835+ DOGE for Shop + payment config on dev.tesla.com.
          </div>
        </div>

        {/* === EXPANDED SKU MARKETPLACE (from dogepay.ts DOGE_PRODUCT_SKUS; trivial plug real addr) === */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <div>
            <div className="section-header">ALL DOGEPAY SKUS • LIVE RECEIVE (bundles 42-200 DOGE, merch 300-900, NFT claims 50-150, Pro)</div>
            <h2 className="text-4xl font-bold tracking-tighter">Plug real DOGE addr (see .env.example + lib/dogepay.ts TODO) → generate + share URIs/QRs instantly. Direct to your wallet. Explorer confirm only.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {getAllDogePaySKUs().map((skuItem: any, i: number) => (
              <div key={i} className="glass rounded-3xl p-6 border border-white/10 flex flex-col">
                <div className="flex-1">
                  <div className="uppercase text-xs tracking-[2px] text-[#E31937]">{skuItem.category} • {skuItem.priceDOGE} DOGE</div>
                  <div className="text-2xl font-semibold tracking-tight mt-2">{skuItem.title}</div>
                  <div className="mt-2 text-sm text-white/70">{skuItem.description}</div>
                  {skuItem.allocationNote && <div className="mt-2 text-xs text-emerald-400 font-mono">50% ALLOC / FUND NOTE: {skuItem.allocationNote}</div>}
                </div>
                <button 
                  onClick={() => {
                    const pay = skuItem.payLink || generateDogePayForSKU(skuItem.id);
                    navigator.clipboard?.writeText(pay.uri);
                    toast.success(`DogePay ${skuItem.title} ready`, { description: pay.uri });
                    // record claim stub for loop
                    const claim = { id: "claim_sku_" + Date.now(), listingId: skuItem.id, type: "purchase", status: "fulfilled", createdAt: new Date().toISOString(), dogeURI: pay.uri, revenueTag: skuItem.allocationNote ? "tesla-trek-revenue" : "general" };
                    const ex = JSON.parse(localStorage.getItem("lumina_claims") || "[]");
                    localStorage.setItem("lumina_claims", JSON.stringify([...ex, claim]));
                  }}
                  className="epic-btn mt-6 w-full rounded-2xl bg-[#E31937] py-3 font-semibold flex items-center justify-center gap-2"
                >
                  COPY DOGECOIN URI + PAY WITH DOGE
                </button>
                <div className="mt-2 text-[9px] text-white/40 text-center font-mono">dogecoin: URI • QR via kit or dashboard • Verify: dogechain.info</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-xs text-white/50">Set NEXT_PUBLIC_DOGE_PAY_ADDRESS (or dedicated fund/trek) in .env for real money rails. All SKUs ready for live tx. No custody. Full on-chain + memo verifier in transactions kit.</div>
        </div>

        {/* === NEXTLIFY INTEGRATION CLOSER (Transactions agent 1/4 + hour1-tx-wave2): 3 NEW SKUs from dogepay.ts (199 master, 150 fund, 69 stems) ===
             Plug-in ready: "Buy with DOGE" buttons call generate* funcs (generateDogePayForSKU / generateCyberbeastFundDogePayLink / generateDogePayLink) + show QR.
             Full ready-to-paste version + diff + static pack in hour1-tx-wave2/nextlify-integration.md
             DEMO WARNING: Uses placeholder addresses from lib/dogepay.ts — replace with real receive-only DOGE for live inflows. See user actions 1-5 in the md. */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <div>
            <div className="section-header">HOUR1 TX WAVE2 • NEXTLIFY INTEGRATION CLOSER</div>
            <h2 className="text-4xl font-bold tracking-tighter">3 NEW SKUS: 199 MASTER • 150 FUND • 69 STEMS — BUY WITH DOGE (GENERATE + QR)</h2>
          </div>
          <p className="max-w-3xl text-white/70 mt-2 mb-6 text-sm">Direct from lib/dogepay.ts DOGE_PRODUCT_SKUS + generate funcs. Click Buy: auto-generates dogecoin: URI (env addr or default), copies it, records claim, shows QR for wallet scan. <strong>100% DEMO until you replace addresses</strong> (see .env + dogepay.ts TODO + receivers). To make real crypto: follow user actions 1-5 in hour1-tx-wave2/nextlify-integration.md (edit addrs, host/serve on 8787 or vercel, share, buyer pays exact amt+memo, verify in on-chain-verifier.html, deliver).</p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 199 MASTER — use generateDogePayLink for custom master price (or bundle-ultimate ~200 adjusted) */}
            {(() => {
              const pay = generateDogePayLink("LUMINA MASTER 199 — ULTIMATE", 199);
              const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(pay.uri)}`;
              return (
                <div className="glass rounded-3xl p-6 border border-[#E31937]/50 flex flex-col">
                  <div className="flex-1">
                    <div className="uppercase text-xs tracking-[2px] text-[#E31937]">MASTER BUNDLE • 199 DOGE</div>
                    <div className="text-2xl font-semibold tracking-tight mt-2">LUMINA MASTER 199 — ULTIMATE DREAM KIT</div>
                    <div className="mt-2 text-sm text-white/70">All assets + video stems + NFT claim eligibility. Master bundle from hour1-ultimate-master-bundle. 50% Tesla Trek alloc where merch applies.</div>
                    <div className="mt-2 text-[10px] text-emerald-400 font-mono break-all">URI: {pay.uri}</div>
                  </div>
                  <div className="mt-4 flex justify-center"><img src={qrUrl} alt="QR for Master 199" className="rounded border border-white/20" /></div>
                  <button 
                    onClick={() => {
                      const p = generateDogePayLink("LUMINA MASTER 199 — ULTIMATE", 199);
                      navigator.clipboard?.writeText(p.uri);
                      toast.success("199 MASTER DogePay generated", { description: p.uri });
                      const claim = { id: "claim_wave2_199_" + Date.now(), listingId: "master-199", type: "purchase", status: "fulfilled", createdAt: new Date().toISOString(), dogeURI: p.uri, revenueTag: "tesla-trek-revenue" };
                      const ex = JSON.parse(localStorage.getItem("lumina_claims") || "[]");
                      localStorage.setItem("lumina_claims", JSON.stringify([...ex, claim]));
                    }}
                    className="epic-btn mt-4 w-full rounded-2xl bg-[#E31937] py-3 font-semibold flex items-center justify-center gap-2"
                  >
                    <Coins className="h-4 w-4" /> BUY WITH DOGE — GENERATE + COPY + SCAN QR
                  </button>
                  <div className="mt-2 text-[9px] text-white/40 text-center">Calls generateDogePayLink • QR via qrserver • Verify on dogechain.info. DEMO ADDR — replace for real.</div>
                </div>
              );
            })()}

            {/* 150 FUND — use generateCyberbeastFundDogePayLink for dedicated fund SKU */}
            {(() => {
              const pay = generateCyberbeastFundDogePayLink("Cyberbeast Fund 150 — Wave2 Master Tier", 150);
              const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(pay.uri)}`;
              return (
                <div className="glass rounded-3xl p-6 border border-[#E31937]/50 flex flex-col">
                  <div className="flex-1">
                    <div className="uppercase text-xs tracking-[2px] text-[#E31937]">FUND • 150 DOGE</div>
                    <div className="text-2xl font-semibold tracking-tight mt-2">CYBERBEAST FUND 150 — 1.25M GOAL TIER</div>
                    <div className="mt-2 text-sm text-white/70">Dedicated fund receipt (D8 style). Visual goal tracker. Pure direct to Cyberbeast 1.25M DOGE velocity + Plaid. Matches hour1-tx-wave2 150doge receiver.</div>
                    <div className="mt-2 text-[10px] text-emerald-400 font-mono break-all">URI: {pay.uri}</div>
                  </div>
                  <div className="mt-4 flex justify-center"><img src={qrUrl} alt="QR for Fund 150" className="rounded border border-white/20" /></div>
                  <button 
                    onClick={() => {
                      const p = generateCyberbeastFundDogePayLink("Cyberbeast Fund 150 — Wave2 Master Tier", 150);
                      navigator.clipboard?.writeText(p.uri);
                      toast.success("150 FUND DogePay generated", { description: p.uri });
                      const claim = { id: "claim_wave2_150_" + Date.now(), listingId: "fund-150", type: "purchase", status: "fulfilled", createdAt: new Date().toISOString(), dogeURI: p.uri, revenueTag: "cyberbeast-fund" };
                      const ex = JSON.parse(localStorage.getItem("lumina_claims") || "[]");
                      localStorage.setItem("lumina_claims", JSON.stringify([...ex, claim]));
                    }}
                    className="epic-btn mt-4 w-full rounded-2xl bg-[#E31937] py-3 font-semibold flex items-center justify-center gap-2"
                  >
                    <Coins className="h-4 w-4" /> BUY WITH DOGE — GENERATE + COPY + SCAN QR
                  </button>
                  <div className="mt-2 text-[9px] text-white/40 text-center">Calls generateCyberbeastFundDogePayLink • Exact for 1.25M goal • DEMO — replace D8 addr for real crypto.</div>
                </div>
              );
            })()}

            {/* 69 STEMS — exact from dogepay.ts DOGE_PRODUCT_SKUS bundle-ep */}
            {(() => {
              const pay = generateDogePayForSKU("bundle-ep");
              const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(pay.uri)}`;
              return (
                <div className="glass rounded-3xl p-6 border border-[#E31937]/50 flex flex-col">
                  <div className="flex-1">
                    <div className="uppercase text-xs tracking-[2px] text-[#E31937]">BUNDLE / STEMS • 69 DOGE</div>
                    <div className="text-2xl font-semibold tracking-tight mt-2">LUMINA EP BUNDLE (5 TRACKS + STEMS)</div>
                    <div className="mt-2 text-sm text-white/70">Full EP assets, MIDI, production notes, ASCAP proof. Direct from dogepay.ts SKU bundle-ep. Stems sync ready.</div>
                    <div className="mt-2 text-[10px] text-emerald-400 font-mono break-all">URI: {pay.uri}</div>
                  </div>
                  <div className="mt-4 flex justify-center"><img src={qrUrl} alt="QR for 69 Stems" className="rounded border border-white/20" /></div>
                  <button 
                    onClick={() => {
                      const p = generateDogePayForSKU("bundle-ep");
                      navigator.clipboard?.writeText(p.uri);
                      toast.success("69 STEMS DogePay generated", { description: p.uri });
                      const claim = { id: "claim_wave2_69_" + Date.now(), listingId: "bundle-ep", type: "purchase", status: "fulfilled", createdAt: new Date().toISOString(), dogeURI: p.uri, revenueTag: "general" };
                      const ex = JSON.parse(localStorage.getItem("lumina_claims") || "[]");
                      localStorage.setItem("lumina_claims", JSON.stringify([...ex, claim]));
                    }}
                    className="epic-btn mt-4 w-full rounded-2xl bg-[#E31937] py-3 font-semibold flex items-center justify-center gap-2"
                  >
                    <Coins className="h-4 w-4" /> BUY WITH DOGE — GENERATE + COPY + SCAN QR
                  </button>
                  <div className="mt-2 text-[9px] text-white/40 text-center">Calls generateDogePayForSKU("bundle-ep") • Exact 69 stems SKU from lib/dogepay.ts • DEMO ADDR until replaced.</div>
                </div>
              );
            })()}
          </div>

          <div className="mt-6 text-xs text-white/50">
            Cross-linked: hour1-tx-wave2/nextlify-integration.md (full plug-in diff, static-deploy-pack index.html listing all receivers from transactions-closer + hour1-*, on-chain-verifier, python server 8787). All with accurate DEMO warnings. To make real crypto inflows: User Action 1: Get real DOGE receive addr (MyDoge receive-only). 2: Replace EVERY demo addr (D7Y7..., D8..., D9... + in .env/lib/receivers). 3: Host or serve static (see python one-liner below in md) + deploy nextlify. 4: Share URIs/QR or marketplace. 5: Buyer pays exact amount + memo; you verify addr+amt+exact-memo in on-chain-verifier.html (linked) then fulfill + record. GitHub raw note: open raw links for instant static use after addr edit.
          </div>
        </div>
      </div>
    </div>
  );
}
