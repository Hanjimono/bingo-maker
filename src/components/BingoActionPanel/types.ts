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
  selectCardType?: AvailableCardTypes
  /** Function to set selected card type */
  onSelectCardType?: (cardType: AvailableCardTypes) => void
  /** Function to shuffle items */
  shuffleItems?: () => void
}
