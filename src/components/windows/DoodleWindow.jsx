import { useRef, useState, useEffect } from 'react'
import { useWindows } from '../../context/WindowContext'
import styles from './DoodleWindow.module.css'

const COLORS = ['#430396', '#f891e9', '#a5e0ff', '#b8f0b8', '#fff3a0', '#1a0533', '#fffcee', '#e53535']
const GRID = 24
const CELL = 16

export default function DoodleWindow() {
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const [activeColor, setActiveColor] = useState(COLORS[0])
  const [erasing, setErasing] = useState(false)
  const [placed, setPlaced] = useState(false)
  const { addSticker } = useWindows()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#fffcee'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawGrid(ctx)
  }, [])

  function drawGrid(ctx) {
    ctx.strokeStyle = 'rgba(67,3,150,0.1)'
    ctx.lineWidth = 0.5
    for (let x = 0; x <= GRID; x++) {
      ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, GRID * CELL); ctx.stroke()
    }
    for (let y = 0; y <= GRID; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(GRID * CELL, y * CELL); ctx.stroke()
    }
  }

  function paint(e) {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const x = Math.floor(((clientX - rect.left) * scaleX) / CELL)
    const y = Math.floor(((clientY - rect.top) * scaleY) / CELL)
    if (x < 0 || y < 0 || x >= GRID || y >= GRID) return
    ctx.fillStyle = erasing ? '#fffcee' : activeColor
    ctx.fillRect(x * CELL, y * CELL, CELL, CELL)
    ctx.strokeStyle = 'rgba(67,3,150,0.1)'
    ctx.lineWidth = 0.5
    ctx.strokeRect(x * CELL, y * CELL, CELL, CELL)
    setPlaced(false)
  }

  function clear() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#fffcee'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawGrid(ctx)
    setPlaced(false)
  }

  function addToDesktop() {
    const dataUrl = canvasRef.current.toDataURL()
    addSticker(dataUrl)
    setPlaced(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.colorPicker}>
          {COLORS.map((c) => (
            <button
              key={c}
              className={`${styles.colorSwatch} ${activeColor === c && !erasing ? styles.activeSwatch : ''}`}
              style={{ background: c, border: `2px solid ${c === '#fffcee' ? '#430396' : c}` }}
              onClick={() => { setActiveColor(c); setErasing(false) }}
              aria-label={`color ${c}`}
            />
          ))}
        </div>
        <div className={styles.toolBtns}>
          <button
            className={`${styles.toolBtn} ${erasing ? styles.activeToolBtn : ''}`}
            onClick={() => setErasing(!erasing)}
          >⌫</button>
          <button className={styles.toolBtn} onClick={clear}>✕</button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={GRID * CELL}
        height={GRID * CELL}
        className={styles.canvas}
        onPointerDown={(e) => { drawing.current = true; paint(e) }}
        onPointerMove={(e) => { if (drawing.current) paint(e) }}
        onPointerUp={() => { drawing.current = false }}
        onPointerLeave={() => { drawing.current = false }}
        style={{ cursor: erasing ? 'cell' : 'crosshair' }}
      />

      <button className={`${styles.stickerBtn} ${placed ? styles.stickerBtnPlaced : ''}`} onClick={addToDesktop}>
        {placed ? '✓ placed on desktop!' : '📌 add to desktop'}
      </button>
    </div>
  )
}
