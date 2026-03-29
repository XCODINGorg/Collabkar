// AI INTEGRATION LAYER - new file
import express from 'express';
const router = express.Router();
import { matchCreators } from '../../services/ai/localAiService.js';
import { pythonAiBridge } from '../../services/ai/pythonAiBridge.js';

// POST /api/ai/match
// Body: { campaign_description, target_niche, target_location?, budget_min, budget_max, min_engagement_rate?, min_followers? }
router.post('/', async (req, res) => {
  try {
    let result;
    try {
      result = await pythonAiBridge.match(req.body);
    } catch {
      result = matchCreators(req.body);
    }
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: 'Matching service unavailable', detail: err.message });
  }
});

export default router;
