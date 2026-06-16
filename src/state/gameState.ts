import type { Board, CellIndex, CellValue } from "../core/types";
import { createBoardCopy, createInitialPuzzle } from "../core/board";
import { EMPTY_CELL } from "../core/consts";
import { isBoard } from "../core/guards";

const STORAGE_KEY = "sudoku-game-state";

type SavedGameState = {
  puzzle: Board;
  currentBoard: Board;
};

const savedGameState = loadGameState();

let puzzle: Board = savedGameState?.puzzle ?? createInitialPuzzle();
let currentBoard: Board = savedGameState?.currentBoard ?? createBoardCopy(puzzle);
let selectedCellIndex: CellIndex | null = null;

export function hasSavedGame(): boolean {
  return savedGameState !== null;
}

export function getPuzzle(): Board {
  return createBoardCopy(puzzle);
}

export function getCurrentBoard(): Board {
  return createBoardCopy(currentBoard);
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
  saveGameState();
}

export function isGivenCell(index: CellIndex): boolean {
  return puzzle[index] !== EMPTY_CELL;
}

export function setCellValue(index: CellIndex, value: CellValue): void {
  if (isGivenCell(index)) {
    return;
  }

  currentBoard[index] = value;
  saveGameState();
}

function saveGameState(): void {
  const state: SavedGameState = {
    puzzle,
    currentBoard,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadGameState(): SavedGameState | null {
  const rawState = localStorage.getItem(STORAGE_KEY);

  if (!rawState) {
    return null;
  }

  try {
    const parsedState: unknown = JSON.parse(rawState);

    if (!isSavedGameState(parsedState)) {
      clearGameState();
      return null;
    }

    return parsedState;
  } catch (error) {
    console.warn("Invalid saved game state", error);
    clearGameState();
    return null;
  }
}

function isSavedGameState(value: unknown): value is SavedGameState {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const state = value as Partial<SavedGameState>;

  return isBoard(state.puzzle) && isBoard(state.currentBoard);
}

function clearGameState(): void {
  localStorage.removeItem(STORAGE_KEY);
}
