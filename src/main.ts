import { generatePuzzle } from "./core/generator";
import {
  getCurrentBoard,
  getSelectedCellIndex,
  isGivenCell,
  selectCell,
  startNewGame,
} from "./state/gameState";

import { renderBoard } from "./ui/renderBoard";

const boardElement = document.querySelector<HTMLDivElement>(".board") as HTMLDivElement;
const newGameButton = document.querySelector<HTMLButtonElement>(".new-game-button") as HTMLButtonElement;

if (!boardElement) {
  throw new Error("Board element not found");
}
if (!newGameButton) {
  throw new Error("New game button not found");
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

newGameButton.addEventListener("click", handleNewGameClick);

handleNewGameClick();