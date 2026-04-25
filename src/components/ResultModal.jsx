import React, { useEffect } from 'react';

export default function ResultModal({ correct, onContinue }) {
  useEffect(() => {
    const id = setTimeout(onContinue, 1800);
    return () => clearTimeout(id);
  }, [onContinue]);

  return (
    <div className={`result-modal ${correct ? 'correct' : 'wrong'}`}>
      <div className="result-inner">
        {correct ? '✓ Correct!' : '✗ Wrong!'}
      </div>
    </div>
  );
}
