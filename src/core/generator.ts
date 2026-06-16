import type { Board, CellValue } from "./types";
import { createEmptyBoard } from "./board";
import { countSolutions, findEmptyCell } from "./solver";
import { canPlaceNumber } from "./validator";
import { shuffle } from "../utils/shuffle";

export function generateSolvedBoard(): Board {
  const board = createEmptyBoard();

  fillBoard(board);

  return board;
}

function fillBoard(board: Board): boolean {
  const emptyCellIndex = findEmptyCell(board);

  if (emptyCellIndex === -1) {
    return true;
  }

  const numbers: CellValue[] = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (const num of numbers) {
    if (canPlaceNumber(board, emptyCellIndex, num)) {
      board[emptyCellIndex] = num;

      if (fillBoard(board)) {
        return true;
      }

      board[emptyCellIndex] = 0;
    }
  }

  return false;
}

export function generatePuzzle(): Board {
  const puzzle = generateSolvedBoard();
  const indices = shuffle([...Array(81).keys()]);

  for (const index of indices) {
    const savedValue = puzzle[index];

    puzzle[index] = 0;

    if (countSolutions([...puzzle]) !== 1) {
      puzzle[index] = savedValue;
    }
  }

  return puzzle;
}