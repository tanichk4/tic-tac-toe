import Square from './Square';
import styles from '../styles/Board.module.css';

export default function Board({ squareGrid, onClick, turn }) {
  return (
    <div className={styles.board}>
      {squareGrid.map(square => (
        <Square
          turn={turn}
          value={square.value}
          cellNum={square.id}
          onSquareClick={onClick}
          key={square.id}
        />
      ))}
    </div>
  );
}
