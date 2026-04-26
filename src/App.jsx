import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen.jsx';
import StartScreen from './components/StartScreen.jsx';
import GameScreen from './components/GameScreen.jsx';
import GameOverScreen from './components/GameOverScreen.jsx';
import WinnerScreen from './components/WinnerScreen.jsx';
import StageTransitionScreen from './components/StageTransitionScreen.jsx';
import { useGameState } from './hooks/useGameState.js';
import { GAME_STATUS } from './utils/gameLogic.js';

const APP_VERSION = '1.0.0';

export default function App() {
  const game = useGameState();
  const [introDone, setIntroDone] = useState(false);

  if (!introDone) {
    return (
      <div className="app">
        <IntroScreen onContinue={() => setIntroDone(true)} />
        <footer className="app-footer">v{APP_VERSION}</footer>
      </div>
    );
  }

  const completedStage = game.stages[game.stageIndex];
  const nextStage = game.stages[game.stageIndex + 1];

  return (
    <div className="app">
      {game.gameStatus === GAME_STATUS.IDLE && (
        <StartScreen onStart={game.startGame} />
      )}
      {(game.gameStatus === GAME_STATUS.PLAYING ||
        game.gameStatus === GAME_STATUS.REVEAL) && (
        <GameScreen game={game} />
      )}
      {game.gameStatus === GAME_STATUS.STAGE_TRANSITION && (
        <StageTransitionScreen
          completedStageIndex={game.stageIndex}
          completedStageLabel={completedStage?.label ?? ''}
          nextStageLabel={nextStage?.label ?? ''}
          onContinue={game.continueToNextStage}
        />
      )}
      {game.gameStatus === GAME_STATUS.GAME_OVER && (
        <GameOverScreen
          winnings={game.currentWinnings}
          onRestart={game.startGame}
          onHome={game.resetToStart}
        />
      )}
      {game.gameStatus === GAME_STATUS.WON && (
        <WinnerScreen
          winnings={game.currentWinnings}
          onRestart={game.startGame}
          onHome={game.resetToStart}
        />
      )}
      <footer className="app-footer">v{APP_VERSION}</footer>
    </div>
  );
}
