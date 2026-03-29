import express from 'express';
import { pythonAiBridge } from '../../services/ai/pythonAiBridge.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const result = await pythonAiBridge.dashboard();
    res.json(result);
  } catch (error) {
    res.status(502).json({ ok: false, error: 'Dashboard generation failed', detail: error.message });
  }
});

export default router;
