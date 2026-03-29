// AI INTEGRATION LAYER - new file
import express from 'express';
const router = express.Router();
import * as aiCache from '../../services/ai/aiCache.js';
import { analyzeCreator } from '../../services/ai/localAiService.js';
import { pythonAiBridge } from '../../services/ai/pythonAiBridge.js';

// POST /api/ai/analyze
// Body: { username, followers, avg_likes, avg_comments, captions[], hashtags[], post_frequency, location }
router.post('/', async (req, res) => {
  try {
    const cacheKey = `ai:analyze:${req.body.username}`;
    const cached = await aiCache.get(cacheKey);
    if (cached) return res.json({ ...cached, cached: true });
    let result;
    try {
      result = await pythonAiBridge.analyze(req.body);
    } catch {
      result = analyzeCreator(req.body);
    }
    await aiCache.set(cacheKey, result, 3600);
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: 'AI analysis failed', detail: err.message, fallback: true });
  }
});

// GET /api/ai/analyze/:username
router.get('/:username', async (req, res) => {
  try {
    const cacheKey = `ai:analyze:${req.params.username}`;
    const cached = await aiCache.get(cacheKey);
    if (cached) return res.json({ ...cached, cached: true });
    let result;
    try {
      result = await pythonAiBridge.analyze({ username: req.params.username });
    } catch {
      result = analyzeCreator({ username: req.params.username });
    }
    await aiCache.set(cacheKey, result, 3600);
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: 'AI analysis failed', detail: err.message });
  }
});

export default router;
