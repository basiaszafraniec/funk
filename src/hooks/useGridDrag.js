import { useState, useCallback, useRef } from 'react'

const CELL_W = 90
const CELL_H = 90
const OFFSET_X = 20
const OFFSET_Y = 24
const DRAG_THRESHOLD = 5  // px of movement before it counts as a drag

function snap(x, y) {
  return {
    x: Math.round((x - OFFSET_X) / CELL_W) * CELL_W + OFFSET_X,
    y: Math.round((y - OFFSET_Y) / CELL_H) * CELL_H + OFFSET_Y,
  }
}

function clamp(x, y) {
  const maxX = window.innerWidth - CELL_W - OFFSET_X
  const maxY = window.innerHeight - CELL_H - 36
  return {
    x: Math.max(OFFSET_X, Math.min(maxX, x)),
    y: Math.max(OFFSET_Y, Math.min(maxY, y)),
  }
}

export function useGridDrag(initialPositions) {
  const [positions, setPositions] = useState(initialPositions)
  const [draggingId, setDraggingId] = useState(null)
  const [livePos, setLivePos] = useState(null)
  // ref so it stays accurate across the pointerup → click event sequence
  const movedRef = useRef(false)

  const onPointerDown = useCallback((id, e) => {
    if (e.button !== 0) return
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)

    const cur = positions[id]
    const originX = e.clientX
    const originY = e.clientY
    const startX = e.clientX - cur.x
    const startY = e.clientY - cur.y
    movedRef.current = false

    setDraggingId(id)
    setLivePos({ x: cur.x, y: cur.y })

    const onMove = (ev) => {
      if (
        !movedRef.current &&
        (Math.abs(ev.clientX - originX) > DRAG_THRESHOLD ||
         Math.abs(ev.clientY - originY) > DRAG_THRESHOLD)
      ) {
        movedRef.current = true
      }
      const raw = { x: ev.clientX - startX, y: ev.clientY - startY }
      setLivePos(clamp(raw.x, raw.y))
    }

    const onUp = (ev) => {
      const raw = { x: ev.clientX - startX, y: ev.clientY - startY }
      const clamped = clamp(raw.x, raw.y)
      const snapped = snap(clamped.x, clamped.y)
      setPositions(prev => {
        const occupied = Object.entries(prev).some(
          ([otherId, pos]) => otherId !== id && pos.x === snapped.x && pos.y === snapped.y
        )
        return occupied ? prev : { ...prev, [id]: snapped }
      })
      setDraggingId(null)
      setLivePos(null)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      // reset AFTER the click event fires (click comes after pointerup)
      setTimeout(() => { movedRef.current = false }, 0)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [positions])

  function getPos(id) {
    if (draggingId === id && livePos) return livePos
    return positions[id]
  }

  // call this inside onClick to know if the interaction was a drag
  function wasDragged() {
    return movedRef.current
  }

  return { getPos, onPointerDown, draggingId, wasDragged }
}
