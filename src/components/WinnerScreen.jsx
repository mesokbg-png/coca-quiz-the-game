import React from 'react';
import champGif from '../assets/images/champ.gif';

export default function WinnerScreen({ winnings, onRestart, onHome }) {
  return (
    <div className="screen end-screen winner">
      <h1 className="end-title">🏆 CHAMPION 🏆</h1>
      <img className="winner-gif" src={champGif} alt="Champion celebration" />
      <div className="end-actions">
        <button className="btn btn-primary" onClick={onRestart}>Play again</button>
        <button className="btn btn-ghost" onClick={onHome}>Main menu</button>
      </div>
    </div>
  );
}
