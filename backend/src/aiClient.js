class AiServiceError extends Error {
  constructor(message, { status = 502, details = null } = {}) {
    super(message);
    this.name = 'AiServiceError';
    this.status = status;
    this.details = details;
  }
}

function getAiBaseUrl() {
  const value = process.env.AI_SERVICE_URL || 'http://localhost:8000';
  try {
    // Validates the URL early.
    // eslint-disable-next-line no-new
    new URL(value);
    return value;
  } catch {
    throw new AiServiceError('AI_SERVICE_URL is not a valid URL.', { status: 500 });
  }
}

function getTimeoutMs() {
  const raw = process.env.AI_SERVICE_TIMEOUT_MS;
  if (!raw) return 10_000;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 10_000;
}

export async function postJsonToAi(path, payload) {
  if (typeof fetch !== 'function') {
    throw new AiServiceError('Global fetch is not available. Use Node.js 18+.', { status: 500 });
  }

  const baseUrl = getAiBaseUrl();
  const timeoutMs = getTimeoutMs();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = new URL(path.startsWith('/') ? path : `/${path}`, baseUrl);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload ?? {}),
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.toLowerCase().includes('application/json');
    const body = isJson ? await response.json().catch(() => null) : await response.text().catch(() => null);

    if (!response.ok) {
      const message = typeof body === 'object' && body?.detail
        ? String(body.detail)
        : `AI service returned ${response.status}.`;
      throw new AiServiceError(message, { status: response.status, details: body });
    }

    return body;
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new AiServiceError('AI service request timed out.', { status: 504 });
    }
    if (error instanceof AiServiceError) throw error;
    throw new AiServiceError('Failed to reach AI service.', { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}

export function toHttpError(error) {
  if (error instanceof AiServiceError) {
    return {
      status: error.status,
      json: { ok: false, error: error.message, details: error.details ?? undefined },
    };
  }
  return { status: 500, json: { ok: false, error: 'Unexpected error while calling AI service.' } };
}
