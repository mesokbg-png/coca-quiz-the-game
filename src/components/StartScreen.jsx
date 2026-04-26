import React, { useState } from 'react';

export default function StartScreen({ onStart }) {
  const [showWarning, setShowWarning] = useState(false);

  const handleStartClick = () => setShowWarning(true);
  const handleConfirm = () => {
    setShowWarning(false);
    onStart();
  };
  const handleCancel = () => setShowWarning(false);

  return (
    <div className="screen start-screen">
      <div className="start-content">
        <h1 className="title">
          <span className="title-kicker">Office Edition</span>
          <span className="title-glow">COCA</span>
          <span className="title-sub">Quiz Show</span>
          <span className="title-flair">Climb for The Eye</span>
        </h1>
        <p className="tagline">Slide Your Task, Hide from Bo, Pray for Free Cookies</p>

        <button className="btn btn-primary" onClick={handleStartClick}>
          Start game
        </button>

        <div className="how-to">
          <h3>How to play</h3>
          <ul>
            <li>Answer questions alone, don't ask the host for answers (He doesn't know hehe).</li>
            <li>The game has multiple stages — Stage 1 is <strong>Office Lore</strong>, Stage 2 is <strong>Team Trivia</strong>, and Stage 3 is the final and hardest round.</li>
            <li>Every correct answer moves you up closer to 'The Eye' (Окото).</li>
            <li>Pass the safe thresholds to get one bonus day home office.</li>
            <li>If you beat Stage 3, you win the <strong>grand prize</strong>.</li>
            <li>Use 'Jokers' wisely or TDP will call you next.</li>
            <li>No time limit, but after 17:00 the host is gone.</li>
          </ul>
        </div>
      </div>

      {showWarning && (
        <div className="popup" onClick={handleCancel}>
          <div className="popup-inner warning-popup" onClick={(e) => e.stopPropagation()}>
            <h3 className="warning-title">⚠ WARNING ⚠</h3>
            <p className="warning-text">
              Did you read "How to play"?
            </p>
            <p className="warning-sub">
              <span className="heads-up">Heads up:</span> Tier 1 questions are easy office lore.
            </p>
            <p className="warning-sub">
              Click <strong>Yes</strong> to proceed, or <strong>No</strong> to go back and read.
            </p>
            <div className="warning-actions">
              <button className="btn btn-primary" onClick={handleConfirm}>
                Yes, proceed
              </button>
              <button className="btn btn-ghost" onClick={handleCancel}>
                No, go back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
