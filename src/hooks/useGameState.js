import { useCallback, useMemo, useState } from 'react';
import questionsData from '../data/questions.json';
import {
  GAME_STATUS,
  computeLoss,
  computeWinAfter,
  isAnswerCorrect,
} from '../utils/gameLogic.js';

const INITIAL_LIFELINES = {
  fiftyFifty: false,
  askAudience: false,
  phoneFriend: false,
  rerollQuestion: false,
};

const INITIAL_LIVES = 3;

// Stage definitions: each stage uses a single pool, in pool order.
const STAGES = [
  { stage: 1, pool: 1, label: 'Office Lore', questionCount: 6 },
  { stage: 2, pool: 2, label: 'Team Trivia', questionCount: 12 },
  { stage: 3, pool: 3, label: 'Final Stage', questionCount: 18 },
];

function poolOf(q) {
  if (!q) return 1;
  if (q.pool != null) return q.pool;
  if (q.difficulty <= 2) return 1;
  if (q.difficulty <= 3) return 2;
  return 3;
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function shuffleQuestionAnswers(question) {
  return {
    ...question,
    answers: shuffle(question.answers),
  };
}

function pickRandom(arr) {
  if (!arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Return all questions for a given pool, shuffled. If a question is marked
 * isFinalQuestion it is moved to the end of the list.
 */
function pickStageQuestions(all, pool, count) {
  const inPool = all.filter((q) => poolOf(q) === pool);
  const shuffled = shuffle(inPool).map(shuffleQuestionAnswers);
  const finalQ = shuffled.find((q) => q.isFinalQuestion);
  const rest = shuffled.filter((q) => !q.isFinalQuestion);
  const ordered = finalQ ? [...rest, finalQ] : rest;
  return ordered.slice(0, count);
}

function getStagePool(all, pool) {
  return shuffle(all.filter((q) => poolOf(q) === pool));
}

function buildStages(allQuestions) {
  return STAGES.map((s) => ({
    ...s,
    poolQuestions: getStagePool(allQuestions, s.pool),
    questions: pickStageQuestions(allQuestions, s.pool, s.questionCount),
  }));
}

function offsetForStage(stages, stageIndex) {
  let offset = 0;
  for (let i = 0; i < stageIndex; i++) offset += stages[i].questions.length;
  return offset;
}

export function useGameState() {
  const [stages, setStages] = useState(() => buildStages(questionsData));
  const [stageIndex, setStageIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentWinnings, setCurrentWinnings] = useState(0);
  const [livesRemaining, setLivesRemaining] = useState(INITIAL_LIVES);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.IDLE);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lockedAnswer, setLockedAnswer] = useState(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [usedLifelines, setUsedLifelines] = useState(INITIAL_LIFELINES);
  const [removedAnswers, setRemovedAnswers] = useState([]);
  const [audiencePercents, setAudiencePercents] = useState(null);
  const [phoneHint, setPhoneHint] = useState(null);
  const [servedQuestionIdsByStage, setServedQuestionIdsByStage] = useState(() =>
    buildStages(questionsData).map((stage) =>
      stage.questions[0] ? [stage.questions[0].id] : []
    )
  );

  const currentStage = stages[stageIndex];
  const questions = currentStage?.questions ?? [];
  const currentQuestion = questions[currentQuestionIndex];

  // Global question index across all stages — used by prize logic so
  // money keeps escalating across stages.
  const globalQuestionIndex =
    offsetForStage(stages, stageIndex) + currentQuestionIndex;

  const isLastStage = stageIndex >= stages.length - 1;
  const isLastQuestionInStage = currentQuestionIndex >= questions.length - 1;

  const startGame = useCallback(() => {
    const nextStages = buildStages(questionsData);
    setStages(nextStages);
    setStageIndex(0);
    setCurrentQuestionIndex(0);
    setCurrentWinnings(0);
    setLivesRemaining(INITIAL_LIVES);
    setSelectedAnswer(null);
    setLockedAnswer(null);
    setLastAnswerCorrect(null);
    setUsedLifelines(INITIAL_LIFELINES);
    setRemovedAnswers([]);
    setAudiencePercents(null);
    setPhoneHint(null);
    setServedQuestionIdsByStage(
      nextStages.map((stage) => (stage.questions[0] ? [stage.questions[0].id] : []))
    );
    setGameStatus(GAME_STATUS.PLAYING);
  }, []);

  const selectAnswer = useCallback(
    (answer) => {
      if (gameStatus !== GAME_STATUS.PLAYING) return;
      if (lockedAnswer) return;
      setSelectedAnswer(answer);
    },
    [gameStatus, lockedAnswer]
  );

  const lockInAnswer = useCallback(
    (answerOverride) => {
      if (gameStatus !== GAME_STATUS.PLAYING) return;
      const answer = answerOverride ?? selectedAnswer;
      if (!answer) return;
      setLockedAnswer(answer);
      const correct = isAnswerCorrect(currentQuestion, answer);
      setLastAnswerCorrect(correct);
      setGameStatus(GAME_STATUS.REVEAL);
    },
    [gameStatus, selectedAnswer, currentQuestion]
  );

  const handleTimeout = useCallback(() => {
    if (gameStatus !== GAME_STATUS.PLAYING) return;
    setLockedAnswer('__TIMEOUT__');
    setLastAnswerCorrect(false);
    setGameStatus(GAME_STATUS.REVEAL);
  }, [gameStatus]);

  const resolveReveal = useCallback(() => {
    if (gameStatus !== GAME_STATUS.REVEAL) return;
    if (lastAnswerCorrect) {
      const winnings = computeWinAfter(globalQuestionIndex);
      setCurrentWinnings(winnings);

      if (isLastQuestionInStage) {
        if (isLastStage) {
          setGameStatus(GAME_STATUS.WON);
        } else {
          // Move to stage transition. Reset stage-local state but keep
          // winnings; lifelines reset per design.
          setGameStatus(GAME_STATUS.STAGE_TRANSITION);
        }
      } else {
        const nextIndex = currentQuestionIndex + 1;
        const nextQuestion = questions[nextIndex];
        setCurrentQuestionIndex(nextIndex);
        if (nextQuestion) {
          setServedQuestionIdsByStage((served) =>
            served.map((ids, idx) =>
              idx === stageIndex && !ids.includes(nextQuestion.id)
                ? [...ids, nextQuestion.id]
                : ids
            )
          );
        }
        setSelectedAnswer(null);
        setLockedAnswer(null);
        setLastAnswerCorrect(null);
        setRemovedAnswers([]);
        setAudiencePercents(null);
        setPhoneHint(null);
        setGameStatus(GAME_STATUS.PLAYING);
      }
    } else {
      const nextLives = livesRemaining - 1;
      setLivesRemaining(nextLives);

      if (nextLives <= 0) {
        const fallback = computeLoss(globalQuestionIndex);
        setCurrentWinnings(fallback);
        setGameStatus(GAME_STATUS.GAME_OVER);
      } else {
        const previousQuestionWinnings =
          globalQuestionIndex === 0 ? 0 : computeWinAfter(globalQuestionIndex - 1);

        setCurrentWinnings(previousQuestionWinnings);
        setSelectedAnswer(null);
        setLockedAnswer(null);
        setLastAnswerCorrect(null);
        setUsedLifelines(INITIAL_LIFELINES);
        setRemovedAnswers([]);
        setAudiencePercents(null);
        setPhoneHint(null);
        setGameStatus(GAME_STATUS.PLAYING);
      }
    }
  }, [
    gameStatus,
    lastAnswerCorrect,
    globalQuestionIndex,
    livesRemaining,
    currentQuestionIndex,
    questions,
    stageIndex,
    isLastQuestionInStage,
    isLastStage,
  ]);

  const continueToNextStage = useCallback(() => {
    if (gameStatus !== GAME_STATUS.STAGE_TRANSITION) return;
    const nextStageIdx = stageIndex + 1;
    const nextFirstQuestion = stages[nextStageIdx]?.questions?.[0];
    setStageIndex(nextStageIdx);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setLockedAnswer(null);
    setLastAnswerCorrect(null);
    setUsedLifelines(INITIAL_LIFELINES);
    setRemovedAnswers([]);
    setAudiencePercents(null);
    setPhoneHint(null);
    if (nextFirstQuestion) {
      setServedQuestionIdsByStage((served) =>
        served.map((ids, idx) =>
          idx === nextStageIdx && !ids.includes(nextFirstQuestion.id)
            ? [...ids, nextFirstQuestion.id]
            : ids
        )
      );
    }
    setGameStatus(GAME_STATUS.PLAYING);
  }, [gameStatus, stageIndex, stages]);

  const walkAway = useCallback(() => {
    if (gameStatus !== GAME_STATUS.PLAYING) return;
    const prev =
      globalQuestionIndex === 0 ? 0 : computeWinAfter(globalQuestionIndex - 1);
    setCurrentWinnings(prev);
    setGameStatus(GAME_STATUS.GAME_OVER);
  }, [gameStatus, globalQuestionIndex]);

  const useFiftyFifty = useCallback((removed) => {
    setUsedLifelines((u) => ({ ...u, fiftyFifty: true }));
    setRemovedAnswers(removed);
  }, []);

  const useAskAudience = useCallback((percents) => {
    setUsedLifelines((u) => ({ ...u, askAudience: true }));
    setAudiencePercents(percents);
  }, []);

  const usePhoneFriend = useCallback((hint) => {
    setUsedLifelines((u) => ({ ...u, phoneFriend: true }));
    setPhoneHint(hint);
  }, []);

  const rerollQuestion = useCallback(() => {
    if (gameStatus !== GAME_STATUS.PLAYING) return false;
    if (usedLifelines.rerollQuestion) return false;

    const servedIds = new Set(servedQuestionIdsByStage[stageIndex] ?? []);
    const selectedIds = new Set(questions.map((q) => q.id));
    const available = (currentStage?.poolQuestions ?? []).filter(
      (q) => !servedIds.has(q.id) && !selectedIds.has(q.id)
    );

    const replacement = pickRandom(available);
    if (!replacement) return false;

    const nextQuestion = shuffleQuestionAnswers(replacement);

    setStages((prevStages) =>
      prevStages.map((stage, idx) => {
        if (idx !== stageIndex) return stage;
        const nextQuestions = [...stage.questions];
        nextQuestions[currentQuestionIndex] = nextQuestion;
        return {
          ...stage,
          questions: nextQuestions,
        };
      })
    );

    setServedQuestionIdsByStage((served) =>
      served.map((ids, idx) =>
        idx === stageIndex && !ids.includes(nextQuestion.id)
          ? [...ids, nextQuestion.id]
          : ids
      )
    );
    setUsedLifelines((u) => ({ ...u, rerollQuestion: true }));
    setSelectedAnswer(null);
    setLockedAnswer(null);
    setLastAnswerCorrect(null);
    setRemovedAnswers([]);
    setAudiencePercents(null);
    setPhoneHint(null);
    return true;
  }, [
    gameStatus,
    usedLifelines.rerollQuestion,
    servedQuestionIdsByStage,
    stageIndex,
    questions,
    currentStage,
    currentQuestionIndex,
  ]);

  const resetToStart = useCallback(() => {
    setGameStatus(GAME_STATUS.IDLE);
    setStageIndex(0);
    setCurrentQuestionIndex(0);
    setCurrentWinnings(0);
    setLivesRemaining(INITIAL_LIVES);
    setSelectedAnswer(null);
    setLockedAnswer(null);
    setLastAnswerCorrect(null);
    setUsedLifelines(INITIAL_LIFELINES);
    setRemovedAnswers([]);
    setAudiencePercents(null);
    setPhoneHint(null);
    setServedQuestionIdsByStage((prev) => prev.map(() => []));
  }, []);

  return useMemo(
    () => ({
      stages,
      stageIndex,
      currentStage,
      currentStageLabel: currentStage?.label ?? '',
      questions,
      totalQuestions: questions.length,
      currentQuestion,
      currentQuestionIndex,
      globalQuestionIndex,
      currentWinnings,
      livesRemaining,
      gameStatus,
      selectedAnswer,
      lockedAnswer,
      lastAnswerCorrect,
      usedLifelines,
      removedAnswers,
      audiencePercents,
      phoneHint,
      servedQuestionIdsByStage,
      startGame,
      selectAnswer,
      lockInAnswer,
      handleTimeout,
      resolveReveal,
      continueToNextStage,
      walkAway,
      useFiftyFifty,
      useAskAudience,
      usePhoneFriend,
      rerollQuestion,
      resetToStart,
    }),
    [
      stages,
      stageIndex,
      currentStage,
      questions,
      currentQuestion,
      currentQuestionIndex,
      globalQuestionIndex,
      currentWinnings,
      livesRemaining,
      gameStatus,
      selectedAnswer,
      lockedAnswer,
      lastAnswerCorrect,
      usedLifelines,
      removedAnswers,
      audiencePercents,
      phoneHint,
      servedQuestionIdsByStage,
      startGame,
      selectAnswer,
      lockInAnswer,
      handleTimeout,
      resolveReveal,
      continueToNextStage,
      walkAway,
      useFiftyFifty,
      useAskAudience,
      usePhoneFriend,
      rerollQuestion,
      resetToStart,
    ]
  );
}
