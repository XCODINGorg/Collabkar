// Very lightweight niche detection based on keywords in the bio.

const NICHE_KEYWORDS = {
  fitness: ['gym', 'fitness', 'workout', 'trainer'],
  tech: ['tech', 'coding', 'developer', 'ai'],
  fashion: ['fashion', 'style', 'outfit', 'model'],
  food: ['food', 'recipe', 'chef', 'cooking'],
};

export function detectNicheFromBio(bio) {
  const text = typeof bio === 'string' ? bio.toLowerCase() : '';
  if (!text) return 'general';

  for (const [niche, keywords] of Object.entries(NICHE_KEYWORDS)) {
    const match = keywords.some((keyword) => text.includes(keyword));
    if (match) return niche;
  }

  return 'general';
}

