function toNumber(value) {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return NaN;
  return Number(value);
}

export function suggestPricing({ followers, engagement, niche }) {
  const followerCount = Math.max(0, Math.floor(toNumber(followers) || 0));
  const engagementRate = Math.max(0, toNumber(engagement) || 0);
  const nicheKey = typeof niche === 'string' ? niche.trim().toLowerCase() : '';

  const baseMultiplier = Math.min(followerCount / 10000, 5);
  const engagementMultiplier = engagementRate / 2;
  const nicheMultiplier =
    nicheKey === 'tech' ? 1.2 : nicheKey === 'lifestyle' ? 1.1 : 1;

  const reelPrice = Math.round(
    (500 + baseMultiplier * 200 + engagementMultiplier * 100) * nicheMultiplier
  );
  const storyPrice = Math.round(reelPrice * 0.7);
  const postPrice = Math.round(reelPrice * 1.2);

  return {
    reel: reelPrice,
    story: storyPrice,
    post: postPrice,
    range: `${Math.round(reelPrice * 0.8)} - ${Math.round(reelPrice * 1.2)}`,
  };
}

