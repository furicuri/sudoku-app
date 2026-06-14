import {
  getCurrentBoard,
  getSelectedCellIndex,
  isGivenCell,
  selectCell,
} from "./state/gameState";

import { renderBoard } from "./ui/renderBoard";

const boardElement = document.querySelector<HTMLDivElement>(".board");

if (!boardElement) {
  throw new Error("Board element not found");
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

updateBoard();