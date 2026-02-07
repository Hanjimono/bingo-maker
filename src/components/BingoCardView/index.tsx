// service
import { motion } from "framer-motion"
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
  onSwitchItem,
  onRevealSecretItem
}: BingoCardViewProps) {
  const cardSize = type
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
              const itemName = getItemName(item)
              const isSecret =
                card.secretItemNames?.includes(itemName) ?? false
              return (
                <BingoItemView
                  item={item}
                  onClick={() => {
                    if (isSecret && onRevealSecretItem) {
                      onRevealSecretItem(itemName)
                    } else {
                      onSelectItem(itemName)
                    }
                  }}
                  onLongPress={() =>
                    !isSecret &&
                    onSwitchItem(getItemName(item), cardSize * cardSize)
                  }
                  isSelected={
                    card.selectedItems?.includes(getItemName(item)) ?? false
                  }
                  isSecret={isSecret}
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
  isSelected = false,
  isSecret = false
}: {
  item: BingoItem
  onClick?: () => void
  onLongPress?: () => void
  isSelected?: boolean
  isSecret?: boolean
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
  const longPressEvent = useLongPress(
    isSecret ? () => {} : handleLongTouch,
    handleClick,
    true,
    800
  )
  return (
    <motion.div
      {...longPressEvent}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      key={getItemName(item)}
      className={
        isSecret
          ? "relative min-w-32 min-h-32 max-w-32 max-h-32 border-2 border-amber-500 rounded-sm flex items-center justify-center bg-amber-950/80 hover:bg-amber-900/80 cursor-pointer content-center text-center p-3 overflow-hidden break-after-auto text-amber-200 font-semibold"
          : "relative min-w-32 min-h-32 max-w-32 max-h-32 border-2 border-form-border rounded-sm  flex items-center justify-center bg-block-500 hover:bg-block-400 cursor-pointer content-center text-center p-3 overflow-hidden break-after-auto"
      }
    >
      {isSecret ? "Secret" : getItemName(item)}
      {isSelected && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-sm">
          <Icon className="text-red-400" type="md" name="close" size={128} />
        </span>
      )}
    </motion.div>
  )
}
export default BingoCardView
