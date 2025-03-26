import { useState } from 'react';
import Board from './Board';

export default function Game() {
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState('x');
  const [squareGrid, setSquareGrid] = useState([
    { id: 1, value: null },
    { id: 2, value: null },
    { id: 3, value: null },
    { id: 4, value: null },
    { id: 5, value: null },
    { id: 6, value: null },
    { id: 7, value: null },
    { id: 8, value: null },
    { id: 9, value: null },
  ]);

  function handleSquareClick(cellNum, turn) {
    console.log(cellNum, turn);
    if (winner) return;

    const currentCell = squareGrid.find(square => square.id === cellNum);
    if (currentCell.value) return;

    const updatedGrid = squareGrid.map(square =>
      square.id === cellNum ? { ...square, value: turn } : square
    );

    setSquareGrid(updatedGrid);

    const isWinner = checkWinner(updatedGrid, turn);

    if (isWinner) {
      alert(`${turn} wins!`);
      setWinner(turn);
      return;
    }

    const isTie = updatedGrid.every(square => square.value !== null);
    if (!isWinner && isTie) {
      alert("It's a tie!");
    }

    setTurn(t => (t === 'x' ? 'o' : 'x'));
  }

  function checkWinner(updatedGrid, turn) {
    const winningCombinations = [
      [1, 2, 3], // Top row
      [4, 5, 6], // Middle row
      [7, 8, 9], // Bottom row
      [1, 4, 7], // Left column
      [2, 5, 8], // Middle column
      [3, 6, 9], // Right column
      [1, 5, 9], // Diagonal (top-left to bottom-right)
      [3, 5, 7], // Diagonal (top-right to bottom-left)
    ];

    const playerMoves = updatedGrid
      .filter(square => square.value === turn)
      .map(square => square.id);

    const isWinner = winningCombinations.some(combo =>
      combo.every(id => playerMoves.includes(id))
    );

    if (isWinner) {
      return true;
    }

    return false;
  }

  function handleGameReset() {
    setSquareGrid([
      { id: 1, value: null },
      { id: 2, value: null },
      { id: 3, value: null },
      { id: 4, value: null },
      { id: 5, value: null },
      { id: 6, value: null },
      { id: 7, value: null },
      { id: 8, value: null },
      { id: 9, value: null },
    ]);
    setTurn('x');
    setWinner(null);
  }

  return (
    <div>
      <Board squareGrid={squareGrid} onClick={handleSquareClick} turn={turn} />
      <button onClick={handleGameReset}>Reset Game</button>
    </div>
  );
}
