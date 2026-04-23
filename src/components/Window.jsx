import { useCallback } from 'react'
import { useWindows } from '../context/WindowContext'
import { useDrag } from '../hooks/useDrag'
import styles from './Window.module.css'

export default function Window({ id, title, position, zIndex, minimized, children, width, height }) {
  const { closeWindow, focusWindow, moveWindow } = useWindows()

  const handleMove = useCallback((pos) => moveWindow(id, pos), [id, moveWindow])
  const handleFocus = useCallback(() => focusWindow(id), [id, focusWindow])
  const { onPointerDown } = useDrag(handleMove, handleFocus)

  if (minimized) return null

  return (
    <div
      data-window
      className={styles.window}
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        width: width || 'fit-content',
        height: height || 'fit-content',
      }}
      onPointerDown={handleFocus}
    >
      <div className={styles.titlebar} onPointerDown={onPointerDown}>
        {/* left: 3 dots */}
        <div className={styles.dots}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>

        <span className={styles.title}>{title}</span>

        {/* right: decorative bar + close */}
        <div className={styles.rightControls}>
          <div className={styles.whiteBar} />
          <button
            className={styles.closeBtn}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => closeWindow(id)}
            aria-label="Close"
          >
            <div className={styles.xIcon} />
          </button>
        </div>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  )
}
