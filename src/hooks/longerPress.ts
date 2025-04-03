import { useCallback, useRef, useState } from "react"

const isTouchEvent = (event: React.MouseEvent | React.TouchEvent) => {
  return "touches" in event
}

const preventDefault = (event: React.MouseEvent | React.TouchEvent) => {
  if (!isTouchEvent(event)) return

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault()
  }
}

const useLongPress = (
  onLongPress: (event: React.MouseEvent | React.TouchEvent) => void,
  onClick: (event: React.MouseEvent | React.TouchEvent) => void = () => {},
  shouldPreventDefault = true,
  delay = 300
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false)
  const [pressTimeout, setPressTimeout] = useState<number>()

  const start = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (shouldPreventDefault) {
        event.preventDefault()
      }
      if (pressTimeout) {
        clearTimeout(pressTimeout)
        setPressTimeout(undefined)
      }
      setPressTimeout(
        setTimeout(() => {
          onLongPress(event)
          setLongPressTriggered(true)
        }, delay)
      )
    },
    [onLongPress, delay, shouldPreventDefault]
  )

  const clear = useCallback(
    (event: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
      if (shouldPreventDefault) {
        event.preventDefault()
      }
      if (pressTimeout) {
        clearTimeout(pressTimeout)
        setPressTimeout(undefined)
      }
      if (longPressTriggered) {
        setLongPressTriggered(false)
        return
      }
      if (shouldTriggerClick) {
        onClick(event)
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  )

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent) => clear(e)
  }
}

export default useLongPress
