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

// Helper for the famous BRANCH 27 example (used in stubs for fidelity)
export const QUANTUM_DIRT_ROAD_EXAMPLE = {
  title: "Quantum Dirt Road",
  concept: "EPR paradox reinterpreted through Many-Worlds Interpretation equals lived DID/OSDD experience fused with the 27 Club archetype.",
  style: "138 BPM high-energy emotional country hip-hop / southern trap",
} as const;
