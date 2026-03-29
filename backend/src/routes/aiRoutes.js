import express from 'express';
import { postJsonToAi, toHttpError } from '../aiClient.js';

const router = express.Router();

// All routes proxy to the internal FastAPI service.
router.post('/analyze-creator', async (req, res) => {
  try {
    const data = await postJsonToAi('/analyze-creator', req.body);
    return res.json({ ok: true, data });
  } catch (error) {
    const httpError = toHttpError(error);
    return res.status(httpError.status).json(httpError.json);
  }
});

router.post('/predict-price', async (req, res) => {
  try {
    const data = await postJsonToAi('/predict-price', req.body);
    return res.json({ ok: true, data });
  } catch (error) {
    const httpError = toHttpError(error);
    return res.status(httpError.status).json(httpError.json);
  }
});

router.post('/match-creators', async (req, res) => {
  try {
    const data = await postJsonToAi('/match-creators', req.body);
    return res.json({ ok: true, data });
  } catch (error) {
    const httpError = toHttpError(error);
    return res.status(httpError.status).json(httpError.json);
  }
});

router.post('/detect-fake', async (req, res) => {
  try {
    const data = await postJsonToAi('/detect-fake', req.body);
    return res.json({ ok: true, data });
  } catch (error) {
    const httpError = toHttpError(error);
    return res.status(httpError.status).json(httpError.json);
  }
});

export default router;
