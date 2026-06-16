import type { Board, CellValue, PuzzleDifficulty } from "./types";
import { createEmptyBoard } from "./board";
import { countSolutions, findEmptyCell } from "./solver";
import { canPlaceNumber } from "./validator";
import { shuffle } from "../utils/shuffle";

const CELLS_COUNT = 81;
const NUMBERS: CellValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const DIFFICULTY_SETTINGS: Record<PuzzleDifficulty, { cellsToRemove: number }> = {
  easy: { cellsToRemove: 36 },
  medium: { cellsToRemove: 46 },
  hard: { cellsToRemove: 54 },
};

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

  const numbers: CellValue[] = shuffle(NUMBERS);

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

export function generatePuzzle(difficulty: PuzzleDifficulty = "medium"): Board {
  const puzzle = generateSolvedBoard();
  const { cellsToRemove } = DIFFICULTY_SETTINGS[difficulty];
  const indexPairs = createSymmetricIndexPairs();

  let removedCellsCount = 0;

  for (const pair of indexPairs) {
    if (removedCellsCount >= cellsToRemove) {
      break;
    }

    const valuesBeforeRemoving = pair.map((index) => puzzle[index]);

    for (const index of pair) {
      puzzle[index] = 0;
    }

    if (countSolutions([...puzzle]) !== 1) {
      pair.forEach((index, pairIndex) => {
        puzzle[index] = valuesBeforeRemoving[pairIndex];
      });
    } else {
      removedCellsCount += pair.length;
    }
  }

  return puzzle;
}

function createSymmetricIndexPairs(): number[][] {
  const pairs: number[][] = [];

  for (let index = 0; index < Math.ceil(CELLS_COUNT / 2); index++) {
    const mirroredIndex = CELLS_COUNT - 1 - index;

    if (index === mirroredIndex) {
      pairs.push([index]);
    } else {
      pairs.push([index, mirroredIndex]);
    }
  }

  return shuffle(pairs);
}