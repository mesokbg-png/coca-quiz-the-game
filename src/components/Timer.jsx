import React from 'react';

export default function Timer({ timeLeft, max }) {
  const pct = Math.max(0, Math.min(100, (timeLeft / max) * 100));
  const danger = timeLeft <= 5;
  return (
    <div className={`timer ${danger ? 'danger' : ''}`}>
      <div className="timer-bar" style={{ width: `${pct}%` }} />
      <div className="timer-text">{timeLeft}s</div>
    </div>
  );
}
