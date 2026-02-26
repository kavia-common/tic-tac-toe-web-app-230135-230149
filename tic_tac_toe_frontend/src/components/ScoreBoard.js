import React from 'react';
import './ScoreBoard.css';

/**
 * PUBLIC_INTERFACE
 * ScoreBoard – Displays win/draw counts for both players.
 *
 * @param {Object} props
 * @param {{ X: number, O: number, draws: number }} props.scores - Score tallies.
 */
function ScoreBoard({ scores }) {
  return (
    <div className="scoreboard" aria-label="Scoreboard">
      <div className="scoreboard__player scoreboard__player--x">
        <span className="scoreboard__label">Player X</span>
        <span className="scoreboard__value">{scores.X}</span>
      </div>
      <div className="scoreboard__divider">
        <span className="scoreboard__draws-label">Draws</span>
        <span className="scoreboard__draws-value">{scores.draws}</span>
      </div>
      <div className="scoreboard__player scoreboard__player--o">
        <span className="scoreboard__label">Player O</span>
        <span className="scoreboard__value">{scores.O}</span>
      </div>
    </div>
  );
}

export default ScoreBoard;
