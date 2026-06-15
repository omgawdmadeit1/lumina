# Lumina

**The epic all-in-one creator tool and marketplace for any artist.**

From a single seed (idea, photo, melody, location, prompt) to fully packaged, rights-cleared, multi-channel monetized assets — with ironclad human authorship logs, marketplace discovery, DogePay, NFT/fortune drops, real-world claims (Tesla Trek style), and real cash flow.

Public brand: **Lumina** (ignite the path from creation to cash).  
Internal planning codename during development: Nextlify.

## Current Status (following the approved 5-phase plan)

- **Phase 1 — Foundation & Music Core**: Complete for the music module.
  - Seed → Creative Bible expander with human review gate
  - Lyrics (3 variants: melodic outlaw / trap-rap / emotional spoken)
  - Production + local MIDI notes (real patterns from your QuantumBranch27)
  - Mandatory human authorship logging at every step (the real product for ASCAP / provenance / collector trust)
  - Real bundle export (downloadable .txt with everything + logs)
  - Real DogePay link + QR generation
  - Persistence via localStorage + quick "List to Marketplace"

- **Phase 2 — Visual/UGC + Polish**: Stub ready (easy to expand with your lemonade-craze-ugc patterns).

- **Phase 3 — NFT + Claims Engine**: Strong simulator at `/claims` (Trek-style rarity caches, "claim" that ties to on-chain fortune/voucher flow using your generalized Fortune Cookie + hardhat patterns).

- **Phase 4 — Marketplace + Full Cash Loop**: Live at `/marketplace`. Listings from your creations, "Buy/Claim with DOGE" that surfaces the real payment QR. Basic royalties view via dashboard.

- **Phase 5 — Ops/Scale**: Dashboard at `/dashboard` (your projects + logs), basic analytics hints, campaign/launch flow seeds from your income-accelerator assets.
- **New**: Real Cash Flow section with Plaid OAuth modal (simulated Link flow + bank connection + mock transactions for prototype cashflow tracking). Ready to wire real Plaid keys + backend exchange.

## Key Routes
- `/` — Epic landing (Lumina branding, plan references, name decision)
- `/creation` — Music Creation Studio (full working flow with your real Quantum Dirt Road content)
- `/dashboard` — Your creations + human logs + quick list action
- `/marketplace` — Public discovery + buy/claim
- `/claims` — Phygital / real-world claim simulator (Trek-inspired)

## Technology & Reuse (per the plan)
- Next.js 16 + Tailwind (reused patterns from your dogepay-deploy)
- Epic cyber HUD aesthetic (directly from your Tesla Trek v4 index.html + src/ + plan)
- Human guardrails & logging (directly from C:\Auto hustle\QuantumBranch27 SKILL.md + scripts)
- DogePay (real URI + QR using installed qrcode)
- Fortune / NFT / claims (generalized from C:\grok\income-accelerator\fortune-cookie-nft + hardhat-base-nft + your trek code)
- Visual/UGC inspiration (your lemonade-craze-ugc + ComfyUI + fortnite-ai-music-island)

## Run it
```bash
cd C:\Users\Josep\nextlify
npm install
npm run dev
```

Open http://localhost:3000

Create something → watch the logs grow → export real bundle + DogePay QR → list it → claim it in the marketplace or claims page.

## Name Decision (from approved plan)
**Lumina** is the recommended public brand (light / illuminate the full path from spark to cash + royalties + impact). It matches your neon/cyber/HUD/golden-hour aesthetic perfectly.

Other strong options considered: CreatorForge, HustleLoom, QuantumLoom, TrekForge.

The folder and some internal comments may still reference "nextlify" from the initial scaffold — the public experience is fully Lumina.

## Current Status (WSL2 + Windows)
- Fully functional MVP in browser (localStorage prototype): seed → human-gated bible/lyrics/production → real bundle export (.txt + logs) → DogePay URI + QR → list to marketplace → buy/claim flow that records claims.
- All pages (/, /creation, /dashboard, /marketplace, /claims) wired and cross-linked.
- DogePay uses real qrcode lib + dogecoin: URI (configurable via NEXT_PUBLIC_DOGE_PAY_ADDRESS).
- Cyber/HUD aesthetic complete (Tesla Trek + plan reuse).
- Build verified in WSL2 Ubuntu after clean Linux-native reinstall (lightningcss, SWC).
- vercel.json + .env.example added for easy deploy.

## Next (continuing the 5 phases)
- Wire real Supabase / DB (or Drizzle + Postgres / SQLite) instead of localStorage
- Expand Visual/UGC module with actual image upload + stylize (lemonade-craze-ugc + ComfyUI patterns)
- Full generalized FortuneCookieNFT integration + real Base testnet claims (reuse hardhat-base-nft + fortune-cookie-launch skills)
- Analytics, campaign builder, grant packet generator (reuse your income-accelerator assets/)
- Deploy to Vercel (`vercel --prod` or deploy-to-vercel skill) + announce using your existing launch packet style

See the full approved plan (including storage/pricing model for the marketplace, detailed reuse map, verification checklist, and 10 additional high-impact features) in the original session plan file.

## Run it (WSL2 or Windows)
```bash
cd /mnt/c/Users/Josep/nextlify   # or C:\Users\Josep\nextlify
npm install
npm run dev
# or for prod
npm run build
npm start
```
Open http://localhost:3000

Create → edit with real logs (prompted "why") → package + DogePay QR + download bundle → list → buy in marketplace (records claim) → view claims.

## Hardware note (RTX 5070 WSL2)
nvidia-smi visible. Use for local Comfy/Ollama/torch work alongside this. See LOCAL-HARDWARE-SETUP.md.

Built with ❤️ for every artist who wants creation → cash without losing ownership or soul.
