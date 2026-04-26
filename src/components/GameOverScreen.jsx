import React from 'react';
import gameOverImage from '../assets/images/game-over.png';

export default function GameOverScreen({ winnings, onRestart, onHome }) {
  return (
    <div className="screen end-screen game-over-screen">
      <div className="game-over-media">
        <img className="game-over-visual" src={gameOverImage} alt="Game over" />
      </div>
      <div className="end-actions game-over-actions">
        <button className="btn btn-primary" onClick={onRestart}>Play again</button>
        <button className="btn btn-ghost" onClick={onHome}>Main menu</button>
      </div>
    </div>
  );
}
