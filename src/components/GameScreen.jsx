import React, { useState } from 'react';
import QuestionCard from './QuestionCard.jsx';
import MoneyLadder from './MoneyLadder.jsx';
import LifelinesPanel from './LifelinesPanel.jsx';
import ResultModal from './ResultModal.jsx';
import AudiencePanel from './AudiencePanel.jsx';
import PhonePanel from './PhonePanel.jsx';
import { fiftyFifty, askAudience, phoneFriend } from '../utils/lifelines.js';
import { GAME_STATUS } from '../utils/gameLogic.js';

export default function GameScreen({ game }) {
  const {
    questions,
    currentStageLabel,
    currentQuestion,
    currentQuestionIndex,
    livesRemaining,
    gameStatus,
    selectedAnswer,
    lockedAnswer,
    lastAnswerCorrect,
    usedLifelines,
    removedAnswers,
    audiencePercents,
    phoneHint,
    selectAnswer,
    lockInAnswer,
    resolveReveal,
    useFiftyFifty,
    useAskAudience,
    usePhoneFriend,
    rerollQuestion,
  } = game;

  const [showAudience, setShowAudience] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const revealing = gameStatus === GAME_STATUS.REVEAL;
  const currentLabel = `${currentStageLabel} ${currentQuestionIndex + 1}`;

  const onFiftyFifty = () => {
    const toRemove = fiftyFifty(currentQuestion);
    useFiftyFifty(toRemove);
  };

  const onAudience = () => {
    const p = askAudience(currentQuestion);
    useAskAudience(p);
    setShowAudience(true);
  };

  const onPhone = () => {
    const hint = phoneFriend(currentQuestion);
    usePhoneFriend(hint);
    setShowPhone(true);
  };

  const onReroll = () => {
    setShowAudience(false);
    setShowPhone(false);
    rerollQuestion();
  };

  return (
    <div className="game-screen">
      <header className="game-header">
        <div className="question-meta">
          <span className="question-num">{currentLabel}</span>
          <span className="question-cat">{currentQuestion.category}</span>
        </div>
        <div className="lives">Lives: <strong>{livesRemaining}</strong> / 3</div>
        <div />
      </header>

      <div className="game-body">
        <main className="game-main">
          <LifelinesPanel
            usedLifelines={usedLifelines}
            disabled={revealing || Boolean(lockedAnswer)}
            onFiftyFifty={onFiftyFifty}
            onAudience={onAudience}
            onPhone={onPhone}
            onReroll={onReroll}
          />
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            lockedAnswer={lockedAnswer}
            removedAnswers={removedAnswers}
            revealing={revealing}
            onSelect={selectAnswer}
            onLock={lockInAnswer}
          />
        </main>
        <MoneyLadder
          currentQuestionIndex={currentQuestionIndex}
          questions={questions}
          stageLabel={currentStageLabel}
        />
      </div>

      {revealing && (
        <ResultModal
          correct={lastAnswerCorrect}
          onContinue={resolveReveal}
        />
      )}

      {showAudience && audiencePercents && (
        <AudiencePanel
          percents={audiencePercents}
          onClose={() => setShowAudience(false)}
        />
      )}

      {showPhone && phoneHint && (
        <PhonePanel hint={phoneHint} onClose={() => setShowPhone(false)} />
      )}
    </div>
  );
}
