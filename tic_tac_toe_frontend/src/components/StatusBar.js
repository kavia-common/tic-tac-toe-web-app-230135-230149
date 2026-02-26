import React from 'react';
import './StatusBar.css';

/**
 * PUBLIC_INTERFACE
 * StatusBar – Displays the current game status (whose turn, winner, draw).
 *
 * @param {Object}  props
 * @param {string|null} props.winner         - 'X', 'O', or null.
 * @param {boolean} props.isDraw             - Whether the game is a draw.
 * @param {string}  props.currentPlayer      - 'X' or 'O' (the next player).
 * @param {boolean} props.gameOver           - Whether the game has ended.
 */
function StatusBar({ winner, isDraw, currentPlayer, gameOver }) {
  let statusText;
  let statusClass = 'status-bar';

  if (winner) {
    statusText = `Player ${winner} wins! 🎉`;
    statusClass += ` status-bar--winner status-bar--${winner.toLowerCase()}`;
  } else if (isDraw) {
    statusText = "It's a draw! 🤝";
    statusClass += ' status-bar--draw';
  } else {
    statusText = `Player ${currentPlayer}'s turn`;
    statusClass += ` status-bar--playing status-bar--${currentPlayer.toLowerCase()}`;
  }

  return (
    <div className={statusClass} role="status" aria-live="polite" aria-atomic="true">
      <span className="status-bar__indicator" aria-hidden="true" />
      <span className="status-bar__text">{statusText}</span>
    </div>
  );
}

export default StatusBar;
