// main.ts
//   ↓
// createGameState()
//   ↓
// generator.ts создаёт puzzle + solution
//   ↓
// renderBoard.ts показывает поле
//   ↓
// пользователь кликает клетку
//   ↓
// gameState.ts обновляет selectedCell
//   ↓
// пользователь вводит число
//   ↓
// validator.ts проверяет ход
//   ↓
// gameState.ts обновляет currentBoard
//   ↓
// renderBoard.ts перерисовывает поле
//   ↓
// storage.ts сохраняет игру

// core → чистая логика
// state → состояние партии
// ui → отображение
// main → запуск

//BOARD
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
        
        if (cellValue !== 0) {
            cellElement.textContent = cellValue.toString();
            cellElement.classList.add("given");
        } else {
            cellElement.setAttribute("contenteditable", "true");
        }

        boardElement.appendChild(cellElement);
    }
};

renderBoard(puzzle);