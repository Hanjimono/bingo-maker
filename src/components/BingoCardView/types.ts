import { AvailableCardTypes, BingoCard, BingoItem } from "@/consts/types/bingo"

export interface BingoCardViewProps {
  /** The bingo card info to display */
  card: BingoCard
  /** Desired card size */
  type: AvailableCardTypes
  /** Function to select an item */
  onSelectItem: (itemName: string) => void
  /** Function to switch item */
  onSwitchItem: (itemName: string, size: number) => void
}
