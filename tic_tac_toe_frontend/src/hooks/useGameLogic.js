import { useState, useCallback } from 'react';

/**
 * All winning line combinations on a 3x3 board.
 * Each entry is an array of three cell indices.
 */
const WINNING_LINES = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // center column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left → bottom-right
  [2, 4, 6], // diagonal top-right → bottom-left
];

/**
 * Calculate the winner from the current board state.
 * @param {Array<string|null>} squares - Array of 9 cells ('X', 'O', or null).
 * @returns {{ winner: string, line: number[] } | null}
 */
function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * Custom hook encapsulating all Tic Tac Toe game logic.
 * Returns game state and actions consumed by UI components.
 *
 * @returns {{
 *   squares: Array<string|null>,
 *   isXNext: boolean,
 *   winner: string|null,
 *   winningLine: number[]|null,
 *   isDraw: boolean,
 *   gameOver: boolean,
 *   currentPlayer: string,
 *   handleCellClick: (index: number) => void,
 *   resetGame: () => void,
 *   scores: { X: number, O: number, draws: number },
 * }}
 */
function useGameLogic() {
  const [squares, setSquares]   = useState(Array(9).fill(null));
  const [isXNext, setIsXNext]   = useState(true);
  const [scores, setScores]     = useState({ X: 0, O: 0, draws: 0 });

  const result = calculateWinner(squares);
  const winner     = result ? result.winner : null;
  const winningLine = result ? result.line  : null;
  const isDraw     = !winner && squares.every(Boolean);
  const gameOver   = Boolean(winner || isDraw);
  const currentPlayer = isXNext ? 'X' : 'O';

  /**
   * Handle a player clicking a cell.
   * Ignores clicks on occupied cells or when the game is already over.
   */
  const handleCellClick = useCallback(
    (index) => {
      if (gameOver || squares[index]) return;

      const next = squares.slice();
      next[index] = currentPlayer;
      setSquares(next);

      // Check result after this move
      const newResult = calculateWinner(next);
      const newDraw   = !newResult && next.every(Boolean);

      if (newResult) {
        setScores((prev) => ({ ...prev, [newResult.winner]: prev[newResult.winner] + 1 }));
      } else if (newDraw) {
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      }

      setIsXNext((prev) => !prev);
    },
    [gameOver, squares, currentPlayer]
  );

  /** Reset the board to a fresh state without resetting scores. */
  const resetGame = useCallback(() => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }, []);

  return {
    squares,
    isXNext,
    winner,
    winningLine,
    isDraw,
    gameOver,
    currentPlayer,
    handleCellClick,
    resetGame,
    scores,
  };
}

export default useGameLogic;
