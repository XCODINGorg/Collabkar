import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function csvEscape(value: string) {
  const escaped = value.replaceAll('"', '""');
  return `"${escaped}"`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const brandName = typeof body?.brandName === 'string' ? body.brandName.trim() : '';
    const creatorName = typeof body?.creatorName === 'string' ? body.creatorName.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const source = typeof body?.source === 'string' ? body.source.trim() : '';

    if (!brandName || !creatorName || !source) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandName, creatorName, email, source, timestamp }),
      });

      if (!webhookResponse.ok) {
        return NextResponse.json({ error: 'Webhook save failed.' }, { status: 502 });
      }

      return NextResponse.json({ ok: true, mode: 'webhook' });
    }

    const filePath = process.env.WAITLIST_FILE_PATH || path.join(process.cwd(), 'data', 'waitlist-emails.csv');
    const folderPath = path.dirname(filePath);

    await mkdir(folderPath, { recursive: true });

    const line = `${csvEscape(brandName)},${csvEscape(creatorName)},${csvEscape(email)},${csvEscape(source)},${csvEscape(timestamp)}\n`;
    const header = 'brand_name,creator_name,email,source,submitted_at\n';

    try {
      const existing = await readFile(filePath, 'utf8');
      await writeFile(filePath, existing + line, 'utf8');
    } catch {
      await writeFile(filePath, header + line, 'utf8');
    }

    return NextResponse.json({
      ok: true,
      mode: 'local_file',
      warning: process.env.VERCEL
        ? 'File writes on Vercel are temporary. Use WAITLIST_WEBHOOK_URL to write to your PC.'
        : undefined,
    });
  } catch {
    return NextResponse.json({ error: 'Unexpected error while saving email.' }, { status: 500 });
  }
}
