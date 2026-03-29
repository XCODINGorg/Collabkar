import express from 'express';
import {
  generateInfluencerVerifyCode,
  submitInstagramProfile,
  verifyInfluencer,
} from '../controllers/influencerController.js';

const router = express.Router();

// POST /api/influencer
router.post('/', submitInstagramProfile);

// GET /api/influencer/verify-code?username=...
router.get('/verify-code', generateInfluencerVerifyCode);

// POST /api/influencer/verify
router.post('/verify', verifyInfluencer);

export default router;

