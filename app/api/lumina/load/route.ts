import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJson(key: string, fallback: any[] = []) {
  ensureDataDir();
  const file = path.join(DATA_DIR, `lumina-${key}.json`);
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch (e) {
    console.error(`[lumina/load] read error for ${key}`, e);
  }
  return fallback;
}

export async function GET() {
  // Server-side durable store (file-backed for prototype; survives dev restarts)
  // NOTE: For real Vercel prod use Supabase / Drizzle / Vercel KV. This is ephemeral per deploy but excellent for dev + demo completeness.
  const projects = readJson('projects');
  const listings = readJson('listings');
  const claims = readJson('claims');
  return NextResponse.json({ projects, listings, claims, source: 'server-file' });
}
