import { AvailableCardTypes, BingoCardList } from "@/consts/types/bingo"

export interface BingoActionPanelProps {
  /** Classes */
  className?: string
  /** List of bingo cards */
  bingoCards: BingoCardList
  /** Selected card */
  selectedCard?: string
  /** Function to set selected card */
  onSelectCard: (cardName: string) => void
  /** Selected card type */
  selectCardType?: number
  /** Function to set selected card type */
  onSelectCardType?: (cardType: number) => void
  /** Function to shuffle items */
  shuffleItems?: () => void
}
