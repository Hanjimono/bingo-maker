// System
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
// Components
import BingoActionPanel from "@/components/BingoActionPanel"
import BingoCardView from "@/components/BingoCardView"
import BingoWinner from "@/components/BingoWinner"
// consts
import { BingoItem } from "@/consts/types/bingo"
// hooks
import {
  useBingoCardInfoWithChangeFunctions,
  useBingoList
} from "@/hooks/bingo"
// ui
import Beam from "@/ui/Layout/Beam"
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"
import Foundation from "@/ui/Layout/Foundation"
import Frame from "@/ui/Layout/Frame"
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Title from "@/ui/Presentation/Title"
import Portal from "@/ui/Skeleton/Portal"

const BARABAN_AUDIO_SRC = "/baraban_sg.mp3"

function getItemName(item: BingoItem): string {
  return typeof item === "string" ? item : item.name
}

export default function BingoPage() {
  const bingoCards = useBingoList()
  const [selectedFileName, setSelectedFileName] = useState<string>("")
  const [selectedCardType, setSelectedCardType] = useState<number>(3)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [
    bingoCard,
    isBingo,
    shuffleBingoCard,
    handleSelectItems,
    handleSwitchItems,
    startPlay,
    revealPhase,
    revealCurrentIndex,
    handleRevealSecretItem
  ] = useBingoCardInfoWithChangeFunctions(
    selectedFileName,
    bingoCards,
    selectedCardType
  )

  useEffect(() => {
    if (!revealPhase) return
    const audio = new Audio(BARABAN_AUDIO_SRC)
    audioRef.current = audio
    audio.loop = true
    audio.play().catch(() => {})
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [revealPhase])

  const handleChangeCardType = (cardType: number) => {
    setSelectedCardType(cardType)
    if (bingoCard) {
      shuffleBingoCard()
    }
  }

  const currentRevealItem =
    revealPhase && revealCurrentIndex < revealPhase.items.length
      ? revealPhase.items[revealCurrentIndex]
      : null

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
              onPlay={startPlay}
              isRevealing={!!revealPhase}
            />
          </Room>
          <HiddenRoom isShown={!!bingoCard}>
            {bingoCard && (
              <BingoCardView
                card={bingoCard}
                type={selectedCardType}
                onSelectItem={handleSelectItems}
                onSwitchItem={handleSwitchItems}
                onRevealSecretItem={handleRevealSecretItem}
              />
            )}
          </HiddenRoom>
          {revealPhase && (
            <Portal>
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
                <AnimatePresence mode="wait">
                  {currentRevealItem && (
                    <motion.div
                      key={revealCurrentIndex}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        transition: { duration: 0.4 }
                      }}
                      exit={{
                        scale: 1.2,
                        opacity: 0,
                        transition: { duration: 0.3 }
                      }}
                      className="text-center px-8"
                    >
                      <p className="text-4xl md:text-6xl font-bold text-white">
                        {getItemName(currentRevealItem)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Portal>
          )}
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
