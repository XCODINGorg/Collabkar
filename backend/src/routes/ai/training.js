// AI INTEGRATION LAYER - new file
import express from 'express';
import { pythonAiBridge } from '../../services/ai/pythonAiBridge.js';

const router = express.Router();

router.post('/build-dataset', (req, res) => {
  res.status(501).json({
    ok: false,
    error: 'Dataset build is disabled in local heuristic mode.',
    detail: 'The old ai-service training pipeline is not present in this repository.',
  });
});

router.post('/train', (req, res) => {
  pythonAiBridge
    .train()
    .then((result) => res.json(result))
    .catch((error) =>
      res.status(502).json({
        ok: false,
        error: 'Training failed',
        detail: error.message,
      })
    );
});

router.post('/retrain', (req, res) => {
  res.status(501).json({
    ok: false,
    error: 'Retraining is disabled in local heuristic mode.',
    detail: 'No checked-in ai-service retraining pipeline is available in this repo.',
  });
});

export default router;
