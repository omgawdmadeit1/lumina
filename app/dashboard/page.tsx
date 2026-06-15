"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Shield, Download, Coins, Landmark, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

export default function LuminaDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [connectedBanks, setConnectedBanks] = useState<any[]>([]);
  const [showPlaidModal, setShowPlaidModal] = useState(false);
  const [plaidStep, setPlaidStep] = useState<'intro' | 'select-bank' | 'connecting' | 'success'>('intro');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [cashflowSummary, setCashflowSummary] = useState<any>({ inflows: 1240, outflows: 380, net: 860 });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("lumina_projects") || "[]");
    setProjects(saved);

    // Load Plaid-connected banks (prototype - in prod use secure backend + Plaid access_tokens)
    const banks = JSON.parse(localStorage.getItem("lumina_plaid_banks") || "[]");
    setConnectedBanks(banks);

    // Mock cashflow from claims + listings + connected banks
    const claims = JSON.parse(localStorage.getItem("lumina_claims") || "[]");
    const listings = JSON.parse(localStorage.getItem("lumina_listings") || "[]");
    const inflows = 1240 + (claims.length * 85) + (listings.length * 42);
    const outflows = 380;
    setCashflowSummary({ inflows, outflows, net: inflows - outflows });
  }, []);

  const openPlaidModal = () => {
    setShowPlaidModal(true);
    setPlaidStep('intro');
    setSelectedBank(null);
  };

  const closePlaidModal = () => {
    setShowPlaidModal(false);
    setPlaidStep('intro');
    setSelectedBank(null);
  };

  // Simulated Plaid Link OAuth flow (matches the real Plaid Link modal experience)
  // Real implementation (routes now live at /api/plaid/* ):
  // 1. POST /api/plaid/create-link-token  → returns { link_token }
  // 2. Use Plaid Link (react-plaid-link or the CDN script) with the token
  // 3. On success, POST /api/plaid/exchange-public-token { public_token } → server exchanges + stores access_token securely
  // Set PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV in .env.local to use the real routes.
  const startPlaidOAuth = (bankName: string) => {
    setSelectedBank(bankName);
    setPlaidStep('connecting');

    // Simulate Plaid's OAuth redirect + bank auth (usually 1-3s + user credentials in Plaid hosted UI)
    setTimeout(() => {
      const newBank = {
        id: 'plaid_' + Date.now(),
        institution: bankName,
        accounts: [
          { name: 'Checking ****4832', type: 'depository', mask: '4832' },
          { name: 'Savings ****1191', type: 'depository', mask: '1191' },
        ],
        connectedAt: new Date().toISOString(),
        // In real: access_token would be exchanged server-side and never exposed to client
        // Here we store a fake item for prototype cashflow
        itemId: 'item_' + Math.random().toString(36).slice(2),
      };

      const updated = [...connectedBanks, newBank];
      setConnectedBanks(updated);
      localStorage.setItem("lumina_plaid_banks", JSON.stringify(updated));

      // Add some sample transactions / cashflow events from the "bank"
      const txns = JSON.parse(localStorage.getItem("lumina_cashflow_txns") || "[]");
      const newTxns = [
        ...txns,
        { id: 'txn_' + Date.now(), bank: bankName, date: new Date().toISOString().split('T')[0], amount: 420, type: 'inflow', desc: 'Lumina Marketplace Sale - DOGE' },
        { id: 'txn_' + (Date.now()+1), bank: bankName, date: new Date().toISOString().split('T')[0], amount: -89, type: 'outflow', desc: 'Studio Software Subscription' },
      ];
      localStorage.setItem("lumina_cashflow_txns", JSON.stringify(newTxns));

      setPlaidStep('success');

      // Update cashflow summary
      setCashflowSummary((prev: any) => ({
        inflows: prev.inflows + 420,
        outflows: prev.outflows + 89,
        net: prev.inflows + 420 - (prev.outflows + 89)
      }));

      toast.success(`Bank connected: ${bankName} (Plaid Link)`);
    }, 1850);
  };

  const completePlaidFlow = () => {
    closePlaidModal();
    toast.success("Plaid connection complete. Real transactions will sync on next pull (prototype).");
  };

  const listToMarket = (proj: any) => {
    const listing = {
      id: "list_" + Date.now(),
      projectId: proj.id,
      title: `Quantum Dirt Road - ${proj.seed.sanitized}`,
      price: 42,
      currency: "DOGE",
      rights: "Non-exclusive + full logs + ASCAP proof",
      dogepayLink: proj.dogePay?.uri,
      status: "live",
    };
    const existing = JSON.parse(localStorage.getItem("lumina_listings") || "[]");
    localStorage.setItem("lumina_listings", JSON.stringify([...existing, listing]));
    toast.success("Listed on Lumina Marketplace");
    window.location.href = "/marketplace";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Lumina
        </a>

        <h1 className="text-5xl font-bold tracking-tighter mb-2">Lumina Dashboard</h1>
        <p className="text-white/60 mb-8">Your creations, logs, and revenue at a glance. Phase 1 complete for Music module.</p>

        {projects.length === 0 && (
          <div className="glass rounded-3xl p-12 text-center">
            <p className="text-xl">No projects yet.</p>
            <a href="/creation" className="mt-4 inline-block epic-btn rounded-2xl bg-[#E31937] px-6 py-3 font-semibold">Start your first creation</a>
          </div>
        )}

        <div className="space-y-6">
          {projects.map((p, idx) => (
            <div key={idx} className="glass rounded-3xl p-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-mono text-sm text-[#E31937]">{p.seed.raw}</div>
                  <div className="text-2xl font-semibold tracking-tight mt-1">{p.seed.sanitized}</div>
                  <div className="text-xs text-white/50 mt-1">Created {new Date(p.createdAt).toLocaleString()} • {p.humanLogs?.length || 0} human authorship logs</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => listToMarket(p)} className="flex items-center gap-2 rounded-2xl border border-white/30 px-4 py-2 text-sm hover:bg-white/5">
                    <Coins className="h-4 w-4" /> List to Marketplace
                  </button>
                  <a href="/creation" className="flex items-center gap-2 rounded-2xl border border-white/30 px-4 py-2 text-sm hover:bg-white/5">
                    <Download className="h-4 w-4" /> View / Duplicate
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <div className="section-header mb-2">Human Authorship Log (the real product)</div>
                <div className="max-h-48 overflow-auto space-y-2 text-xs font-mono">
                  {(p.humanLogs || []).map((log: any, i: number) => (
                    <div key={i} className="bg-black/40 p-3 rounded-xl border-l-2 border-[#E31937]">
                      {log.timestamp} • {log.step}<br />
                      <span className="text-white/70">WHY: {log.why}</span>
                    </div>
                  ))}
                </div>
              </div>

              {p.dogePay && (
                <div className="mt-6 p-4 bg-black/40 rounded-2xl">
                  <div className="flex items-center gap-2 text-[#E31937]"><Coins className="h-4 w-4" /> DogePay Ready</div>
                  <div className="font-mono text-sm mt-1 break-all">{p.dogePay.uri}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* === REAL CASH FLOW (Plaid) === */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="section-header">REAL CASH FLOW</div>
              <div className="text-2xl font-semibold tracking-tight">Bank Connections via Plaid</div>
            </div>
            <button
              onClick={openPlaidModal}
              className="epic-btn flex items-center gap-2 rounded-2xl bg-[#E31937] px-6 py-3 text-sm font-semibold hover:bg-[#c31530]"
            >
              <Landmark className="h-4 w-4" /> Connect Bank (Plaid Link)
            </button>
          </div>

          <div className="glass rounded-3xl p-8">
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-xs text-white/50">INFLOWS (30d)</div>
                <div className="text-4xl font-semibold tabular-nums text-emerald-400 mt-1">${cashflowSummary.inflows}</div>
              </div>
              <div>
                <div className="text-xs text-white/50">OUTFLOWS (30d)</div>
                <div className="text-4xl font-semibold tabular-nums text-orange-400 mt-1">${cashflowSummary.outflows}</div>
              </div>
              <div>
                <div className="text-xs text-white/50">NET</div>
                <div className="text-4xl font-semibold tabular-nums text-[#E31937] mt-1">${cashflowSummary.net}</div>
              </div>
            </div>

            <div className="section-header mb-3">CONNECTED BANKS ({connectedBanks.length})</div>

            {connectedBanks.length === 0 ? (
              <div className="text-white/50 text-sm">No banks connected yet. Click "Connect Bank (Plaid Link)" to start OAuth flow.</div>
            ) : (
              <div className="space-y-3">
                {connectedBanks.map((bank, i) => (
                  <div key={i} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Landmark className="h-5 w-5 text-[#E31937]" />
                      <div>
                        <div className="font-semibold">{bank.institution}</div>
                        <div className="text-xs text-white/50 font-mono">{bank.accounts.map((a: any) => a.name).join(" • ")}</div>
                      </div>
                    </div>
                    <div className="text-right text-xs text-white/50 font-mono">
                      Connected {new Date(bank.connectedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 text-[10px] text-white/40">
              Prototype: Plaid Link OAuth flow simulated. Real implementation exchanges public_token server-side for access_token (never client-side).
              Transactions would be pulled via /transactions/get.
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-xs text-white/40 text-center">
          <div>Phase 1 (Music Core + Logs + Bundle + DogePay) complete. Projects persist in browser for this prototype (localStorage).</div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const data = {
                  projects: JSON.parse(localStorage.getItem("lumina_projects") || "[]"),
                  listings: JSON.parse(localStorage.getItem("lumina_listings") || "[]"),
                  claims: JSON.parse(localStorage.getItem("lumina_claims") || "[]"),
                  plaidBanks: JSON.parse(localStorage.getItem("lumina_plaid_banks") || "[]"),
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `lumina-export-${Date.now()}.json`;
                a.click();
                URL.revokeObjectURL(url);
                toast.success("Exported Lumina data");
              }}
              className="rounded-full border border-white/20 px-3 py-1 hover:bg-white/5"
            >
              Export Data (JSON)
            </button>
            <button
              onClick={() => {
                if (confirm("Clear all Lumina local data?")) {
                  localStorage.removeItem("lumina_projects");
                  localStorage.removeItem("lumina_listings");
                  localStorage.removeItem("lumina_claims");
                  localStorage.removeItem("lumina_plaid_banks");
                  localStorage.removeItem("lumina_cashflow_txns");
                  window.location.reload();
                }
              }}
              className="rounded-full border border-white/20 px-3 py-1 hover:bg-white/5 text-red-400/70"
            >
              Clear All Data
            </button>
          </div>
        </div>
      </div>

      {/* === PLAID OAUTH MODAL (Plaid Link style) === */}
      {showPlaidModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4">
          <div className="glass w-full max-w-md rounded-3xl border border-[#E31937]/40 overflow-hidden">
            {plaidStep === 'intro' && (
              <>
                <div className="px-8 pt-8">
                  <div className="flex items-center gap-3">
                    <Landmark className="h-8 w-8 text-[#E31937]" />
                    <div>
                      <div className="font-semibold text-2xl tracking-tighter">Connect Bank Account</div>
                      <div className="text-xs text-white/50">Powered by Plaid • Secure OAuth</div>
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-white/70 space-y-3">
                    <p>Plaid Link gives Lumina read-only access to your transactions so we can show real cash flow from sales, claims, and royalties.</p>
                    <ul className="list-disc pl-5 text-xs space-y-1 text-white/60">
                      <li>Bank-level encryption (we never see your login credentials)</li>
                      <li>Only transaction history + balances (no transfers)</li>
                      <li>You can revoke access anytime</li>
                    </ul>
                    <div className="text-[10px] text-white/50 mt-2">
                      Backend routes ready: <span className="font-mono">/api/plaid/create-link-token</span> + <span className="font-mono">/api/plaid/exchange-public-token</span>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-8 bg-black/60 border-t border-white/10 flex flex-col gap-3">
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch('/api/plaid/create-link-token', { method: 'POST' });
                        const data = await res.json();
                        if (data.link_token) {
                          alert(`Real link_token received (use with Plaid Link):\n\n${data.link_token}\n\nIn a full integration you would now call plaidLink.open({ token: link_token })`);
                          // For demo we still go to the simulated bank picker
                          setPlaidStep('select-bank');
                        } else {
                          alert('Real route not configured (set PLAID_* env vars) or error: ' + (data.error || 'unknown'));
                          setPlaidStep('select-bank');
                        }
                      } catch (e) {
                        alert('Could not reach real Plaid route. Falling back to simulation.');
                        setPlaidStep('select-bank');
                      }
                    }}
                    className="epic-btn w-full py-4 rounded-2xl border border-[#E31937] text-[#E31937] font-semibold flex items-center justify-center gap-2 hover:bg-[#E31937] hover:text-white"
                  >
                    <LinkIcon className="h-4 w-4" /> Get Real link_token (from /api/plaid)
                  </button>

                  <button
                    onClick={() => setPlaidStep('select-bank')}
                    className="epic-btn w-full py-4 rounded-2xl bg-[#E31937] font-semibold flex items-center justify-center gap-2"
                  >
                    <LinkIcon className="h-4 w-4" /> Continue with Simulated Plaid Link
                  </button>
                  <button onClick={closePlaidModal} className="py-3 text-xs text-white/50 hover:text-white">Cancel</button>
                  <div className="text-center text-[10px] text-white/40 mt-2">
                    Real routes are implemented. Add your Plaid credentials to .env.local to use them.
                  </div>
                </div>
              </>
            )}

            {plaidStep === 'select-bank' && (
              <>
                <div className="px-8 pt-8 pb-4">
                  <div className="font-semibold text-xl">Select your bank</div>
                  <div className="text-xs text-white/50">This is a Plaid Link simulation. Real flow shows live institutions + OAuth.</div>
                </div>

                <div className="px-4 pb-6 space-y-2 max-h-72 overflow-auto">
                  {['Chase', 'Bank of America', 'Wells Fargo', 'Capital One', 'Ally Bank', 'US Bank'].map((bank) => (
                    <button
                      key={bank}
                      onClick={() => startPlaidOAuth(bank)}
                      className="w-full flex items-center justify-between glass hover:border-[#E31937]/60 transition rounded-2xl px-5 py-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Landmark className="h-5 w-5" />
                        <span className="font-medium">{bank}</span>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full border border-white/20">OAuth</span>
                    </button>
                  ))}
                </div>

                <div className="px-8 py-6 border-t border-white/10 text-center">
                  <button onClick={closePlaidModal} className="text-xs text-white/50 hover:text-white">Cancel</button>
                </div>
              </>
            )}

            {plaidStep === 'connecting' && (
              <div className="px-8 py-16 text-center">
                <div className="mx-auto mb-6 h-12 w-12 border-4 border-[#E31937] border-t-transparent rounded-full animate-spin" />
                <div className="font-semibold text-xl">Connecting to {selectedBank}…</div>
                <div className="mt-2 text-sm text-white/60">Plaid is handling secure OAuth + multi-factor authentication.</div>
                <div className="mt-8 text-[10px] text-white/40">This step usually takes 5–20 seconds in production.</div>
              </div>
            )}

            {plaidStep === 'success' && (
              <>
                <div className="px-8 pt-10 pb-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <Landmark className="h-7 w-7" />
                  </div>
                  <div className="text-2xl font-semibold tracking-tighter">Bank Connected!</div>
                  <div className="mt-1 text-emerald-400">{selectedBank} • 2 accounts linked</div>

                  <div className="mt-6 text-left text-sm bg-black/40 p-4 rounded-2xl font-mono text-xs">
                    <div>Item ID: item_{Math.random().toString(36).slice(2, 10)}</div>
                    <div className="mt-1 opacity-60">Access token exchanged server-side (prototype stores mock only)</div>
                  </div>
                </div>

                <div className="px-8 pb-8">
                  <button
                    onClick={completePlaidFlow}
                    className="epic-btn w-full py-4 rounded-2xl bg-white text-black font-semibold"
                  >
                    Done — View in Cash Flow
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
