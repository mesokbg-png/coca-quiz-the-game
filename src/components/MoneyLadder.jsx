import React from 'react';

/**
 * Renders the question ladder for the CURRENT stage only. Each row shows
 * "{Stage Label} {n}" (e.g. "Office Lore 3"). The list is rendered
 * bottom-to-top so question 1 sits at the bottom.
 */
export default function MoneyLadder({
  currentQuestionIndex,
  questions = [],
  stageLabel = '',
}) {
  return (
    <aside className="money-ladder">
      <ol>
        {questions
          .map((_, i) => {
            const active = i === currentQuestionIndex;
            const passed = i < currentQuestionIndex;
            const classes = ['ladder-row'];
            if (active) classes.push('active');
            if (passed) classes.push('passed');
            return (
              <li key={i} className={classes.join(' ')}>
                <span className="ladder-num">{i + 1}</span>
                <span className="ladder-amount">
                  {stageLabel} {i + 1}
                </span>
              </li>
            );
          })
          .reverse()}
      </ol>
    </aside>
  );
}
