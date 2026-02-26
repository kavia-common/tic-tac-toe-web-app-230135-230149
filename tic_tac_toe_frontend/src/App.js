import React, { useEffect, useRef, useCallback } from 'react';
import useGameLogic from './hooks/useGameLogic';
import Board from './components/Board';
import StatusBar from './components/StatusBar';
import ScoreBoard from './components/ScoreBoard';
import './App.css';

/* ---- Confetti helpers ---------------------------------- */

/**
 * Vivid, playful colour palette for confetti pieces.
 * Matches the new violet × coral × mint × gold theme.
 */
const CONFETTI_COLORS = [
  '#6c47ff', '#ff6ac1', '#ff5c7a',
  '#22d27a', '#ff9f43', '#5b5ef4',
  '#ffdd59', '#48dbfb',
];

/**
 * Creates a single confetti DOM element with a random style and appends it
 * to the provided container element.
 * @param {HTMLElement} container
 */
function spawnConfettiPiece(container) {
  const el = document.createElement('div');
  el.className = 'confetti-piece';

  const size     = 6 + Math.random() * 10;           // 6–16 px
  const left     = Math.random() * 100;              // 0–100 %
  const delay    = Math.random() * 0.7;              // 0–0.7 s
  const dur      = 1.5 + Math.random() * 1.3;        // 1.5–2.8 s
  const color    = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
  const isCircle = Math.random() > 0.5;
  const isStar   = !isCircle && Math.random() > 0.7; // ~15% chance of a wide rectangle

  el.style.cssText = [
    `width: ${size}px`,
    `height: ${isStar ? size * 0.4 : size}px`,
    `left: ${left}%`,
    `background: ${color}`,
    `animation-duration: ${dur}s`,
    `animation-delay: ${delay}s`,
    `border-radius: ${isCircle ? '50%' : '3px'}`,
    `transform: rotate(${Math.random() * 360}deg)`,
    `opacity: 0.9`,
  ].join('; ');

  container.appendChild(el);

  // Self-clean after the animation finishes
  el.addEventListener('animationend', () => el.remove(), { once: true });
}

/**
 * Launches a burst of confetti by spawning N pieces into a container div.
 * @param {HTMLElement} container
 * @param {number}      count
 */
function launchConfetti(container, count = 75) {
  for (let i = 0; i < count; i++) {
    spawnConfettiPiece(container);
  }
}

/* ---- App component ------------------------------------ */

/**
 * App – Root component for the Tic Tac Toe game.
 *
 * Composes all child components and supplies game state from the
 * useGameLogic hook. Keeps rendering and business logic decoupled.
 * Triggers a confetti burst when a player wins.
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

  const confettiRef = useRef(null);
  // Track whether we've already fired confetti for this win
  const confettiFiredRef = useRef(false);

  // Fire confetti when a player wins (only once per win)
  useEffect(() => {
    if (winner && !confettiFiredRef.current && confettiRef.current) {
      confettiFiredRef.current = true;
      launchConfetti(confettiRef.current, 80);
    }
    if (!winner) {
      confettiFiredRef.current = false;
    }
  }, [winner]);

  /**
   * Wraps resetGame to also clear confetti state.
   */
  const handleReset = useCallback(() => {
    confettiFiredRef.current = false;
    resetGame();
  }, [resetGame]);

  return (
    <div className="app">
      {/* ---- Background decorative blobs ---- */}
      <div className="app__blob app__blob--1" aria-hidden="true" />
      <div className="app__blob app__blob--2" aria-hidden="true" />
      <div className="app__blob app__blob--3" aria-hidden="true" />
      <div className="app__blob app__blob--4" aria-hidden="true" />

      {/* ---- Confetti overlay (winner celebration) ---- */}
      <div
        className="confetti-container"
        ref={confettiRef}
        aria-hidden="true"
      />

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

        {/* Scoreboard – shows active player highlight */}
        <ScoreBoard
          scores={scores}
          currentPlayer={currentPlayer}
          gameOver={gameOver}
        />

        {/* Status bar */}
        <StatusBar
          winner={winner}
          isDraw={isDraw}
          currentPlayer={currentPlayer}
          gameOver={gameOver}
        />

        {/* Game board – passes currentPlayer for ghost preview */}
        <Board
          squares={squares}
          winningLine={winningLine}
          gameOver={gameOver}
          onCellClick={handleCellClick}
          currentPlayer={currentPlayer}
        />

        {/* Controls */}
        <div className="game-card__controls">
          <button
            className="btn btn--primary"
            onClick={handleReset}
            aria-label={gameOver ? 'Start a new game' : 'Reset the current game'}
          >
            <span className="btn__icon" aria-hidden="true">
              {gameOver ? '▶' : '↺'}
            </span>
            {gameOver ? 'New Game' : 'Reset'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="app__footer" role="contentinfo">
        <span>Tic Tac Toe</span>
        <span className="app__footer-dot" aria-hidden="true" />
        <span>Local 2-player</span>
      </footer>
    </div>
  );
}

export default App;
