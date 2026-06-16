import type { Board } from "../core/types";

const PUZZLE_STORAGE_KEY = "sudoku-puzzle";

function isBoard(value: unknown): value is Board {
  return Array.isArray(value);
}

export function savePuzzle(board: Board): void {
  localStorage.setItem(PUZZLE_STORAGE_KEY, JSON.stringify(board));
}

export function loadPuzzle(): Board | null {
  const savedPuzzle = localStorage.getItem(PUZZLE_STORAGE_KEY);

  if (!savedPuzzle) {
    return null;
  }

  try {
    const parsedPuzzle: unknown = JSON.parse(savedPuzzle);

    if (!isBoard(parsedPuzzle)) {
      clearPuzzle();
      return null;
    }

    return parsedPuzzle;
  } catch {
    clearPuzzle();
    return null;
  }
}

export function clearPuzzle(): void {
  localStorage.removeItem(PUZZLE_STORAGE_KEY);
}