// AI INTEGRATION LAYER - new file
import express from 'express';
const router = express.Router();
import { getLocalAiHealth } from '../../services/ai/localAiService.js';
import { pythonAiBridge } from '../../services/ai/pythonAiBridge.js';

router.get('/', async (req, res) => {
  try {
    let result;
    try {
      result = await pythonAiBridge.health();
    } catch {
      result = getLocalAiHealth();
    }
    res.json({
      express: 'ok',
      ai_service: result.status,
      mode: result.mode,
      python: result.python,
      artifacts_ready: result.artifacts_ready,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(503).json({ express: 'ok', ai_service: 'unreachable', error: err.message });
  }
});

export default router;
