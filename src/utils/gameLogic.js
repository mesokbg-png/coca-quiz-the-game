import { prizeLevels, getFallbackWinnings, getWinningsAfterCorrect } from './prizeLogic.js';

export const GAME_STATUS = {
  IDLE: 'idle',
  PLAYING: 'playing',
  REVEAL: 'reveal',
  STAGE_TRANSITION: 'stageTransition',
  GAME_OVER: 'gameOver',
  WON: 'won',
};

export function isAnswerCorrect(question, answer) {
  return question.correctAnswer === answer;
}

export function isLastQuestion(questionIndex, totalQuestions) {
  const ladderMax = prizeLevels.length;
  return questionIndex >= Math.min(totalQuestions, ladderMax) - 1;
}

export function computeLoss(questionIndex) {
  return getFallbackWinnings(questionIndex);
}

export function computeWinAfter(questionIndex) {
  return getWinningsAfterCorrect(questionIndex);
}
