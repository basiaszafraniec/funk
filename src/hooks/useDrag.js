import { useCallback, useRef } from 'react'

export function useDrag(onPositionChange, onFocus) {
  const dragging = useRef(false)
  const startPos = useRef({ x: 0, y: 0 })
  const startMouse = useRef({ x: 0, y: 0 })
  const elRef = useRef(null)

  const onPointerDown = useCallback(
    (e) => {
      if (e.button !== undefined && e.button !== 0) return
      onFocus?.()

      // cancel any in-progress snap transition
      if (elRef.current) elRef.current.style.transition = ''

      dragging.current = true
      startMouse.current = { x: e.clientX, y: e.clientY }

      const el = e.currentTarget.closest('[data-window]')
      if (el) {
        const rect = el.getBoundingClientRect()
        startPos.current = { x: rect.left, y: rect.top }
        elRef.current = el
      }

      const handleMove = (ev) => {
        if (!dragging.current) return
        const dx = ev.clientX - startMouse.current.x
        const dy = ev.clientY - startMouse.current.y
        onPositionChange({
          x: startPos.current.x + dx,
          y: startPos.current.y + dy,
        })
      }

      const handleUp = () => {
        dragging.current = false

        if (elRef.current) {
          const el = elRef.current
          const rect = el.getBoundingClientRect()
          const visible = rect.width * 0.2
          const clampedX = Math.min(Math.max(rect.left, -(rect.width - visible)), window.innerWidth - visible)
          const clampedY = Math.min(Math.max(rect.top, 0), window.innerHeight - 40)

          if (clampedX !== rect.left || clampedY !== rect.top) {
            el.style.transition = 'left 0.35s cubic-bezier(.34,1.56,.64,1), top 0.35s cubic-bezier(.34,1.56,.64,1)'
            onPositionChange({ x: clampedX, y: clampedY })
            setTimeout(() => { el.style.transition = '' }, 350)
          }
        }

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
