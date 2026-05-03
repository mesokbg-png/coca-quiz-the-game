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
          <span className="title-glow">COCA</span>
          <span className="title-sub">Quiz Show</span>

        </h1>
        <p className="tagline">Slide Your Task, Hide from Bo, Pray for Free Cookies</p>

        <button className="btn btn-primary" onClick={handleStartClick}>
          Start game
        </button>

        <div className="how-to">
          <h3>How to play</h3>
          <ul>
            <li>Answer questions alone, don't ask the host for answers (He doesn't know hehe).</li>
            <li>The game has multiple stages — Stage 1 is <strong>Office Lore</strong>, Stage 2 is <strong>Team Trivia</strong>, and Stage 3 <strong>Mysterous Questions</strong> is the final and hardest round full of custom personal questions</li>
            <li>Total questions to answer 30 (5-10-15 based on stage), There is 64 total questions that can be served from the pool.</li>
            <li>Every correct answer moves you up closer to <strong>The GRAND PRICE!</strong></li>
            <li>You have 3 lives each time you lose you will be served new question, loosing all your lives you fail the game but you can start over</li>
            <li>Use 'Jokers' wisely. They reset when you advance to next stage.</li>
            <li>No time limit, but you are racing with each team member.</li>
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
