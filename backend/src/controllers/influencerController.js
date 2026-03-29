import crypto from 'node:crypto';
import mongoose from 'mongoose';
import { Influencer } from '../models/Influencer.js';
import {
  calculateEngagementRate,
  calculatePostFrequency,
  calculateRiskLevel,
} from '../utils/calculateMetrics.js';
import { detectNicheFromBio } from '../utils/nicheDetector.js';

const USERNAME_REGEX = /^[a-zA-Z0-9._]{1,30}$/;

function requireMongoConnected() {
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  return mongoose.connection.readyState === 1;
}

function normalizeUsername(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function parseNonNegativeNumber(value) {
  const num = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;
  if (!Number.isFinite(num)) return null;
  if (num < 0) return null;
  return num;
}

function generateVerificationCode() {
  // Short, human-copyable code that can be placed in a bio.
  const token = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `VERIFY-${token}`;
}

export async function submitInstagramProfile(req, res) {
  if (!requireMongoConnected()) {
    return res.status(503).json({ ok: false, error: 'MongoDB is not connected.' });
  }

  const body = req.body ?? {};
  const username = normalizeUsername(body.username);
  const followers = parseNonNegativeNumber(body.followers);
  const avgLikes = parseNonNegativeNumber(body.avgLikes);
  const avgComments = parseNonNegativeNumber(body.avgComments);
  const recentPosts = parseNonNegativeNumber(body.recentPosts);
  const bio = typeof body.bio === 'string' ? body.bio.trim() : '';
  const location = typeof body.location === 'string' ? body.location.trim() : '';

  if (!username || !USERNAME_REGEX.test(username)) {
    return res.status(400).json({
      ok: false,
      error: 'Invalid username. Use 1-30 characters: letters, numbers, dots, underscores.',
    });
  }

  if (followers === null || avgLikes === null || avgComments === null || recentPosts === null) {
    return res.status(400).json({
      ok: false,
      error: 'followers, avgLikes, avgComments, and recentPosts must be non-negative numbers.',
    });
  }

  if (!bio) {
    return res.status(400).json({ ok: false, error: 'bio is required.' });
  }

  if (bio.length > 1000) {
    return res.status(400).json({ ok: false, error: 'bio must be 1000 characters or fewer.' });
  }

  if (location && location.length > 120) {
    return res.status(400).json({ ok: false, error: 'location must be 120 characters or fewer.' });
  }

  // Metrics are derived only from manual inputs (no scraping / no paid APIs).
  const engagementRate = calculateEngagementRate({ followers, avgLikes, avgComments });
  const postFrequency = calculatePostFrequency({ recentPosts, days: 30 });
  const niche = detectNicheFromBio(bio);
  const riskLevel = calculateRiskLevel({ engagementRate });

  try {
    const existing = await Influencer.findOne({ username }).lean();
    if (!existing) {
      const created = await Influencer.create({
        username,
        followers,
        avgLikes,
        avgComments,
        engagementRate,
        postFrequency,
        niche,
        location,
        riskLevel,
        verificationCode: '',
        isVerified: false,
      });

      return res.status(201).json({ ok: true, influencer: created });
    }

    const updated = await Influencer.findOneAndUpdate(
      { username },
      {
        $set: {
          followers,
          avgLikes,
          avgComments,
          engagementRate,
          postFrequency,
          niche,
          location,
          riskLevel,
        },
      },
      { new: true }
    );

    return res.status(200).json({ ok: true, influencer: updated });
  } catch (error) {
    // Duplicate key, validation errors, etc.
    return res.status(500).json({ ok: false, error: 'Failed to save influencer profile.' });
  }
}

export async function generateInfluencerVerifyCode(req, res) {
  if (!requireMongoConnected()) {
    return res.status(503).json({ ok: false, error: 'MongoDB is not connected.' });
  }

  const username = normalizeUsername(req.query?.username);
  if (!username || !USERNAME_REGEX.test(username)) {
    return res.status(400).json({
      ok: false,
      error: 'username query param is required (1-30 chars: letters, numbers, dots, underscores).',
    });
  }

  try {
    const influencer = await Influencer.findOne({ username });
    if (!influencer) {
      return res.status(404).json({
        ok: false,
        error: 'Influencer not found. Submit the profile first via POST /api/influencer.',
      });
    }

    const verificationCode = generateVerificationCode();
    influencer.verificationCode = verificationCode;
    influencer.isVerified = false; // generating a new code invalidates any previous verification
    await influencer.save();

    return res.json({
      ok: true,
      username: influencer.username,
      verificationCode,
      instructions: 'Add this code to your Instagram bio, then call POST /api/influencer/verify.',
    });
  } catch {
    return res.status(500).json({ ok: false, error: 'Failed to generate verification code.' });
  }
}

export async function verifyInfluencer(req, res) {
  if (!requireMongoConnected()) {
    return res.status(503).json({ ok: false, error: 'MongoDB is not connected.' });
  }

  const body = req.body ?? {};
  const username = normalizeUsername(body.username);
  const code = typeof body.code === 'string' ? body.code.trim() : '';

  if (!username || !USERNAME_REGEX.test(username)) {
    return res.status(400).json({ ok: false, error: 'Invalid username.' });
  }
  if (!code) {
    return res.status(400).json({ ok: false, error: 'code is required.' });
  }

  try {
    const influencer = await Influencer.findOne({ username });
    if (!influencer) return res.status(404).json({ ok: false, error: 'Influencer not found.' });

    // No scraping: user provides the code they placed in their bio.
    if (!influencer.verificationCode || influencer.verificationCode !== code) {
      return res.status(400).json({ ok: false, error: 'Verification code does not match.' });
    }

    influencer.isVerified = true;
    await influencer.save();
    return res.json({ ok: true, influencer });
  } catch {
    return res.status(500).json({ ok: false, error: 'Failed to verify influencer.' });
  }
}

