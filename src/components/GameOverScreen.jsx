import React from 'react';
import gameOverImage from '../assets/images/game-over.png';

export default function GameOverScreen({ winnings, onRestart, onHome }) {
  return (
    <div className="screen end-screen">
      <h1 className="end-title">Game over</h1>
      <img className="end-image" src={gameOverImage} alt="Game over" />
      <p className="end-warning">You will be next for TDP enjoy :)</p>
      <div className="end-actions">
        <button className="btn btn-primary" onClick={onRestart}>Play again</button>
        <button className="btn btn-ghost" onClick={onHome}>Main menu</button>
      </div>
    </div>
  );
}
