import React, { useEffect } from 'react';
import mainLogo from '../assets/images/main-logo.png';

export default function IntroScreen({ onContinue }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        onContinue();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onContinue]);

  return (
    <div className="screen intro-screen" onClick={onContinue}>
      <div className="intro-content">
        <div className="intro-logo">
          <img src={mainLogo} alt="Knuckle Team" className="intro-logo-img" />
        </div>
        <h1 className="intro-title">Who will win the GRAND PRICE?</h1>
        <p className="intro-prompt">Press <kbd>SPACE</kbd> to continue</p>
      </div>
    </div>
  );
}
