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