function nowMs() {
  return Date.now();
}

export function createRateLimiter({
  windowMs = 60_000,
  max = 30,
  keyFn = (req) => req.ip || req.headers['x-forwarded-for'] || 'unknown',
} = {}) {
  const hits = new Map();

  function cleanup() {
    const current = nowMs();
    for (const [key, entry] of hits.entries()) {
      if (current - entry.resetAt >= windowMs) hits.delete(key);
    }
  }

  return (req, res, next) => {
    cleanup();
    const key = String(keyFn(req));
    const current = nowMs();
    const entry = hits.get(key) || { count: 0, resetAt: current };

    if (current - entry.resetAt >= windowMs) {
      entry.count = 0;
      entry.resetAt = current;
    }

    entry.count += 1;
    hits.set(key, entry);

    if (entry.count > max) {
      const retryAfter = Math.max(1, Math.ceil((windowMs - (current - entry.resetAt)) / 1000));
      res.setHeader('Retry-After', String(retryAfter));
      return res.status(429).json({ ok: false, error: 'Too many requests. Please try again later.' });
    }

    return next();
  };
}

