import { BingoCard, BingoCardList, BingoItem } from "@/consts/types/bingo"
import { useCallback, useEffect, useState } from "react"

const PATH_TO_BINGO_CARDS_LIST = "/bingoList.json"
const PATH_TO_BINGO_CARDS = "/bingo"

const shuffleBingoItems = (bingoItems: BingoItem[]): BingoItem[] => {
  const shuffledItems = [...bingoItems].sort(() => Math.random() - 0.5)
  return shuffledItems
}

const getBingoCardsList = async (): Promise<BingoCardList> => {
  const result = await fetch(PATH_TO_BINGO_CARDS_LIST)
  if (!result.ok) {
    return []
  }
  return await result.json()
}

export const useBingoList = (): BingoCardList => {
  const [bingoList, setBingoList] = useState<BingoCardList>([])
  useEffect(() => {
    const getInfo = async () => {
      const bingoCards = await getBingoCardsList()
      setBingoList(bingoCards)
    }
    getInfo()
  }, [])
  return bingoList
}

export const useBingoCardInfoWithChangeFunctions = (
  fileName: string,
  list: BingoCardList
): [BingoCard | null, () => void, (itemName: string) => void] => {
  const [bingoCard, setBingoCard] = useState<BingoCard | null>(null)
  useEffect(() => {
    const getInfo = async () => {
      if (!fileName) {
        setBingoCard(null)
        return null
      }
      const result = await fetch(`${PATH_TO_BINGO_CARDS}/${fileName}`)
      if (!result.ok) {
        setBingoCard(null)
        return null
      }
      const bingoItems = (await result.json()) as BingoItem[]
      const bingoCardInfo = list.find((card) => card.fileName === fileName)
      if (!bingoCardInfo) {
        setBingoCard(null)
        return null
      }
      setBingoCard({
        ...bingoCardInfo,
        items: shuffleBingoItems(bingoItems),
        selectedItems: []
      })
    }
    getInfo()
  }, [fileName, list])
  const shuffleBingoCard = useCallback(() => {
    if (!bingoCard) {
      return null
    }
    const shuffledItems = shuffleBingoItems(bingoCard.items)
    setBingoCard({
      ...bingoCard,
      items: shuffledItems,
      selectedItems: []
    })
  }, [bingoCard])
  const handleSelectItem = useCallback(
    (itemName: string) => {
      if (!bingoCard) {
        return null
      }
      const selectedItems = bingoCard.selectedItems || []
      const updatedSelectedItems = selectedItems.includes(itemName)
        ? selectedItems.filter((item) => item !== itemName)
        : [...selectedItems, itemName]
      setBingoCard({
        ...bingoCard,
        selectedItems: updatedSelectedItems
      })
    },
    [bingoCard]
  )
  return [bingoCard, shuffleBingoCard, handleSelectItem]
}
