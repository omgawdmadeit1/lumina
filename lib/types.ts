// Lumina core domain types (from approved plan)
// All creative work is human-primary with mandatory logs.
// (Nextlify was the internal planning codename; public brand is Lumina)

export type ArtistId = string;

export interface HumanLogEntry {
  id: string;
  timestamp: string;
  step: string;           // e.g. "bible-expansion", "lyrics-variant-2", "production-808"
  before: string;
  after: string;
  why: string;            // The critical human authorship justification
  author?: string;        // defaults to current user
}

export interface CreativeBible {
  coreConcept: string;
  style: string;
  bpmKey: string;
  emotionalArc: string;
  mandatoryImagery: string[];
  commercialPositioning: string;
  visualMoodboard: string;
  titles: {
    projectOptions: string[];
    epTitle: string;
    songTitles: string[];
  };
  themes: string[];
}

export interface SeedInput {
  id: string;
  raw: string;            // user's short seed
  sanitized: string;      // folder-safe
  artistId: ArtistId;
  createdAt: string;
}

export interface Asset {
  id: string;
  type: "lyrics" | "production" | "midi" | "visual" | "bundle" | "ascap" | "other";
  title: string;
  content: string;        // markdown, json, or base64 ref
  humanLogs: HumanLogEntry[];
  version: number;
}

export interface Project {
  id: string;
  seed: SeedInput;
  bible?: CreativeBible;
  assets: Asset[];
  humanLogs: HumanLogEntry[];   // all logs consolidated
  status: "draft" | "packaged" | "listed" | "live";
  createdAt: string;
  updatedAt: string;
  dogePay?: {
    uri: string;
    address: string;
    amount: number;
    memo: string;
    qrDataUrl?: string;
  };
}

export interface Listing {
  id: string;
  projectId: string;
  assetIds: string[];
  title: string;
  price: number;
  currency: "USD" | "DOGE";
  rights: string;               // "non-exclusive sync + stems", "NFT 1/10", etc.
  dogepayLink?: string;
  status: "draft" | "live";
}

// New for Monetization team: Tesla merch / Trek payment products in Lumina (DOGE revenue for Shop purchases + Fleet API)
export interface TeslaMerchProduct {
  id: string;
  item: "giga-texas-belt-buckle" | "trek-pass" | "cyberwhistle-fund" | "fleet-telemetry-credit";
  title: string;
  priceDOGE: number;
  baseForTesla: number; // e.g. 835 for belt
  description: string;
  dogePay?: ReturnType<typeof import("./dogepay").generateTeslaMerchDogePayLink>; // populated on render
  category: "merch" | "pass" | "billing-credit";
  revenueTag: "tesla-trek-revenue"; // For Cash Defense Plaid tagging + fund
}

export interface Claim {
  id: string;
  listingId: string;
  type: "gps" | "code" | "voucher" | "purchase";
  location?: { lat: number; lng: number; accuracy?: number };
  voucherSignature?: string;
  txHash?: string;
  status: "pending" | "fulfilled";
  createdAt: string;
}

export interface PaymentLink {
  id: string;
  assetOrListingId: string;
  dogecoinURI: string;
  qrDataUrl?: string;
  amount: string;
  memo: string;
  status: "open" | "paid" | "expired";
  createdAt: string;
}

// Cyberbeast Fund + Billingplane hybrid types (DogePay + Stripe live)
export interface CyberbeastFund {
  currentDOGEBalance: number; // live simulated or on-chain tracked
  goalDOGE: number; // 1250000
  percentToGoal: number;
  velocity30dUSD: number; // from Plaid tagged inflows + Stripe + DOGE receipts
  velocity30dDOGE: number;
  lastUpdated: string;
  receipts: Array<{
    id: string;
    source: "DOGE" | "STRIPE" | "PLAID";
    amountDOGE?: number;
    amountUSD?: number;
    txOrSession: string;
    tagged: boolean; // revenue velocity from Plaid tags
    timestamp: string;
  }>;
}

export interface StripeProTier {
  tier: "Free" | "Pro";
  mrr: number;
  meteredUsage: {
    dogePayLinksCreated: number;
    listingsPublished: number;
    volumeUSD: number;
  };
  entitlements: {
    maxDogePayPerMonth: number;
    hasFundAutoAllocate: boolean;
  };
}

// Tesla Pay Executor types (Doge Revenue Integrator)
export interface TeslaPayProduct {
  id: string;
  title: string;
  item: string; // e.g. "Giga Texas Belt Buckle" or "Fleet API Sustain $10+"
  priceDOGE: number;
  dogePay: {
    uri: string;
    address: string;
    amount: number;
    memo: string;
    qrDataUrl?: string;
  };
  allocation: string; // "50% to Tesla Trek Revenue (124303201/33968299)"
  categoryRef: string; // "124303201/33968299"
  evidenceNote: string;
  isFleet?: boolean;
}

// New: DogeProductSKU for batch kit + marketplace expansion (from dogepay.ts DOGE_PRODUCT_SKUS)
export interface DogeProductSKU {
  id: string;
  title: string;
  priceDOGE: number;
  category: "bundle" | "merch" | "pro" | "nft-claim" | "fleet" | "fund";
  description: string;
  allocationNote?: string;
}

// Helper for the famous BRANCH 27 example (used in stubs for fidelity)
export const QUANTUM_DIRT_ROAD_EXAMPLE = {
  title: "Quantum Dirt Road",
  concept: "EPR paradox reinterpreted through Many-Worlds Interpretation equals lived DID/OSDD experience fused with the 27 Club archetype.",
  style: "138 BPM high-energy emotional country hip-hop / southern trap",
} as const;
