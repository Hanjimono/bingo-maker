export interface BingoCardBase {
  /** Name that will be displayed */
  name: string
  /** Path to the json data file */
  fileName: string
  /** Name of the style theme */
  theme?: string
}

export type BingoCardList = BingoCardBase[]

export interface DetailedBingoItem {
  /** Name of the item */
  name: string
  /** Detailed description */
  description?: string
}

/** It can be just string or detailed object */
export type BingoItem = string | DetailedBingoItem

/** Bingo winners via rows, columns and diagonals.
 * If item[idx] is true, than it's winner
 */
export interface BingoWinners {
  rows: boolean[]
  columns: boolean[]
  diagonals: boolean[]
}

export interface BingoCard extends BingoCardBase {
  /** List of bingo items */
  items: BingoItem[]
  /** List of bingo items that are already selected */
  selectedItems?: string[]
  /** Winners calculated from selected items */
  winners?: BingoWinners
}

export type AvailableCardTypes = "3x3" | "4x4" | "5x5"

export interface BingoWinners {
  rows: boolean[]
  columns: boolean[]
  diagonals: boolean[]
}
