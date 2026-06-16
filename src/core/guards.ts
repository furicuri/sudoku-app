import type { Board, CellValue } from "./types";
import { CELLS_COUNT, MAX_CELL_VALUE, MIN_CELL_VALUE } from "./consts";

export function isCellValue(value: unknown): value is CellValue {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    value <= MAX_CELL_VALUE
  );
}

export function isPlayableCellValue(value: unknown): value is Exclude<CellValue, 0> {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= MIN_CELL_VALUE &&
    value <= MAX_CELL_VALUE
  );
}

export function isBoard(value: unknown): value is Board {
  return (
    Array.isArray(value) &&
    value.length === CELLS_COUNT &&
    value.every(isCellValue)
  );
}
