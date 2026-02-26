import React, { useRef, useEffect } from 'react';
import './ScoreBoard.css';

/**
 * PUBLIC_INTERFACE
 * ScoreBoard – Displays win/draw counts for both players.
 * Highlights the active player's column and animates score bumps.
 *
 * @param {Object} props
 * @param {{ X: number, O: number, draws: number }} props.scores      - Score tallies.
 * @param {string}  props.currentPlayer  - 'X' or 'O' (whose turn it is).
 * @param {boolean} props.gameOver       - Whether the game is over (no active player highlight).
 */
function ScoreBoard({ scores, currentPlayer, gameOver }) {
  // Track previous scores to detect changes and trigger animation
  const prevScores = useRef({ ...scores });
  const xRef   = useRef(null);
  const oRef   = useRef(null);
  const drRef  = useRef(null);

  useEffect(() => {
    const bump = (ref) => {
      if (!ref.current) return;
      ref.current.classList.remove('scoreboard__value--bump');
      // Force reflow so the animation restarts
      void ref.current.offsetWidth;
      ref.current.classList.add('scoreboard__value--bump');
    };

    if (scores.X !== prevScores.current.X)     bump(xRef);
    if (scores.O !== prevScores.current.O)     bump(oRef);
    if (scores.draws !== prevScores.current.draws) bump(drRef);

    prevScores.current = { ...scores };
  }, [scores]);

  const activeX = !gameOver && currentPlayer === 'X';
  const activeO = !gameOver && currentPlayer === 'O';

  return (
    <div className="scoreboard" aria-label="Scoreboard" role="region">
      {/* Player X column */}
      <div
        className={[
          'scoreboard__player',
          'scoreboard__player--x',
          activeX ? 'scoreboard__player--active' : '',
        ].filter(Boolean).join(' ')}
        aria-label={`Player X: ${scores.X} win${scores.X !== 1 ? 's' : ''}${activeX ? ', current player' : ''}`}
      >
        <span className="scoreboard__active-dot" aria-hidden="true" />
        <span className="scoreboard__label">Player X</span>
        <span className="scoreboard__value" ref={xRef}>{scores.X}</span>
      </div>

      {/* Divider / Draws */}
      <div className="scoreboard__divider" aria-label={`Draws: ${scores.draws}`}>
        <span className="scoreboard__draws-label">Draws</span>
        <span className="scoreboard__draws-value" ref={drRef}>{scores.draws}</span>
      </div>

      {/* Player O column */}
      <div
        className={[
          'scoreboard__player',
          'scoreboard__player--o',
          activeO ? 'scoreboard__player--active' : '',
        ].filter(Boolean).join(' ')}
        aria-label={`Player O: ${scores.O} win${scores.O !== 1 ? 's' : ''}${activeO ? ', current player' : ''}`}
      >
        <span className="scoreboard__active-dot" aria-hidden="true" />
        <span className="scoreboard__label">Player O</span>
        <span className="scoreboard__value" ref={oRef}>{scores.O}</span>
      </div>
    </div>
  );
}

export default ScoreBoard;
