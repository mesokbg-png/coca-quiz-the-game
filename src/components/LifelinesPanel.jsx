import React from 'react';

export default function LifelinesPanel({
  usedLifelines,
  disabled,
  onFiftyFifty,
  onAudience,
  onPhone,
  onReroll,
}) {
  return (
    <div className="lifelines">
      <button
        className="lifeline"
        disabled={disabled || usedLifelines.fiftyFifty}
        onClick={onFiftyFifty}
        aria-label="50:50"
      >
        <span className="lifeline-label">50:50</span>
      </button>
      <button
        className="lifeline"
        disabled={disabled || usedLifelines.askAudience}
        onClick={onAudience}
        aria-label="Ask the audience"
      >
        <span className="lifeline-label">AUDIENCE</span>
      </button>
      <button
        className="lifeline"
        disabled={disabled || usedLifelines.phoneFriend}
        onClick={onPhone}
        aria-label="Call Ivo"
      >
        <span className="lifeline-label">CALL IVO</span>
      </button>
      <button
        className="lifeline"
        disabled={disabled || usedLifelines.rerollQuestion}
        onClick={onReroll}
        aria-label="Reroll question"
      >
        <span className="lifeline-label">REROLL</span>
      </button>
    </div>
  );
}
