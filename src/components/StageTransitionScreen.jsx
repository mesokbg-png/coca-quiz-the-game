import React from 'react';

export default function StageTransitionScreen({
  completedStageIndex,
  completedStageLabel,
  nextStageLabel,
  onContinue,
}) {
  const isAfterStageOne = completedStageIndex === 0;
  const isAfterStageTwo = completedStageIndex === 1;

  return (
    <div className="screen end-screen">
      <h1 className="end-title">{completedStageLabel} complete!</h1>
      {isAfterStageOne && (
        <>
          <p className="end-amount">
            Congratulations! You won your first additional <strong>home office day</strong>.
          </p>
          <p className="end-amount">
            Now proceed to harder questions{nextStageLabel ? ` — ${nextStageLabel}` : ''}.
          </p>
        </>
      )}
      {isAfterStageTwo && (
        <>
          <p className="end-amount">
            Congratulations! You won your second additional <strong>home office day</strong>.
          </p>
          <p className="end-amount">
            {nextStageLabel} is the final and hardest stage. Win it and you take the <strong>grand prize</strong>.
          </p>
        </>
      )}
      <div className="end-actions">
        <button className="btn btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
