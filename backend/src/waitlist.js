import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function csvEscape(value) {
  const escaped = String(value).replaceAll('"', '""');
  return `"${escaped}"`;
}

export async function handleWaitlistSubmission(body) {
  const brandName = typeof body?.brandName === 'string' ? body.brandName.trim() : '';
  const creatorName = typeof body?.creatorName === 'string' ? body.creatorName.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const source = typeof body?.source === 'string' ? body.source.trim() : '';

  if (!brandName || !creatorName || !source) {
    return { status: 400, json: { error: 'Please complete all required fields.' } };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { status: 400, json: { error: 'Invalid email address.' } };
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
      return { status: 502, json: { error: 'Webhook save failed.' } };
    }

    return { status: 200, json: { ok: true, mode: 'webhook' } };
  }

  const filePath =
    process.env.WAITLIST_FILE_PATH || path.join(process.cwd(), 'data', 'waitlist-emails.csv');
  const folderPath = path.dirname(filePath);

  await mkdir(folderPath, { recursive: true });

  const line = `${csvEscape(brandName)},${csvEscape(creatorName)},${csvEscape(
    email
  )},${csvEscape(source)},${csvEscape(timestamp)}\n`;
  const header = 'brand_name,creator_name,email,source,submitted_at\n';

  try {
    const existing = await readFile(filePath, 'utf8');
    await writeFile(filePath, existing + line, 'utf8');
  } catch {
    await writeFile(filePath, header + line, 'utf8');
  }

  return { status: 200, json: { ok: true, mode: 'local_file' } };
}
