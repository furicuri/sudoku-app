import { generatePuzzle } from "./core/generator";
import {
  getCurrentBoard,
  getSelectedCellIndex,
  isGivenCell,
  selectCell,
  startNewGame,
} from "./state/gameState";
import { loadPuzzle, savePuzzle } from "./state/storage";

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

  savePuzzle(puzzle);
  startNewGame(puzzle);
  updateBoard();
}

function handleThemeButtonClick(): void {
  toggleTheme(theme);
}

function initGame(): void {
  const savedPuzzle = loadPuzzle();

  if (savedPuzzle) {
    startNewGame(savedPuzzle);
    updateBoard();
    return;
  }

  handleNewGameClick();
}

newGame.addEventListener("click", handleNewGameClick);
theme.addEventListener("click", handleThemeButtonClick);

applySavedTheme(theme);
initGame();