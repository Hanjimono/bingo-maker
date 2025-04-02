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

export interface BingoCard extends BingoCardBase {
  /** List of bingo items */
  items: BingoItem[]
  /** List of bingo items that are already selected */
  selectedItems?: string[]
}

export type AvailableCardTypes = "3x3" | "4x4" | "5x5"
