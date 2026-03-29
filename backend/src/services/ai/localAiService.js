import { suggestPricing } from '../../pricing.js';
import {
  calculateEngagementRate,
  calculatePostFrequency,
} from '../../utils/calculateMetrics.js';
import { detectNicheFromBio } from '../../utils/nicheDetector.js';

function toNumber(value, fallback = 0) {
  const parsed = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeNiche(value) {
  const niche = normalizeText(value).toLowerCase();
  return niche || 'general';
}

function inferNiche(payload) {
  const explicit = normalizeNiche(payload.niche);
  if (explicit !== 'general') return explicit;

  const text = [
    normalizeText(payload.bio),
    ...(Array.isArray(payload.captions) ? payload.captions : []),
    ...(Array.isArray(payload.hashtags) ? payload.hashtags : []),
    normalizeText(payload.campaign_description),
  ]
    .filter(Boolean)
    .join(' ');

  return detectNicheFromBio(text);
}

function buildFakeDetection({ followers, engagementRate, avgComments }) {
  const commentRate = followers > 0 ? (avgComments / followers) * 100 : 0;
  let score = 0.15;

  if (engagementRate < 0.8) score += 0.35;
  else if (engagementRate < 1.5) score += 0.2;
  else if (engagementRate > 12) score += 0.18;

  if (commentRate < 0.03) score += 0.18;
  if (followers >= 100000 && engagementRate < 1.2) score += 0.12;

  const fakeProbability = Math.max(0.02, Math.min(0.95, Number(score.toFixed(4))));

  return {
    is_fake: fakeProbability >= 0.55,
    confidence: fakeProbability >= 0.55 ? fakeProbability : Number((1 - fakeProbability).toFixed(4)),
    fake_probability: fakeProbability,
    authentic_probability: Number((1 - fakeProbability).toFixed(4)),
  };
}

export function predictPrice(payload = {}) {
  const followers = Math.max(0, Math.floor(toNumber(payload.followers)));
  const avgLikes = Math.max(0, Math.floor(toNumber(payload.avg_likes ?? payload.avgLikes)));
  const avgComments = Math.max(0, Math.floor(toNumber(payload.avg_comments ?? payload.avgComments)));
  const engagementRateInput = toNumber(payload.engagement_rate ?? payload.engagement);
  const postFrequencyInput = toNumber(payload.post_frequency ?? payload.postFrequency);
  const niche = inferNiche(payload);

  const engagementRate =
    engagementRateInput > 0
      ? engagementRateInput
      : calculateEngagementRate({ followers, avgLikes, avgComments });
  const postFrequency =
    postFrequencyInput > 0
      ? postFrequencyInput
      : calculatePostFrequency({
          recentPosts: Math.max(0, Math.round(toNumber(payload.recent_posts ?? payload.recentPosts, 12))),
          days: 30,
        });

  const suggestion = suggestPricing({
    followers,
    engagement: engagementRate,
    niche,
  });

  const frequencyMultiplier = postFrequency > 20 ? 1.08 : postFrequency > 8 ? 1.03 : 1;
  const calibrated = {
    reel: Math.round(suggestion.reel * frequencyMultiplier),
    story: Math.round(suggestion.story * frequencyMultiplier),
    post: Math.round(suggestion.post * frequencyMultiplier),
  };

  return {
    ok: true,
    model: 'local-heuristic-v1',
    input: {
      followers,
      avg_likes: avgLikes,
      avg_comments: avgComments,
      engagement_rate: Number(engagementRate.toFixed(4)),
      post_frequency: Number(postFrequency.toFixed(4)),
      niche,
    },
    predicted_price: calibrated.post,
    pricing: {
      ...calibrated,
      range: `${Math.round(calibrated.post * 0.85)} - ${Math.round(calibrated.post * 1.15)}`,
      currency: 'INR',
    },
  };
}

export function analyzeCreator(payload = {}) {
  const username = normalizeText(payload.username) || 'unknown';
  const followers = Math.max(0, Math.floor(toNumber(payload.followers)));
  const avgLikes = Math.max(0, Math.floor(toNumber(payload.avg_likes ?? payload.avgLikes)));
  const avgComments = Math.max(0, Math.floor(toNumber(payload.avg_comments ?? payload.avgComments)));
  const engagementRate =
    toNumber(payload.engagement_rate) > 0
      ? toNumber(payload.engagement_rate)
      : calculateEngagementRate({ followers, avgLikes, avgComments });
  const postFrequency =
    toNumber(payload.post_frequency) > 0
      ? toNumber(payload.post_frequency)
      : calculatePostFrequency({
          recentPosts: Math.max(0, Math.round(toNumber(payload.recent_posts ?? payload.recentPosts, 12))),
          days: 30,
        });
  const niche = inferNiche(payload);
  const pricing = predictPrice({
    followers,
    avg_likes: avgLikes,
    avg_comments: avgComments,
    engagement_rate: engagementRate,
    post_frequency: postFrequency,
    niche,
  });
  const fakeDetection = buildFakeDetection({
    followers,
    engagementRate,
    avgComments,
  });

  return {
    ok: true,
    model: 'local-heuristic-v1',
    username,
    profile: {
      followers,
      avg_likes: avgLikes,
      avg_comments: avgComments,
      engagement_rate: Number(engagementRate.toFixed(4)),
      post_frequency: Number(postFrequency.toFixed(4)),
      niche,
      location: normalizeText(payload.location) || null,
    },
    price_prediction: pricing.pricing,
    niche_prediction: {
      niche,
      confidence: niche === 'general' ? 0.42 : 0.74,
    },
    fake_detection: fakeDetection,
    insights: [
      engagementRate >= 3 ? 'Strong engagement for the current audience size.' : 'Engagement is on the softer side for sponsored pricing.',
      postFrequency >= 8 ? 'Posting cadence suggests an active creator.' : 'Posting cadence is relatively light, so campaign consistency may vary.',
      fakeDetection.is_fake ? 'Profile should be reviewed manually before approving a campaign.' : 'No major authenticity red flags detected from the submitted metrics.',
    ],
    source: 'backend-local-ai',
  };
}

export function matchCreators(payload = {}) {
  const creators = Array.isArray(payload.creators) ? payload.creators : [];
  const targetNiche = normalizeNiche(payload.target_niche);
  const targetLocation = normalizeText(payload.target_location).toLowerCase();
  const budgetMin = Math.max(0, toNumber(payload.budget_min));
  const budgetMax = Math.max(budgetMin, toNumber(payload.budget_max, budgetMin));
  const minEngagementRate = Math.max(0, toNumber(payload.min_engagement_rate));
  const minFollowers = Math.max(0, Math.floor(toNumber(payload.min_followers)));

  const matches = creators
    .map((creator) => {
      const analysis = analyzeCreator(creator);
      const nicheScore = targetNiche === 'general' || analysis.profile.niche === targetNiche ? 40 : 10;
      const locationScore =
        !targetLocation || normalizeText(analysis.profile.location).toLowerCase() === targetLocation ? 20 : 8;
      const engagementScore = Math.min(25, analysis.profile.engagement_rate * 4);
      const audienceScore = analysis.profile.followers >= minFollowers ? 15 : 5;
      const estimatedPrice = analysis.price_prediction.post;
      const withinBudget = estimatedPrice >= budgetMin && estimatedPrice <= budgetMax;
      const meetsEngagement = analysis.profile.engagement_rate >= minEngagementRate;
      const matchScore = Math.round(nicheScore + locationScore + engagementScore + audienceScore);

      return {
        username: analysis.username,
        score: matchScore,
        within_budget: withinBudget,
        meets_min_engagement: meetsEngagement,
        estimated_price: estimatedPrice,
        niche: analysis.profile.niche,
        location: analysis.profile.location,
        followers: analysis.profile.followers,
        engagement_rate: analysis.profile.engagement_rate,
      };
    })
    .filter((creator) => creator.within_budget && creator.meets_min_engagement)
    .sort((a, b) => b.score - a.score);

  return {
    ok: true,
    model: 'local-heuristic-v1',
    target: {
      target_niche: targetNiche,
      target_location: targetLocation || null,
      budget_min: budgetMin,
      budget_max: budgetMax,
      min_engagement_rate: minEngagementRate,
      min_followers: minFollowers,
    },
    matches,
  };
}

export function getLocalAiHealth() {
  return {
    status: 'ok',
    mode: 'backend-local-ai',
    python_dependency: 'optional',
    model: 'local-heuristic-v1',
  };
}
