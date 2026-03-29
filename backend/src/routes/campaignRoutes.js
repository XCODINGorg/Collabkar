import express from 'express';
import mongoose from 'mongoose';
import { requireAuth, getUserById } from '../auth.js';
import { Campaign } from '../models/Campaign.js';

const router = express.Router();

function mongoReady() {
  return mongoose.connection.readyState === 1;
}

function normalizeText(value, max = 240) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function normalizeNumber(value) {
  const parsed = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeDeliverables(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => normalizeText(item, 80)).filter(Boolean).slice(0, 10);
}

router.get('/mine', async (req, res) => {
  try {
    const auth = requireAuth(req);
    if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });
    if (!mongoReady()) return res.status(503).json({ ok: false, error: 'MongoDB is not connected.' });

    const campaigns = await Campaign.find({ ownerId: auth.auth.sub }).sort({ updatedAt: -1 }).lean();
    return res.json({ ok: true, campaigns });
  } catch {
    return res.status(500).json({ ok: false, error: 'Unexpected error while loading campaigns.' });
  }
});

router.get('/active', async (_req, res) => {
  try {
    if (!mongoReady()) return res.status(503).json({ ok: false, error: 'MongoDB is not connected.' });
    const campaigns = await Campaign.find({ status: 'active' }).sort({ updatedAt: -1 }).limit(20).lean();
    return res.json({ ok: true, campaigns });
  } catch {
    return res.status(500).json({ ok: false, error: 'Unexpected error while loading campaigns.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const auth = requireAuth(req);
    if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });
    if (auth.auth.role !== 'brand' && auth.auth.role !== 'admin') {
      return res.status(403).json({ ok: false, error: 'Only brand accounts can create campaigns.' });
    }
    if (!mongoReady()) return res.status(503).json({ ok: false, error: 'MongoDB is not connected.' });

    const title = normalizeText(req.body?.title, 120);
    const description = normalizeText(req.body?.description, 1000);
    if (!title || !description) {
      return res.status(400).json({ ok: false, error: 'title and description are required.' });
    }

    const user = await getUserById(auth.auth.sub);
    const now = new Date().toISOString();
    const campaign = await Campaign.create({
      ownerId: auth.auth.sub,
      ownerEmail: user?.email || '',
      ownerName: user?.profile?.companyName || user?.profile?.displayName || user?.email || 'Brand',
      title,
      description,
      targetNiche: normalizeText(req.body?.targetNiche, 80),
      targetLocation: normalizeText(req.body?.targetLocation, 120),
      budgetMin: Math.max(0, normalizeNumber(req.body?.budgetMin)),
      budgetMax: Math.max(0, normalizeNumber(req.body?.budgetMax)),
      deliverables: normalizeDeliverables(req.body?.deliverables),
      status: normalizeText(req.body?.status, 20) || 'draft',
      createdAt: now,
      updatedAt: now,
    });

    return res.status(201).json({ ok: true, campaign });
  } catch {
    return res.status(500).json({ ok: false, error: 'Unexpected error while creating campaign.' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const auth = requireAuth(req);
    if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });
    if (!mongoReady()) return res.status(503).json({ ok: false, error: 'MongoDB is not connected.' });

    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ ok: false, error: 'Campaign not found.' });
    if (campaign.ownerId !== auth.auth.sub && auth.auth.role !== 'admin') {
      return res.status(403).json({ ok: false, error: 'Not allowed to update this campaign.' });
    }

    if (req.body?.title !== undefined) campaign.title = normalizeText(req.body.title, 120);
    if (req.body?.description !== undefined) campaign.description = normalizeText(req.body.description, 1000);
    if (req.body?.targetNiche !== undefined) campaign.targetNiche = normalizeText(req.body.targetNiche, 80);
    if (req.body?.targetLocation !== undefined) campaign.targetLocation = normalizeText(req.body.targetLocation, 120);
    if (req.body?.budgetMin !== undefined) campaign.budgetMin = Math.max(0, normalizeNumber(req.body.budgetMin));
    if (req.body?.budgetMax !== undefined) campaign.budgetMax = Math.max(0, normalizeNumber(req.body.budgetMax));
    if (req.body?.deliverables !== undefined) campaign.deliverables = normalizeDeliverables(req.body.deliverables);
    if (req.body?.status !== undefined) campaign.status = normalizeText(req.body.status, 20) || campaign.status;
    campaign.updatedAt = new Date().toISOString();

    await campaign.save();
    return res.json({ ok: true, campaign });
  } catch {
    return res.status(500).json({ ok: false, error: 'Unexpected error while updating campaign.' });
  }
});

export default router;
