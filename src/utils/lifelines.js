/**
 * 50:50 — returns two answer strings to remove. Always keeps the correct one.
 */
export function fiftyFifty(question) {
  const wrong = question.answers.filter((a) => a !== question.correctAnswer);
  // shuffle wrong
  const shuffled = [...wrong].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
}

/**
 * Ask the Audience — returns { answer: percentage } mapping.
 * Correct answer gets a boost that shrinks as difficulty grows.
 */
export function askAudience(question) {
  const difficulty = question.difficulty ?? 1;
  const correctBase = Math.max(30, 85 - (difficulty - 1) * 10); // 85,75,65,55,45 min 30
  const correctPct = correctBase + Math.floor(Math.random() * 10);

  const wrongAnswers = question.answers.filter((a) => a !== question.correctAnswer);
  // distribute remainder among wrong answers with randomness
  let remaining = 100 - correctPct;
  const weights = wrongAnswers.map(() => Math.random() + 0.1);
  const totalWeight = weights.reduce((s, w) => s + w, 0);
  const wrongPcts = weights.map((w) => Math.round((w / totalWeight) * remaining));
  // fix rounding drift
  const drift = remaining - wrongPcts.reduce((s, v) => s + v, 0);
  if (wrongPcts.length > 0) wrongPcts[0] += drift;

  const result = {};
  result[question.correctAnswer] = correctPct;
  wrongAnswers.forEach((a, i) => {
    result[a] = wrongPcts[i];
  });
  return result;
}

/**
 * Phone a Friend (Call Ivo) — Ivo never actually helps. Returns one of
 * several dismissive messages, purely for comedy. No answer is revealed.
 */
export function phoneFriend(question) {
  const messages = [
    'Bro i dont know, ask DevOps Team.',
    'Why you ask me i didnt code this.',
    'Oh im home office will answer you tomorrow.',
    'My piece of shit copilot dont load i cant answer you cya.',
    'Oh im in 1st toilet cant answer you now.',
    'Im busy at the moment, im eating. You do you.',
  ];
  const message = messages[Math.floor(Math.random() * messages.length)];

  return {
    answer: null,
    message,
  };
}
