import BingoActionPanel from "@/components/BingoActionPanel"
import BingoCardView from "@/components/BingoCardView"
import BingoWinner from "@/components/BingoWinner"
import { AvailableCardTypes, BingoItem } from "@/consts/types/bingo"
import {
  useBingoCardInfoWithChangeFunctions,
  useBingoList
} from "@/hooks/bingo"
import Beam from "@/ui/Layout/Beam"
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"
import Foundation from "@/ui/Layout/Foundation"
import Frame from "@/ui/Layout/Frame"
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Title from "@/ui/Presentation/Title"
import Portal from "@/ui/Skeleton/Portal"
import { useState } from "react"

export default function BingoPage() {
  const bingoCards = useBingoList()
  const [selectedFileName, setSelectedFileName] = useState<string>("")
  const [selectedCardType, setSelectedCardType] = useState<number>(3)
  const [
    bingoCard,
    isBingo,
    shuffleBingoCard,
    handleSelectItems,
    handleSwitchItems
  ] = useBingoCardInfoWithChangeFunctions(
    selectedFileName,
    bingoCards,
    selectedCardType
  )
  const handleChangeCardType = (cardType: number) => {
    setSelectedCardType(cardType)
    if (bingoCard) {
      shuffleBingoCard()
    }
  }
  return (
    <Foundation>
      <Frame>
        <WallDecorated>
          <Beam>
            <Title uppercase>Bingo game</Title>
          </Beam>
          <Room>
            <BingoActionPanel
              bingoCards={bingoCards}
              selectedCard={selectedFileName}
              onSelectCard={setSelectedFileName}
              selectCardType={selectedCardType}
              onSelectCardType={handleChangeCardType}
              shuffleItems={shuffleBingoCard}
            />
          </Room>
          <HiddenRoom isShown={!!bingoCard}>
            {bingoCard && (
              <BingoCardView
                card={bingoCard}
                type={selectedCardType}
                onSelectItem={handleSelectItems}
                onSwitchItem={handleSwitchItems}
              />
            )}
          </HiddenRoom>
          {isBingo && (
            <Portal>
              <BingoWinner />
            </Portal>
          )}
        </WallDecorated>
      </Frame>
    </Foundation>
  )
}
