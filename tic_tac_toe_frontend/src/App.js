import React from 'react';
import useGameLogic from './hooks/useGameLogic';
import Board from './components/Board';
import StatusBar from './components/StatusBar';
import ScoreBoard from './components/ScoreBoard';
import './App.css';

/**
 * App – Root component for the Tic Tac Toe game.
 *
 * Composes all child components and supplies game state from the
 * useGameLogic hook. Keeps rendering and business logic decoupled.
 */
function App() {
  const {
    squares,
    winner,
    winningLine,
    isDraw,
    gameOver,
    currentPlayer,
    handleCellClick,
    resetGame,
    scores,
  } = useGameLogic();

  return (
    <div className="app">
      {/* ---- Background decorative blobs ---- */}
      <div className="app__blob app__blob--1" aria-hidden="true" />
      <div className="app__blob app__blob--2" aria-hidden="true" />

      {/* ---- Main card ---- */}
      <main className="game-card" role="main">
        {/* Header */}
        <header className="game-card__header">
          <h1 className="game-card__title">
            <span className="game-card__title-x">X</span>
            <span className="game-card__title-sep"> · </span>
            <span className="game-card__title-o">O</span>
          </h1>
          <p className="game-card__subtitle">Two-player local game</p>
        </header>

        {/* Scoreboard */}
        <ScoreBoard scores={scores} />

        {/* Status */}
        <StatusBar
          winner={winner}
          isDraw={isDraw}
          currentPlayer={currentPlayer}
          gameOver={gameOver}
        />

        {/* Game board */}
        <Board
          squares={squares}
          winningLine={winningLine}
          gameOver={gameOver}
          onCellClick={handleCellClick}
        />

        {/* Controls */}
        <div className="game-card__controls">
          <button
            className="btn btn--primary"
            onClick={resetGame}
            aria-label="Start a new game"
          >
            {gameOver ? 'New Game' : 'Reset'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="app__footer" role="contentinfo">
        <span>Tic Tac Toe &nbsp;·&nbsp; Local 2-player</span>
      </footer>
    </div>
  );
}

export default App;
