import React from 'react';
import './StatusBar.css';

/**
 * PUBLIC_INTERFACE
 * StatusBar – Displays the current game status (whose turn, winner, draw).
 * Shows a pulsing indicator during play, and a celebratory icon on win/draw.
 *
 * @param {Object}      props
 * @param {string|null} props.winner         - 'X', 'O', or null.
 * @param {boolean}     props.isDraw         - Whether the game is a draw.
 * @param {string}      props.currentPlayer  - 'X' or 'O' (the next player).
 * @param {boolean}     props.gameOver       - Whether the game has ended.
 */
function StatusBar({ winner, isDraw, currentPlayer, gameOver }) {
  let statusText;
  let statusClass = 'status-bar';
  let icon = null;

  if (winner) {
    statusText = `Player ${winner} wins!`;
    statusClass += ` status-bar--winner status-bar--${winner.toLowerCase()}`;
    icon = '🏆';
  } else if (isDraw) {
    statusText = "It's a draw!";
    statusClass += ' status-bar--draw';
    icon = '🤝';
  } else {
    statusText = `Player ${currentPlayer}'s turn`;
    statusClass += ` status-bar--playing status-bar--${currentPlayer.toLowerCase()}`;
  }

  return (
    <div
      className={statusClass}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Coloured dot indicator */}
      <span className="status-bar__indicator" aria-hidden="true" />

      {/* Status message */}
      <span className="status-bar__text">{statusText}</span>

      {/* Celebratory icon shown on win/draw */}
      {icon && (
        <span className="status-bar__icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </div>
  );
}

export default StatusBar;
