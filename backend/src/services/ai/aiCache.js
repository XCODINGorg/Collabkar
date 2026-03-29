// AI INTEGRATION LAYER - new file
let redisClient = null;

try {
  const redis = await import('redis');
  redisClient = redis.createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
  redisClient.connect().catch(e => {
    console.warn('[AI Cache] Redis unavailable — caching disabled:', e.message);
    redisClient = null;
  });
} catch (e) {
  console.warn('[AI Cache] redis package not found — caching disabled');
}

async function get(key) {
  if (!redisClient) return null;
  try { const v = await redisClient.get(key); return v ? JSON.parse(v) : null; } catch { return null; }
}

async function set(key, value, ttlSeconds = 3600) {
  if (!redisClient) return;
  try { await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds }); } catch {}
}

export { get, set };