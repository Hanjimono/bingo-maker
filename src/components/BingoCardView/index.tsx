// consts
import { BingoItem } from "@/consts/types/bingo"
// hooks
import useLongPress from "@/hooks/longerPress"
// ui
import Icon from "@/ui/Presentation/Icon"
import Beam from "@/ui/Layout/Beam"
import Title from "@/ui/Presentation/Title"
// Styles and types
import { BingoCardViewProps } from "./types"
import { useMemo } from "react"

const getItemName = (item: BingoItem) => {
  if (typeof item === "string") {
    return item
  } else {
    return item.name
  }
}

function BingoCardView({
  card,
  type,
  onSelectItem,
  onSwitchItem
}: BingoCardViewProps) {
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
                  onClick={() => onSelectItem(getItemName(item))}
                  onLongPress={() =>
                    onSwitchItem(getItemName(item), cardSize * cardSize)
                  }
                  isSelected={
                    card.selectedItems?.includes(getItemName(item)) ?? false
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
  onLongPress,
  isSelected = false
}: {
  item: BingoItem
  onClick?: () => void
  onLongPress?: () => void
  isSelected?: boolean
}) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }
  const handleLongTouch = () => {
    if (onLongPress) {
      onLongPress()
    }
  }
  const longPressEvent = useLongPress(handleLongTouch, handleClick, true, 300)
  return (
    <div
      {...longPressEvent}
      key={getItemName(item)}
      className="relative w-32 h-32 border-2 border-form-border rounded-sm  flex items-center justify-center bg-block-500 hover:bg-block-400 cursor-pointer content-center text-center p-3 overflow-hidden break-after-auto"
    >
      {getItemName(item)}
      {isSelected && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-sm">
          <Icon className="text-red-400" type="md" name="close" size={128} />
        </span>
      )}
    </div>
  )
}
export default BingoCardView
