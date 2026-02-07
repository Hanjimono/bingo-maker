// System
import { useCallback, useEffect, useState } from "react"
// Lib
import { trpc } from "@/lib/trpc"
// Types
import {
  BingoCard,
  BingoCardList,
  BingoItem,
  BingoWinners
} from "@/consts/types/bingo"

const shuffleBingoItems = (bingoItems: BingoItem[]): BingoItem[] => {
  const shuffledItems = [...bingoItems].sort(() => Math.random() - 0.5)
  return shuffledItems
}

export const useBingoList = (): BingoCardList => {
  const { data: bingoList = [] } = trpc.bingo.getList.useQuery()
  return bingoList
}

export const useBingoCardInfoWithChangeFunctions = (
  fileName: string,
  list: BingoCardList,
  cardSize: number
): [
  BingoCard | null,
  boolean,
  () => void,
  (itemName: string) => void,
  (itemName: string, cardSize: number) => void,
  () => void,
  { items: BingoItem[]; secretIndex: number } | null,
  number,
  (itemName: string) => void
] => {
  const [bingoCard, setBingoCard] = useState<BingoCard | null>(null)
  const [isBingo, setIsBingo] = useState(false)

  const { data: bingoItems, error } = trpc.bingo.getCard.useQuery(
    { fileName },
    {
      enabled: !!fileName
    }
  )

  useEffect(() => {
    if (!fileName || error) {
      setBingoCard(null)
      return
    }
    if (!bingoItems) {
      return
    }
    const bingoCardInfo = list.find((card) => card.fileName === fileName)
    if (!bingoCardInfo) {
      setBingoCard(null)
      return
    }
    setBingoCard({
      ...bingoCardInfo,
      items: shuffleBingoItems(bingoItems),
      selectedItems: [],
      winners: {
        rows: [],
        columns: [],
        diagonals: []
      }
    })
  }, [fileName, bingoItems, list, error])
  const shuffleBingoCard = useCallback(() => {
    if (!bingoCard) {
      return null
    }
    const shuffledItems = shuffleBingoItems(bingoCard.items)
    setBingoCard({
      ...bingoCard,
      items: shuffledItems,
      selectedItems: [],
      winners: {
        rows: [],
        columns: [],
        diagonals: []
      }
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
      const updatedWinners = calculateBingoWinners(
        bingoCard.items,
        updatedSelectedItems,
        bingoCard.winners
      )
      setBingoCard({
        ...bingoCard,
        selectedItems: updatedSelectedItems,
        winners: updatedWinners
      })
    },
    [bingoCard]
  )
  const calculateBingoWinners = useCallback(
    (
      bingoItems: BingoItem[],
      selectedItems: string[],
      previousWinners?: BingoWinners
    ) => {
      const currentWinners: BingoWinners = {
        rows: Array(cardSize).fill(false),
        columns: Array(cardSize).fill(false),
        diagonals: Array(2).fill(false)
      }
      let hasBingo = false
      const currentBingoItems = bingoItems.slice(0, cardSize * cardSize)
      const bingoItemsMatrix: BingoItem[][] = []
      for (let i = 0; i < cardSize; i++) {
        bingoItemsMatrix.push(
          currentBingoItems.slice(i * cardSize, (i + 1) * cardSize)
        )
      }
      console.log("🚀 ---------------------------------------🚀")
      console.log("🚀 ~ bingoItemsMatrix:", bingoItemsMatrix)
      console.log("🚀 ---------------------------------------🚀")
      for (let i = 0; i < cardSize; i++) {
        currentWinners.rows[i] = bingoItemsMatrix[i].every((item) =>
          selectedItems.includes(typeof item === "string" ? item : item.name)
        )
        if (
          currentWinners.rows[i] === true &&
          (!previousWinners || !!!previousWinners.rows[i])
        ) {
          hasBingo = true
        }
      }
      for (let i = 0; i < cardSize; i++) {
        currentWinners.columns[i] = bingoItemsMatrix.every((row) => {
          const item = row[i]
          console.log(
            "🚀 ------------------------------------------------------------------🚀"
          )
          console.log(
            "🚀 ~ currentWinners.columns[i]=bingoItemsMatrix.every ~ item:",
            item
          )
          console.log(
            "🚀 ------------------------------------------------------------------🚀"
          )
          return selectedItems.includes(
            typeof item === "string" ? item : item.name
          )
        })
        if (
          currentWinners.columns[i] === true &&
          (!previousWinners || !!!previousWinners.columns[i])
        ) {
          hasBingo = true
        }
      }
      currentWinners.diagonals[0] = bingoItemsMatrix.every((row, i) => {
        const item = row[i]
        return selectedItems.includes(
          typeof item === "string" ? item : item.name
        )
      })
      if (
        currentWinners.diagonals[0] === true &&
        (!previousWinners || !!!previousWinners.diagonals[0])
      ) {
        hasBingo = true
      }
      currentWinners.diagonals[1] = bingoItemsMatrix.every((row, i) => {
        const item = row[cardSize - 1 - i]
        return selectedItems.includes(
          typeof item === "string" ? item : item.name
        )
      })
      if (
        currentWinners.diagonals[1] === true &&
        (!previousWinners || !!!previousWinners.diagonals[1])
      ) {
        hasBingo = true
      }
      if (hasBingo) {
        setIsBingo(true)
        setTimeout(() => {
          setIsBingo(false)
        }, 5000)
      }
      return currentWinners
    },
    [cardSize]
  )
  const handleSwitchItem = useCallback(
    (itemName: string, cardSize: number) => {
      if (!bingoCard) {
        return null
      }
      if (!bingoCard.items || bingoCard.items.length <= cardSize) {
        return null
      }
      const selectedItems = bingoCard.selectedItems || []
      const updatedSelectedItems = selectedItems.includes(itemName)
        ? selectedItems.filter((item) => item !== itemName)
        : [...selectedItems]

      const bingoItems = [...bingoCard.items]
      const itemIndex = bingoItems.findIndex((item) =>
        typeof item === "string" ? item === itemName : item.name === itemName
      )

      if (itemIndex !== -1) {
        const randomIndexGreaterThanCardSize =
          Math.floor(Math.random() * (bingoItems.length - cardSize - 1)) +
          cardSize +
          1
        const temp = bingoItems[randomIndexGreaterThanCardSize]
        bingoItems[randomIndexGreaterThanCardSize] = bingoItems[itemIndex]
        bingoItems[itemIndex] = temp
      }
      const updatedWinners = calculateBingoWinners(
        bingoItems,
        updatedSelectedItems,
        bingoCard.winners
      )
      setBingoCard({
        ...bingoCard,
        items: bingoItems,
        selectedItems: updatedSelectedItems,
        winners: updatedWinners
      })
    },
    [bingoCard]
  )
  const [revealPhase, setRevealPhase] = useState<{
    items: BingoItem[]
    secretIndex: number
  } | null>(null)
  const [revealCurrentIndex, setRevealCurrentIndex] = useState(0)

  const startPlay = useCallback(() => {
    if (!bingoCard) return
    const shuffledItems = shuffleBingoItems(bingoCard.items)
    const cardSizeSq = cardSize * cardSize
    const visibleItems = shuffledItems.slice(0, cardSizeSq)
    const secretIndex = Math.floor(Math.random() * visibleItems.length)
    const formattedVisibleItems = visibleItems.map((item, idx) => {
      if (idx === secretIndex) {
        return "Секрет"
      }
      return item
    })
    setRevealPhase({ items: formattedVisibleItems, secretIndex })
    setRevealCurrentIndex(0)
  }, [bingoCard, cardSize])

  useEffect(() => {
    if (!revealPhase) return
    const total = revealPhase.items.length
    if (revealCurrentIndex >= total) {
      const cardInfo = list.find((c) => c.fileName === fileName)
      if (cardInfo) {
        const secretName =
          typeof revealPhase.items[revealPhase.secretIndex] === "string"
            ? (revealPhase.items[revealPhase.secretIndex] as string)
            : (revealPhase.items[revealPhase.secretIndex] as { name: string })
                .name
        setBingoCard({
          ...cardInfo,
          items: revealPhase.items,
          selectedItems: [],
          winners: {
            rows: Array(cardSize).fill(false),
            columns: Array(cardSize).fill(false),
            diagonals: Array(2).fill(false)
          },
          secretItemNames: [secretName]
        })
      }
      setRevealPhase(null)
      setRevealCurrentIndex(0)
      return
    }
    const t = setTimeout(() => {
      setRevealCurrentIndex((i) => i + 1)
    }, 1500)
    return () => clearTimeout(t)
  }, [revealPhase, revealCurrentIndex, list, fileName, cardSize])

  const handleRevealSecretItem = useCallback(
    (itemName: string) => {
      if (!bingoCard?.secretItemNames) return
      const next = bingoCard.secretItemNames.filter((n) => n !== itemName)
      setBingoCard({
        ...bingoCard,
        secretItemNames: next.length ? next : undefined
      })
    },
    [bingoCard]
  )

  return [
    bingoCard,
    isBingo,
    shuffleBingoCard,
    handleSelectItem,
    handleSwitchItem,
    startPlay,
    revealPhase,
    revealCurrentIndex,
    handleRevealSecretItem
  ]
}
