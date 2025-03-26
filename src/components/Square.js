import styles from '../styles/Square.module.css';

export default function Square({ value, cellNum, onSquareClick, turn }) {
  return (
    <div onClick={() => onSquareClick(cellNum, turn)} className={styles.square}>
      {value}
    </div>
  );
}
