import { useCallback, useRef } from 'react'

export function useDrag(onPositionChange, onFocus) {
  const dragging = useRef(false)
  const startPos = useRef({ x: 0, y: 0 })
  const startMouse = useRef({ x: 0, y: 0 })

  const onPointerDown = useCallback(
    (e) => {
      if (e.button !== undefined && e.button !== 0) return
      onFocus?.()
      dragging.current = true
      startMouse.current = { x: e.clientX, y: e.clientY }

      const el = e.currentTarget.closest('[data-window]')
      if (el) {
        const rect = el.getBoundingClientRect()
        startPos.current = { x: rect.left, y: rect.top }
      }

      const handleMove = (ev) => {
        if (!dragging.current) return
        const dx = ev.clientX - startMouse.current.x
        const dy = ev.clientY - startMouse.current.y
        const newX = Math.max(0, startPos.current.x + dx)
        const newY = Math.max(0, startPos.current.y + dy)
        const maxX = window.innerWidth - 200
        const maxY = window.innerHeight - 40
        onPositionChange({ x: Math.min(newX, maxX), y: Math.min(newY, maxY) })
      }

      const handleUp = () => {
        dragging.current = false
        window.removeEventListener('pointermove', handleMove)
        window.removeEventListener('pointerup', handleUp)
      }

      window.addEventListener('pointermove', handleMove)
      window.addEventListener('pointerup', handleUp)
    },
    [onPositionChange, onFocus]
  )

  return { onPointerDown }
}
