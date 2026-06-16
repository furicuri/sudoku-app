import { BOARD_SIZE, BOX_SIZE } from "./consts";

export function canPlaceNumber(
  board: number[],
  index: number,
  value: number
): boolean {
  const row = Math.floor(index / BOARD_SIZE);
  const column = index % BOARD_SIZE;

  return (
    isValueNotInRow(board, row, value) &&
    isValueNotInColumn(board, column, value) &&
    isValueNotInBox(board, row, column, value)
  );
}

function isValueNotInRow(board: number[], row: number, value: number): boolean {
  const rowStartIndex = row * BOARD_SIZE;

  for (let column = 0; column < BOARD_SIZE; column++) {
    const currentIndex = rowStartIndex + column;

    if (board[currentIndex] === value) {
      return false;
    }
  }

  return true;
}

function isValueNotInColumn(
  board: number[],
  column: number,
  value: number
): boolean {
  for (let row = 0; row < BOARD_SIZE; row++) {
    const currentIndex = row * BOARD_SIZE + column;

    if (board[currentIndex] === value) {
      return false;
    }
  }

  return true;
}

function isValueNotInBox(
  board: number[],
  row: number,
  column: number,
  value: number
): boolean {
  const boxStartRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
  const boxStartColumn = Math.floor(column / BOX_SIZE) * BOX_SIZE;

  for (let rowOffset = 0; rowOffset < BOX_SIZE; rowOffset++) {
    for (let columnOffset = 0; columnOffset < BOX_SIZE; columnOffset++) {
      const currentRow = boxStartRow + rowOffset;
      const currentColumn = boxStartColumn + columnOffset;
      const currentIndex = currentRow * BOARD_SIZE + currentColumn;

      if (board[currentIndex] === value) {
        return false;
      }
    }
  }

  return true;
}
