import { useCallback, useRef } from 'react'

export function useDrag(onPositionChange, onFocus) {
  const dragging = useRef(false)
  const startPos = useRef({ x: 0, y: 0 })
  const startMouse = useRef({ x: 0, y: 0 })
  const winWidth = useRef(200)

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
        winWidth.current = rect.width
      }

      const handleMove = (ev) => {
        if (!dragging.current) return
        const dx = ev.clientX - startMouse.current.x
        const dy = ev.clientY - startMouse.current.y
        const rawX = startPos.current.x + dx
        const rawY = startPos.current.y + dy

        const visible = winWidth.current * 0.2
        const minX = -(winWidth.current - visible)
        const maxX = window.innerWidth - visible
        const maxY = window.innerHeight - 40

        onPositionChange({
          x: Math.min(Math.max(rawX, minX), maxX),
          y: Math.min(Math.max(rawY, 0), maxY),
        })
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
