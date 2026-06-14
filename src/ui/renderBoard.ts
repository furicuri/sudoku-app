import type { Board, CellIndex } from "../core/types"; 
import { isGivenCell } from "../state/gameState";

type RenderBoardOptions = { 
  selectedCellIndex: CellIndex | null;
  onCellClick: (index: CellIndex) => void;
};

export function renderBoard( 
  boardElement: HTMLDivElement,
  board: Board,
  options: RenderBoardOptions
): void {
  boardElement.innerHTML = "";

  for (let i = 0; i < board.length; i++) { 
    const cellValue = board[i];

    const cellElement = document.createElement("button"); 

    cellElement.classList.add("cell"); 
    cellElement.type = "button";
    cellElement.dataset.index = String(i);

    if (cellValue !== 0) { 
      cellElement.textContent = String(cellValue);
    }

    if (isGivenCell(i)) { 
      cellElement.classList.add("given");
    }

    if (options.selectedCellIndex === i) { 
      cellElement.classList.add("cell--selected");
    }

    cellElement.addEventListener("click", () => { //
      options.onCellClick(i);
    });

    boardElement.appendChild(cellElement); 
  }
}