export const prizeLevels = [
  // Stage 1 — Office Lore (6 questions)
  100, 200, 300, 500, 750, 1000,
  // Stage 2 — Team Trivia (12 questions)
  1500, 2500, 3500, 5000, 7500, 10000, 15000, 25000, 40000, 60000, 85000,
  120000,
  // Stage 3 — Final Stage (18 questions)
  160000, 200000, 250000, 300000, 380000, 460000, 540000, 620000, 700000,
  780000, 840000, 890000, 930000, 960000, 980000, 992000, 998000,
  1000000,
];

// Indices that are safe checkpoints (0-based indices of prizeLevels).
// End of Stage 1 (index 5), Stage 2 (index 17), and grand prize (index 35).
export const checkpointIndices = [5, 17, 35];

export function formatMoney(amount) {
  return `$${amount.toLocaleString('en-US')}`;
}

/**
 * Given the index of the question the player was answering when they lost,
 * return the guaranteed fallback winnings.
 *
 * questionIndex is the index of the question currently being attempted.
 * If the player gets question i wrong, they've successfully answered i-1,
 * meaning they are "on" level i. Their fallback is the highest checkpoint
 * strictly below i.
 */
export function getFallbackWinnings(questionIndex) {
  let fallback = 0;
  for (const cp of checkpointIndices) {
    if (cp < questionIndex) {
      fallback = prizeLevels[cp];
    }
  }
  return fallback;
}

/**
 * Winnings after correctly answering questionIndex.
 */
export function getWinningsAfterCorrect(questionIndex) {
  return prizeLevels[questionIndex] ?? 0;
}

export function isCheckpoint(index) {
  return checkpointIndices.includes(index);
}
