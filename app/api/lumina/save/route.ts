import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function writeJson(key: string, data: any) {
  ensureDataDir();
  const file = path.join(DATA_DIR, `lumina-${key}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, data } = body as { key: 'projects' | 'listings' | 'claims'; data: any[] };

    if (!key || !Array.isArray(data)) {
      return NextResponse.json({ error: 'Invalid payload. Expect {key, data:[]}' }, { status: 400 });
    }

    if (!['projects', 'listings', 'claims'].includes(key)) {
      return NextResponse.json({ error: 'Unknown key' }, { status: 400 });
    }

    writeJson(key, data);
    return NextResponse.json({ success: true, key, count: data.length, persistedAt: new Date().toISOString() });
  } catch (e: any) {
    console.error('[lumina/save] error', e);
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}
