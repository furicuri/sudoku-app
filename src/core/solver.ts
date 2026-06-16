import { canPlaceNumber } from "./validator";

const EMPTY_CELL = 0; 
const MIN_VALUE = 1;
const MAX_VALUE = 9;

export function findEmptyCell(board: number[]): number {
  return board.findIndex((cell) => cell === EMPTY_CELL);
} 

export function solveBoard(board: number[]): boolean {
  const emptyCellIndex = findEmptyCell(board);

  if (emptyCellIndex === -1) {
    return true;
  }

  for (let value = MIN_VALUE; value <= MAX_VALUE; value++) {
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

  for (let value = MIN_VALUE; value <= MAX_VALUE; value++) {
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