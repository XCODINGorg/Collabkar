// Basic analytics derived from user-provided stats.

export function calculateEngagementRate({ followers, avgLikes, avgComments }) {
  const safeFollowers = Number.isFinite(followers) ? followers : 0;
  const safeLikes = Number.isFinite(avgLikes) ? avgLikes : 0;
  const safeComments = Number.isFinite(avgComments) ? avgComments : 0;

  if (safeFollowers <= 0) return 0;
  return ((safeLikes + safeComments) / safeFollowers) * 100;
}

export function calculatePostFrequency({ recentPosts, days = 30 }) {
  const safeRecentPosts = Number.isFinite(recentPosts) ? recentPosts : 0;
  const safeDays = Number.isFinite(days) && days > 0 ? days : 30;
  if (safeRecentPosts <= 0) return 0;
  return safeRecentPosts / safeDays;
}

export function calculateRiskLevel({ engagementRate }) {
  const rate = Number.isFinite(engagementRate) ? engagementRate : 0;
  if (rate < 1) return 'high';
  if (rate <= 3) return 'medium';
  return 'low';
}

