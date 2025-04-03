// consts
import { AvailableCardTypes } from "@/consts/types/bingo"
// ui
import Beam from "@/ui/Layout/Beam"
import { useMemo } from "react"
import Select from "@/ui/Form/Select"
import Pillar from "@/ui/Layout/Pillar"
// Styles and types
import { BingoActionPanelProps } from "./types"
import Button from "@/ui/Actions/Button"
import clsx from "clsx"

const CARD_TYPES = [
  { title: "3x3", value: 3 },
  { title: "4x4", value: 4 },
  { title: "5x5", value: 5 }
]

function BingoActionPanel({
  className,
  bingoCards,
  selectedCard,
  onSelectCard,
  selectCardType,
  onSelectCardType,
  shuffleItems
}: BingoActionPanelProps) {
  const formattedBingoSelectList = useMemo(() => {
    return bingoCards.map((card) => {
      return {
        title: card.name,
        value: card.fileName
      }
    })
  }, [bingoCards])
  return (
    <Beam className={clsx(className, "content-end")} bottomGap={"same-level"}>
      <Pillar sm={6}>
        <Select
          name="bingo"
          label="Select bingo card"
          options={formattedBingoSelectList}
          onChange={(name, value) => onSelectCard(value as string)}
          value={selectedCard}
          multiselect={false}
          onClear={() => onSelectCard("")}
          clearable
        />
      </Pillar>
      {onSelectCardType && (
        <Pillar sm={3} xs={4}>
          <Select
            name="bingoCardType"
            label="Select bingo card type"
            options={CARD_TYPES}
            onChange={(name, value) => onSelectCardType(value as number)}
            value={selectCardType}
            multiselect={false}
            onClear={() => onSelectCardType(3)}
            clearable
          />
        </Pillar>
      )}
      {shuffleItems && selectedCard && (
        <Pillar sm={3} xs={4}>
          <Button onClick={() => shuffleItems()}>Shuffle items</Button>
        </Pillar>
      )}
    </Beam>
  )
}
export default BingoActionPanel
