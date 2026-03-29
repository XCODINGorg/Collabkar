import { NextRequest, NextResponse } from 'next/server';

function getBackendBase() {
  return process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4001';
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const backendBase = getBackendBase().replace(/\/$/, '');

  try {
    const response = await fetch(`${backendBase}/api/auth/oauth/exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      cache: 'no-store',
    });

    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'OAuth exchange unavailable.' }, { status: 502 });
  }
}
