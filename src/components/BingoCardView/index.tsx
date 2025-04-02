// System
import clsx from "clsx"
// Styles and types
import { BingoCardViewProps } from "./types"
import { useMemo } from "react"
import Beam from "@/ui/Layout/Beam"
import Title from "@/ui/Presentation/Title"
import Brick from "@/ui/Layout/Brick"
import Pillar from "@/ui/Layout/Pillar"
import { BingoItem } from "@/consts/types/bingo"
import Icon from "@/ui/Presentation/Icon"

function BingoCardView({ card, type, onSelectItem }: BingoCardViewProps) {
  const cardSize = useMemo(() => {
    switch (type) {
      case "3x3":
        return 3
      case "4x4":
        return 4
      case "5x5":
        return 5
      default:
        return 3
    }
  }, [type])
  const bingoItems = useMemo(() => {
    const allItems = card.items.slice(0, cardSize * cardSize)
    const bingoItems = []
    for (let i = 0; i < cardSize; i++) {
      bingoItems.push(allItems.slice(i * cardSize, (i + 1) * cardSize))
    }
    return bingoItems
  }, [card, cardSize])
  if (card.items.length < cardSize * cardSize) {
    return (
      <Beam>
        <Title size={4}>
          You don't have enough items for desired card size
        </Title>
      </Beam>
    )
  }
  return (
    <Beam withoutGap>
      {bingoItems.map((row, rowIndex) => {
        return (
          <Beam
            key={rowIndex}
            className="gap-almost-same min-w-2xl px-2"
            bottomGap="almost-same"
            withoutGap
            contentJustify="center"
          >
            {row.map((item, index) => {
              return (
                <BingoItemView
                  item={item}
                  onClick={() =>
                    onSelectItem(typeof item === "string" ? item : item.name)
                  }
                  isSelected={
                    card.selectedItems?.includes(
                      typeof item === "string" ? item : item.name
                    ) ?? false
                  }
                />
              )
            })}
          </Beam>
        )
      })}
    </Beam>
  )
}

function BingoItemView({
  item,
  onClick,
  isSelected = false
}: {
  item: BingoItem
  onClick?: () => void
  isSelected?: boolean
}) {
  return (
    <div
      onClick={onClick}
      key={typeof item == "string" ? item : item.name}
      className="relative w-24 h-24 border-2 border-form-border rounded-sm  flex items-center justify-center bg-block-500 hover:bg-block-400 cursor-pointer"
    >
      {typeof item == "string" ? item : item.name}
      {isSelected && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-sm">
          <Icon className="text-red-400" type="md" name="close" size={64} />
        </span>
      )}
    </div>
  )
}
export default BingoCardView
