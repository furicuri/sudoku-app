const boardElement = document.querySelector<HTMLDivElement>(".board");

if (!boardElement) {
  throw new Error("Board element not found");
}

const puzzle: number[] = [
    5, 3, 0, 0, 7, 0, 0, 0, 0,
    6, 0, 0, 1, 9, 5, 0, 0, 0,
    0, 9, 8, 0, 0, 0, 0, 6, 0,

    8, 0, 0, 0, 6, 0, 0, 0, 3,
    4, 0, 0, 8, 0, 3, 0, 0, 1,
    7, 0, 0, 0, 2, 0, 0, 0, 6,

    0, 6, 0, 0, 0, 0, 2, 8, 0,
    0, 0, 0, 4, 1, 9, 0, 0, 5,
    0, 0, 0, 0, 8, 0, 0, 7, 9
];

let selectedCellElement: number | null = null;

function renderBoard(board: number[]) {
    if (!boardElement) {
        return;
    }
    
    boardElement.innerHTML = "";
    for (let i = 0; i < board.length; i++) {
        const cellValue = board[i];
        const cellElement = document.createElement("button");

        cellElement.classList.add("cell");
        cellElement.type = "button";
        cellElement.dataset.index = String(i);
        
        if (cellValue !== 0) {
            cellElement.textContent = String(cellValue);
            cellElement.classList.add("given");
        }

        cellElement.addEventListener("click", () => {
            selectCell(i);
        });

        boardElement.appendChild(cellElement);
    }
};

function selectCell(index: number) {
  selectedCellElement = index;

  const cells = document.querySelectorAll<HTMLButtonElement>(".cell");

  cells.forEach((cell) => {
    cell.classList.remove("cell--selected");
  });

  const selectedCell = cells[index];

  if (selectedCell) {
    selectedCell.classList.add("cell--selected");
  }
}

renderBoard(puzzle);