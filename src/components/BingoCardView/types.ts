import { AvailableCardTypes, BingoCard, BingoItem } from "@/consts/types/bingo"

export interface BingoCardViewProps {
  /** The bingo card info to display */
  card: BingoCard
  /** Desired card size */
  type: number
  /** Function to select an item */
  onSelectItem: (itemName: string) => void
  /** Function to switch item */
  onSwitchItem: (itemName: string, size: number) => void
  /** Function to reveal a secret item (show its name) */
  onRevealSecretItem?: (itemName: string) => void
}
