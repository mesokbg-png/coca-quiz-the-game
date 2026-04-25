import React from 'react';
import AnswerButton from './AnswerButton.jsx';

export default function QuestionCard({
  question,
  selectedAnswer,
  lockedAnswer,
  removedAnswers,
  revealing,
  onSelect,
  onLock,
}) {
  return (
    <div className="question-card">
      <div className="question-text">{question.question}</div>
      <div className="answers-grid">
        {question.answers.map((answer, i) => {
          const selected = selectedAnswer === answer;
          const isLocked = lockedAnswer === answer;
          const isCorrect = question.correctAnswer === answer;
          const removed = removedAnswers.includes(answer);
          return (
            <AnswerButton
              key={answer + i}
              index={i}
              answer={answer}
              selected={selected}
              isLocked={isLocked}
              isCorrect={isCorrect}
              removed={removed}
              revealing={revealing}
              disabled={Boolean(lockedAnswer) || revealing}
              onClick={() => {
                if (revealing || lockedAnswer || removed) return;
                onSelect(answer);
                onLock(answer);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
