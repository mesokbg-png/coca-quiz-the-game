import React from 'react';

export default function AudiencePanel({ percents, onClose }) {
  if (!percents) return null;
  const entries = Object.entries(percents);
  const max = Math.max(...entries.map(([, v]) => v));
  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>The audience says</h3>
        <div className="audience-bars">
          {entries.map(([answer, pct]) => (
            <div key={answer} className="audience-row">
              <span className="audience-answer">{answer}</span>
              <div className="audience-bar-bg">
                <div
                  className={`audience-bar ${pct === max ? 'peak' : ''}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="audience-pct">{pct}%</span>
            </div>
          ))}
        </div>
        <button className="btn btn-lock" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
