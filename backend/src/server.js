import express from 'express';
import cors from 'cors';
import { handleWaitlistSubmission } from './waitlist.js';
import { suggestPricing } from './pricing.js';
import { login, requireAuth, signup } from './auth.js';

const app = express();

const corsOriginRaw = process.env.CORS_ORIGIN;
const corsOrigin = corsOriginRaw
  ? corsOriginRaw.split(',').map((value) => value.trim()).filter(Boolean)
  : (origin, callback) => {
      if (!origin) return callback(null, true);
      if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return callback(null, true);
      return callback(null, false);
    };

app.use(
  cors({
    origin: corsOrigin,
  })
);
app.use(express.json({ limit: '200kb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/waitlist', async (req, res) => {
  try {
    const result = await handleWaitlistSubmission(req.body);
    res.status(result.status).json(result.json);
  } catch {
    res.status(500).json({ error: 'Unexpected error while saving email.' });
  }
});

app.post('/api/pricing-suggestion', (req, res) => {
  try {
    const { followers, engagement, niche } = req.body ?? {};
    const suggestion = suggestPricing({ followers, engagement, niche });
    res.json({ ok: true, suggestion });
  } catch {
    res.status(500).json({ error: 'Unexpected error while generating suggestion.' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body ?? {};
    const result = await signup({ email, password, role });
    if (!result.ok) return res.status(result.status).json({ ok: false, error: result.error });
    return res.status(result.status).json({ ok: true, token: result.token, user: result.user });
  } catch {
    return res.status(500).json({ ok: false, error: 'Unexpected error during signup.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = req.body ?? {};
    const result = await login({ identifier, password });
    if (!result.ok) return res.status(result.status).json({ ok: false, error: result.error });
    return res.status(200).json({ ok: true, token: result.token, user: result.user });
  } catch {
    return res.status(500).json({ ok: false, error: 'Unexpected error during login.' });
  }
});

app.get('/api/auth/me', (req, res) => {
  const auth = requireAuth(req);
  if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });
  return res.json({ ok: true, user: { id: auth.auth.sub, email: auth.auth.email, role: auth.auth.role } });
});

const port = Number(process.env.PORT || 4001);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}`);
});
