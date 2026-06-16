import { generatePuzzle } from "./core/generator";
import {
  getCurrentBoard,
  getSelectedCellIndex,
  isGivenCell,
  selectCell,
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

function updateBoard(): void {
  renderBoard(boardElement, getCurrentBoard(), {
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
  toggleTheme(themeButton);
}

newGameButton.addEventListener("click", handleNewGameClick);
themeButton.addEventListener("click", handleThemeButtonClick);

applySavedTheme(themeButton);
handleNewGameClick();