import BingoActionPanel from "@/components/BingoActionPanel"
import BingoCardView from "@/components/BingoCardView"
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
import { useState } from "react"

export default function BingoPage() {
  const bingoCards = useBingoList()
  const [selectedFileName, setSelectedFileName] = useState<string>("")
  const [selectedCardType, setSelectedCardType] =
    useState<AvailableCardTypes>("3x3")
  const [bingoCard, shuffleBingoCard, handleSelectItems, handleSwitchItems] =
    useBingoCardInfoWithChangeFunctions(selectedFileName, bingoCards)
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
              onSelectCardType={setSelectedCardType}
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
        </WallDecorated>
      </Frame>
    </Foundation>
  )
}
