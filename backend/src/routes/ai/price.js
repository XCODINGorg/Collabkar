// AI INTEGRATION LAYER - new file
import express from 'express';
const router = express.Router();
import * as aiCache from '../../services/ai/aiCache.js';
import { predictPrice } from '../../services/ai/localAiService.js';
import { pythonAiBridge } from '../../services/ai/pythonAiBridge.js';

// POST /api/ai/price
// Body: { followers, engagement_rate, post_frequency, niche }
router.post('/', async (req, res) => {
  try {
    const key = `ai:price:${req.body.followers}:${req.body.niche}:${Math.round((req.body.engagement_rate||0)*1000)}`;
    const cached = await aiCache.get(key);
    if (cached) return res.json({ ...cached, cached: true });
    let result;
    try {
      result = await pythonAiBridge.price(req.body);
    } catch {
      result = predictPrice(req.body);
    }
    await aiCache.set(key, result, 7200);
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: 'Price prediction failed', detail: err.message });
  }
});

export default router;
