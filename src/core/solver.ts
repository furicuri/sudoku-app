import { EMPTY_CELL, MAX_CELL_VALUE, MIN_CELL_VALUE } from "./consts";
import { canPlaceNumber } from "./validator";

export function findEmptyCell(board: number[]): number {
  return board.findIndex((cell) => cell === EMPTY_CELL);
}

export function solveBoard(board: number[]): boolean {
  const emptyCellIndex = findEmptyCell(board);

  if (emptyCellIndex === -1) {
    return true;
  }

  for (let value = MIN_CELL_VALUE; value <= MAX_CELL_VALUE; value++) {
    if (canPlaceNumber(board, emptyCellIndex, value)) {
      board[emptyCellIndex] = value;

      if (solveBoard(board)) {
        return true;
      }

      board[emptyCellIndex] = EMPTY_CELL;
    }
  }

  return false;
}

export function countSolutions(board: number[], limit = 2): number {
  const emptyCellIndex = findEmptyCell(board);

  if (emptyCellIndex === -1) {
    return 1;
  }

  let solutionsCount = 0;

  for (let value = MIN_CELL_VALUE; value <= MAX_CELL_VALUE; value++) {
    if (canPlaceNumber(board, emptyCellIndex, value)) {
      board[emptyCellIndex] = value;

      solutionsCount += countSolutions(board, limit);

      board[emptyCellIndex] = EMPTY_CELL;

      if (solutionsCount >= limit) {
        return solutionsCount;
      }
    }
  }

  return solutionsCount;
}
