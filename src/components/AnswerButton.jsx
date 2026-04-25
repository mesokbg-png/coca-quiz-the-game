import React from 'react';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function AnswerButton({
  index,
  answer,
  selected,
  locked,
  isCorrect,
  isLocked,
  removed,
  revealing,
  disabled,
  onClick,
}) {
  const classes = ['answer-btn'];
  if (removed) classes.push('removed');
  if (selected && !revealing) classes.push('selected');
  if (revealing && isLocked) classes.push('locked');
  if (revealing && isLocked && isCorrect) classes.push('correct');
  if (revealing && isLocked && !isCorrect) classes.push('wrong');
  if (revealing && !isLocked && isCorrect) classes.push('correct-reveal');

  return (
    <button
      className={classes.join(' ')}
      onClick={onClick}
      disabled={disabled || removed}
      aria-label={`Answer ${LETTERS[index]}: ${answer}`}
    >
      <span className="answer-letter">{LETTERS[index]}</span>
      <span className="answer-text">{removed ? '' : answer}</span>
    </button>
  );
}
