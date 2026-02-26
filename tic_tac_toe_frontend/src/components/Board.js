import React from 'react';
import Cell from './Cell';
import './Board.css';

/**
 * PUBLIC_INTERFACE
 * Board – Renders the 3×3 Tic Tac Toe grid.
 *
 * @param {Object}                props
 * @param {Array<string|null>}    props.squares        - Array of 9 cell values.
 * @param {number[]|null}         props.winningLine     - Indices of winning cells, or null.
 * @param {boolean}               props.gameOver        - Whether the game has ended.
 * @param {Function}              props.onCellClick     - Handler for cell clicks.
 * @param {string}                props.currentPlayer   - 'X' or 'O', forwarded to cells for ghost preview.
 */
function Board({ squares, winningLine, gameOver, onCellClick, currentPlayer }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, index) => (
        <Cell
          key={index}
          index={index}
          value={value}
          isWinning={winningLine ? winningLine.includes(index) : false}
          isDisabled={gameOver}
          currentPlayer={currentPlayer}
          onClick={() => onCellClick(index)}
        />
      ))}
    </div>
  );
}

export default Board;
