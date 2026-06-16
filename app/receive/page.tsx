"use client";

import React, { useState } from "react";
import { ArrowLeft, Coins, Target, Truck, Zap, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { 
  generateCyberbeastFundDogePayLink, 
  generateTeslaMerchDogePayLink, 
  generateTeslaFleetAPISustainLink,
  generateDogePayLink,
  getCyberbeastFundAddress,
  getTeslaTrekMerchAddress,
  getTeslaFleetSustainAddress,
  getDogePayAddress 
} from "@/lib/dogepay";

// Minimal "Pay Wall" / Receiving page for Lumina transactions + revenue.
// Multiple DOGE QR options (URIs) tied directly to Cyberbeast Fund 1.25M goal + Tesla allocations (50% Trek Revenue cat).
// Prioritizes real DOGE or test payments once env addresses are set in Vercel.
// Visual QR: URIs are dogecoin: standard — open in any DOGE wallet (Dogecoin Core, Exodus, Trust etc) or paste to QR generator.
// After real send (matching amount + memo), use explorer confirm + dashboard "mark received" or Plaid annotate for evidence.
// DEMO addresses until you set real controlled receive-only DOGE addrs via NEXT_PUBLIC_* in Vercel project envs + redeploy.

export default function LuminaReceivePaywall() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customNote, setCustomNote] = useState("");

  const fundGoal = 1250000; // 1.25M DOGE Cyberbeast goal
  const teslaAllocNote = "50% allocated to Tesla Trek Revenue category (124303201/33968299) in cashflow cat per Plaid + dogepay executor";

  // Pre-generate options (will reflect current env or demo; update envs for real)
  const options = [
    {
      id: "cyberbeast",
      label: "CYBERBEAST FUND DIRECT",
      desc: `Direct to 1.25M DOGE goal. Core revenue for Lumina + Tesla Trek ops.`,
      gen: () => generateCyberbeastFundDogePayLink(customNote || "Direct Fund Contribution (Paywall)", selectedAmount),
      addr: getCyberbeastFundAddress(),
      allocation: "100% to Cyberbeast Fund velocity + Plaid tag 'cyberbeast/lumina'",
      color: "border-[#E31937]",
    },
    {
      id: "tesla-giga",
      label: "TESLA GIGA TEXAS BELT BUCKLE (MERCH)",
      desc: "DOGE-eligible Tesla Shop merch equivalent. Funds purchase/alloc of Giga Texas Belt (~850-900 DOGE historical).",
      gen: () => generateTeslaMerchDogePayLink("Giga Texas Belt Buckle", selectedAmount > 50 ? selectedAmount : 850),
      addr: getTeslaTrekMerchAddress(),
      allocation: teslaAllocNote,
      color: "border-[#00f9ff]",
    },
    {
      id: "tesla-fleet",
      label: "TESLA FLEET API SUSTAIN ($10+)",
      desc: "Top-up for developer.tesla.com Fleet API billing (signals/commands/data/wake after $10/mo credit).",
      gen: () => generateTeslaFleetAPISustainLink(customNote || "Fleet API Sustain Top-up (Paywall)", Math.max(10, Math.min(selectedAmount, 50))),
      addr: getTeslaFleetSustainAddress(),
      allocation: "Funds Fleet telemetry pay-per-use. 50% Trek Revenue cat tie-in for ops.",
      color: "border-emerald-400",
    },
    {
      id: "general",
      label: "GENERAL LUMINA BUNDLE / LISTING",
      desc: "Any creation bundle or marketplace listing payment. Routes to primary DogePay (fund default).",
      gen: () => generateDogePayLink(customNote || "Lumina Bundle / Listing (Paywall)", selectedAmount),
      addr: getDogePayAddress(),
      allocation: "General + fund attribution per billingplane hybrid.",
      color: "border-white/30",
    },
  ];

  const copyAndOpen = (opt: any) => {
    const pay = opt.gen();
    navigator.clipboard?.writeText(pay.uri);
    toast.success(`${opt.label} DOGE URI copied`, {
      description: `${pay.amount} DOGE → ${pay.address} | Memo: ${pay.memo}`,
    });
    // dogecoin: URI will open supported wallets on click if link used
    window.open(pay.uri, "_blank");
  };

  const copyURIOnly = (opt: any) => {
    const pay = opt.gen();
    navigator.clipboard?.writeText(pay.uri);
    toast.info("DOGE payment URI copied — paste into wallet or QR tool", { description: pay.uri });
  };

  const markDemoReceived = (opt: any) => {
    const pay = opt.gen();
    toast.success("Demo: Marked received (local only)", {
      description: `In real: verify on dogechain.info/tx/... or blockcypher. Then annotate Plaid cashflow with cat + URI + amount. Tx evidence templates in kit.`,
    });
    // Could POST to /api or update local fund sim here if wanted; for now evidence only
    console.log("[DEMO RECEIVED]", pay, opt.allocation);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white cyber-grid p-6">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Lumina (Live: nextlify-topaz.vercel.app)
        </a>

        <div className="flex items-center gap-3 mb-4">
          <Coins className="h-9 w-9 text-[#E31937]" />
          <div>
            <div className="section-header tracking-[3px]">TRANSACTIONS + REVENUE • PAYWALL / RECEIVE</div>
            <h1 className="text-5xl font-bold tracking-tighter">DOGE Receive Options</h1>
          </div>
        </div>

        <p className="max-w-3xl text-xl text-white/70 mb-4">
          Multiple controlled DOGE addresses for real inflows. Tied to <span className="text-[#E31937]">Cyberbeast Fund 1.25M DOGE goal</span> + <span className="text-[#00f9ff]">Tesla Trek Revenue (50% cat 124303201/33968299)</span>.
        </p>

        <div className="glass rounded-3xl p-6 mb-8 border border-white/10">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <div className="text-xs uppercase tracking-[2px] text-white/50 mb-1">AMOUNT (DOGE)</div>
              <input 
                type="number" 
                value={selectedAmount} 
                onChange={e => setSelectedAmount(Math.max(1, parseInt(e.target.value) || 42))} 
                className="w-32 rounded-xl border border-white/20 bg-black/60 px-4 py-2 font-mono text-lg focus:outline-none" 
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="text-xs uppercase tracking-[2px] text-white/50 mb-1">CUSTOM MEMO / NOTE (optional)</div>
              <input 
                value={customNote} 
                onChange={e => setCustomNote(e.target.value)} 
                placeholder="e.g. Live test payment for Lumina revenue"
                className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-2 text-sm focus:outline-none" 
              />
            </div>
            <div className="text-xs text-white/40 max-w-xs">
              REAL PAYMENT: Set real DOGE receive addrs in Vercel env (see .env.example in repo) → redeploy. Current live uses demo placeholders (no real funds will arrive).
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {options.map((opt, idx) => {
            const pay = opt.gen();
            return (
              <div key={idx} className={`glass rounded-3xl p-6 border ${opt.color} flex flex-col`}>
                <div className="uppercase text-[10px] tracking-[2px] mb-1 text-[#E31937]">{opt.id.toUpperCase()}</div>
                <div className="text-2xl font-semibold tracking-tight mb-1">{opt.label}</div>
                <p className="text-sm text-white/70 mb-4">{opt.desc}</p>

                <div className="font-mono text-xs bg-black/50 rounded p-3 mb-3 break-all border border-white/10">
                  {pay.uri}
                </div>

                <div className="text-[10px] text-emerald-400 mb-1">TO: {pay.address}</div>
                <div className="text-[10px] text-white/50 mb-3">AMOUNT: {pay.amount} DOGE • MEMO: {pay.memo}</div>

                <div className="text-xs text-white/60 mb-4">Allocation: {opt.allocation}</div>

                <div className="mt-auto flex flex-wrap gap-2">
                  <button 
                    onClick={() => copyAndOpen(opt)}
                    className="flex-1 epic-btn rounded-2xl bg-[#E31937] py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 hover:bg-red-700"
                  >
                    <Copy className="h-4 w-4" /> COPY + OPEN dogecoin: URI
                  </button>
                  <button 
                    onClick={() => copyURIOnly(opt)}
                    className="flex-1 rounded-2xl border border-white/30 py-3 text-sm font-semibold hover:bg-white/5 flex items-center justify-center gap-2"
                  >
                    <Copy className="h-4 w-4" /> COPY URI ONLY
                  </button>
                  <button 
                    onClick={() => markDemoReceived(opt)}
                    className="w-full mt-2 rounded-2xl border border-white/20 py-2 text-xs hover:bg-white/5"
                  >
                    MARK AS RECEIVED (DEMO / EVIDENCE ONLY)
                  </button>
                </div>

                <div className="mt-3 text-[10px] text-white/40">
                  Verify real tx: <a href={`https://dogechain.info/address/${pay.address}`} target="_blank" className="underline">dogechain.info</a> or blockcypher. Match exact memo + amt. Then use receipt templates from kit.
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center text-xs text-white/40">
          Fund Goal: {fundGoal.toLocaleString()} DOGE • Current live deploy uses demo addrs (see .env.example + Vercel envs to switch to real controlled addrs for actual inflows).<br />
          After payment: record in /dashboard or claims. Cross-ref Plaid cashflow + on-chain explorer for truthful evidence. Tesla 50% alloc documented in lib/dogepay.ts + types.
        </div>

        <div className="mt-6 text-center">
          <a href="/dashboard" className="text-sm underline">Go to Dashboard (Fund Tracker + Tesla Exec)</a> • <a href="/claims" className="text-sm underline">Claims + NFT Vouchers</a>
        </div>
      </div>
    </div>
  );
}
