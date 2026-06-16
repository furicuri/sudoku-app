import type { Board, CellIndex, CellValue } from "../core/types";
import { createBoardCopy, createInitialPuzzle } from "../core/board";

let puzzle: Board = createInitialPuzzle(); // Это начальная доска текущей игры. Она нужна для того, чтобы мы могли проверять, какие клетки были даны изначально, а какие мы заполняем сами.
let currentBoard: Board = createBoardCopy(puzzle); // Это текущая доска, которая изменяется по мере того, как игрок заполняет клетки. Она нужна для того, чтобы мы могли отображать текущее состояние игры.
let selectedCellIndex: CellIndex | null = null; // Это индекс выбранной клетки. Он нужен для того, чтобы мы могли выделять выбранную клетку на доске и заполнять её значением при нажатии на цифры.

export function getPuzzle(): Board {
  return puzzle;
}

export function getCurrentBoard(): Board {
  return currentBoard;
}

export function getSelectedCellIndex(): CellIndex | null {
  return selectedCellIndex;
}

export function selectCell(index: CellIndex): void {
  selectedCellIndex = index;
}

export function startNewGame(newPuzzle: Board): void {
  puzzle = createBoardCopy(newPuzzle);
  currentBoard = createBoardCopy(newPuzzle);
  selectedCellIndex = null;
}

export function isGivenCell(index: CellIndex): boolean {
  return puzzle[index] !== 0;
}

export function setCellValue(index: CellIndex, value: CellValue): void {
  if (isGivenCell(index)) {
    return;
  }
  currentBoard[index] = value;
}