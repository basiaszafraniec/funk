import { useCallback, useRef } from 'react'

export function useDrag(onPositionChange, onFocus) {
  const dragging = useRef(false)
  const startPos = useRef({ x: 0, y: 0 })
  const startMouse = useRef({ x: 0, y: 0 })
  const winWidth = useRef(200)
  const elRef = useRef(null)
  const clampSide = useRef(null)
  const bounceTimer = useRef(null)

  const onPointerDown = useCallback(
    (e) => {
      if (e.button !== undefined && e.button !== 0) return
      onFocus?.()

      // cancel any in-progress bounce so it doesn't fight the drag
      if (bounceTimer.current) {
        clearTimeout(bounceTimer.current)
        bounceTimer.current = null
      }
      if (elRef.current) delete elRef.current.dataset.bounce

      dragging.current = true
      clampSide.current = null
      startMouse.current = { x: e.clientX, y: e.clientY }

      const el = e.currentTarget.closest('[data-window]')
      if (el) {
        const rect = el.getBoundingClientRect()
        startPos.current = { x: rect.left, y: rect.top }
        winWidth.current = rect.width
        elRef.current = el
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

        // track last clamped side (horizontal takes priority for bounce)
        let side = null
        if (rawY < 0) side = 'top'
        else if (rawY > maxY) side = 'bottom'
        if (rawX < minX) side = 'left'
        else if (rawX > maxX) side = 'right'
        clampSide.current = side

        onPositionChange({
          x: Math.min(Math.max(rawX, minX), maxX),
          y: Math.min(Math.max(rawY, 0), maxY),
        })
      }

      const handleUp = () => {
        dragging.current = false

        if (clampSide.current && elRef.current) {
          const el = elRef.current
          el.dataset.bounce = clampSide.current
          bounceTimer.current = setTimeout(() => {
            delete el.dataset.bounce
            bounceTimer.current = null
          }, 400)
        }
        clampSide.current = null

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
