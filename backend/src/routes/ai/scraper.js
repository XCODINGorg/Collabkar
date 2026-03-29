// AI INTEGRATION LAYER - new file
import express from 'express';

const router = express.Router();

router.post('/queue', (req, res) => {
  const { usernames } = req.body;
  if (!Array.isArray(usernames)) {
    return res.status(400).json({ error: 'usernames must be an array' });
  }

  return res.status(501).json({
    ok: false,
    error: 'Scraper queue is unavailable in this repository snapshot.',
    detail: 'The previous Celery-based ai-service scraper is not checked in.',
    queued: usernames.length,
  });
});

router.get('/status', (req, res) => {
  return res.status(501).json({
    ok: false,
    error: 'Scraper worker is unavailable in local heuristic mode.',
    detail: 'No ai-service worker process is included in the repo.',
  });
});

export default router;
