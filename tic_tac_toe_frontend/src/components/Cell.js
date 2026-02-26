import React from 'react';
import './Cell.css';

/**
 * PUBLIC_INTERFACE
 * Cell – A single Tic Tac Toe board cell.
 *
 * @param {Object}   props
 * @param {string|null} props.value        - 'X', 'O', or null.
 * @param {boolean}  props.isWinning       - Whether this cell is part of the winning line.
 * @param {boolean}  props.isDisabled      - Whether the cell is non-interactive (game over).
 * @param {Function} props.onClick         - Callback when the cell is clicked.
 * @param {number}   props.index           - Cell index (0-8) used for aria-label.
 */
function Cell({ value, isWinning, isDisabled, onClick, index }) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;

  const classNames = [
    'cell',
    value ? `cell--${value.toLowerCase()}` : '',
    isWinning ? 'cell--winning' : '',
    !value && !isDisabled ? 'cell--empty' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={Boolean(value) || isDisabled}
      aria-label={`Row ${row}, Column ${col}${value ? `, ${value}` : ', empty'}`}
      aria-pressed={Boolean(value)}
    >
      {value && (
        <span className="cell__symbol" aria-hidden="true">
          {value}
        </span>
      )}
    </button>
  );
}

export default Cell;
