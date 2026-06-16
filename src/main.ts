import { generatePuzzle } from "./core/generator";
import { EMPTY_CELL } from "./core/consts";
import { isPlayableCellValue } from "./core/guards";
import {
  getCurrentBoard,
  getSelectedCellIndex,
  hasSavedGame,
  isGivenCell,
  selectCell,
  setCellValue,
  startNewGame,
} from "./state/gameState";

import { renderBoard } from "./ui/renderBoard";
import { applySavedTheme, toggleTheme } from "./ui/theme";

const boardElement = document.querySelector<HTMLDivElement>(".board");
const newGameButton = document.querySelector<HTMLButtonElement>(".new-game-button");
const themeButton = document.querySelector<HTMLButtonElement>(
  '[data-action="toggle-theme"]'
);

if (!boardElement) {
  throw new Error("Board element not found");
}

if (!newGameButton) {
  throw new Error("New game button not found");
}

if (!themeButton) {
  throw new Error("Theme button not found");
}

const board = boardElement;
const newGame = newGameButton;
const theme = themeButton;

function updateBoard(): void {
  renderBoard(board, getCurrentBoard(), {
    selectedCellIndex: getSelectedCellIndex(),
    onCellClick: handleCellClick,
  });
}

function handleCellClick(index: number): void {
  if (isGivenCell(index)) {
    return;
  }

  selectCell(index);
  updateBoard();
}

function handleNewGameClick(): void {
  const puzzle = generatePuzzle();

  startNewGame(puzzle);
  updateBoard();
}

function handleThemeButtonClick(): void {
  toggleTheme(theme);
}

function handleKeyDown(event: KeyboardEvent): void {
  const selectedCellIndex = getSelectedCellIndex();

  if (selectedCellIndex === null || isGivenCell(selectedCellIndex)) {
    return;
  }

  const numericKey = Number(event.key);

  if (isPlayableCellValue(numericKey)) {
    setCellValue(selectedCellIndex, numericKey);
    updateBoard();
    return;
  }

  if (event.key === "Backspace" || event.key === "Delete" || event.key === "0") {
    setCellValue(selectedCellIndex, EMPTY_CELL);
    updateBoard();
  }
}

function initGame(): void {
  if (!hasSavedGame()) {
    startNewGame(generatePuzzle());
  }

  updateBoard();
}

newGame.addEventListener("click", handleNewGameClick);
theme.addEventListener("click", handleThemeButtonClick);
document.addEventListener("keydown", handleKeyDown);

applySavedTheme(theme);
initGame();
