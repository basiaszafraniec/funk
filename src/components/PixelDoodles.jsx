import { useState, useCallback } from 'react'
import styles from './PixelDoodles.module.css'

const D='#430396', W='#fffcee', V='#c4a0f5', B='#a5e0ff',
      Y='#fff6a3', K='#ff5bec', S='#ffa5e0', M='#96ffd8', _=null

const PRESET_DOODLES = [
  {
    xPct: 0.78, yPct: 0.12, rotate: '-3deg',
    pixels: [
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,V,V,V,V,V,V,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,V,B,B,B,B,B,V,V,_,_],
      [_,_,_,_,_,_,_,_,_,_,V,B,B,B,B,B,V,V,_,_],
      [_,_,_,D,D,_,_,_,_,_,V,B,M,B,M,B,V,V,_,_],
      [_,_,D,V,D,D,D,_,_,_,V,B,B,B,B,B,V,V,_,_],
      [_,_,D,D,V,D,D,D,_,_,V,B,B,B,B,B,V,V,_,_],
      [_,D,D,D,D,D,Y,D,D,_,V,B,M,B,M,B,V,V,_,_],
      [D,V,D,D,D,Y,Y,Y,D,_,V,B,B,M,B,B,V,V,_,_],
      [D,D,V,D,D,Y,Y,Y,_,_,V,B,B,B,B,B,V,V,_,_],
      [D,D,D,V,D,Y,Y,Y,_,_,_,V,V,V,V,V,V,_,_,_],
      [_,D,D,D,_,Y,_,_,_,_,_,_,_,_,V,_,_,_,_,_],
      [_,_,_,_,S,S,S,S,_,_,_,_,V,V,V,V,_,_,_,_],
      [_,_,_,S,S,S,S,S,S,S,Y,Y,Y,D,D,D,D,D,D,D],
      [_,_,D,D,D,S,S,S,S,S,Y,Y,Y,D,D,D,D,D,D,D],
      [_,D,D,D,D,D,S,S,S,S,D,V,V,V,V,D,D,D,D,D],
      [_,D,D,D,D,D,S,S,S,_,D,D,D,D,D,D,D,D,D,D],
      [_,D,D,D,D,D,S,S,S,_,D,_,_,_,_,_,_,_,_,D],
    ],
  },
  {
    xPct: 0.05, yPct: 0.20, rotate: '2deg',
    pixels: [
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,S,S,S,S,S,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,S,S,S,M,M,M,S,S,S,_,_,_,_,_],
      [_,_,_,_,_,S,S,M,M,M,M,M,M,M,S,S,_,_,_,_],
      [_,_,_,_,S,S,M,M,M,V,V,V,M,M,M,S,S,S,_,_],
      [_,_,_,S,S,M,M,M,V,V,V,V,V,M,M,M,S,S,S,_],
      [_,_,S,S,M,M,V,V,V,Y,Y,Y,V,V,V,M,M,S,S,_],
      [_,_,S,S,M,M,V,V,Y,Y,Y,Y,Y,V,V,M,M,S,S,S],
      [_,S,S,M,M,V,V,Y,Y,_,_,_,Y,Y,V,V,M,M,S,S],
      [_,S,S,M,M,V,V,Y,Y,_,_,_,Y,Y,V,V,M,M,S,S],
      [S,S,M,M,V,V,Y,Y,_,_,_,_,_,Y,Y,V,V,M,M,S],
      [S,S,M,M,V,V,Y,Y,_,_,_,_,_,Y,Y,V,V,M,M,S],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    ],
  },
  {
    xPct: 0.32, yPct: 0.75, rotate: '-2deg',
    pixels: [
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,D,D,D,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,D,D,S,S,S,D,D,_,_,_,_,_],
      [_,_,_,_,_,_,_,D,Y,S,S,S,S,Y,S,D,_,_,_,_],
      [_,_,_,_,_,_,D,Y,S,Y,S,S,S,S,Y,S,D,_,_,_],
      [_,_,_,_,_,_,D,S,Y,S,S,S,S,S,S,K,D,_,_,_],
      [_,_,_,_,_,D,M,S,S,S,D,S,S,S,S,D,K,D,_,_],
      [_,_,_,_,_,D,M,M,S,S,D,S,S,S,S,D,S,D,_,_],
      [_,_,_,_,_,D,M,S,S,S,D,S,S,D,S,D,S,D,_,_],
      [_,_,_,_,_,D,S,S,S,S,V,S,S,D,S,V,S,D,_,_],
      [_,_,_,_,D,S,S,S,S,S,S,S,S,V,S,S,D,_,_,_],
      [_,_,_,_,D,S,K,D,D,B,S,S,S,S,S,S,B,D,_,_],
      [_,_,_,_,D,K,K,K,S,D,S,S,B,S,B,S,S,D,_,_],
      [_,_,_,D,S,S,K,S,S,D,S,B,B,B,B,B,S,D,_,_],
      [_,_,_,D,S,S,S,S,D,V,S,S,B,B,B,S,S,D,_,_],
      [_,_,D,M,D,D,D,D,V,S,S,S,S,B,S,S,S,D,_,_],
      [_,D,D,V,V,V,V,V,V,S,S,S,S,S,S,S,M,D,_,_],
      [_,_,D,D,D,D,D,D,S,S,S,S,S,S,S,K,K,D,_,_],
      [_,_,_,_,_,_,D,D,V,D,D,D,D,V,D,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,D,_,_,_,_,D,_,_,_,_,_,_],
    ],
  },
]

const SCALE = 5

function renderDoodle(pixels) {
  const cols = pixels[0].length
  const rows = pixels.length
  const cv = document.createElement('canvas')
  cv.width = cols * SCALE
  cv.height = rows * SCALE
  const ctx = cv.getContext('2d')
  ctx.fillStyle = W
  ctx.fillRect(0, 0, cv.width, cv.height)
  pixels.forEach((row, r) => row.forEach((color, c) => {
    if (!color) return
    ctx.fillStyle = color
    ctx.fillRect(c * SCALE, r * SCALE, SCALE, SCALE)
  }))
  return cv.toDataURL()
}

function DoodleSprite({ src, xPct, yPct, rotate, onClose }) {
  const [pos, setPos] = useState(() => ({
    x: xPct * (window.innerWidth - 130),
    y: yPct * (window.innerHeight - 90),
  }))

  const onPointerDown = useCallback((e) => {
    if (e.button !== 0) return
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    const startX = e.clientX - pos.x
    const startY = e.clientY - pos.y

    const onMove = (ev) => {
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 130, ev.clientX - startX)),
        y: Math.max(20, Math.min(window.innerHeight - 90, ev.clientY - startY)),
      })
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [pos])

  return (
    <div
      className={styles.doodle}
      style={{ left: pos.x, top: pos.y, transform: `rotate(${rotate})` }}
      onPointerDown={onPointerDown}
    >
      <img src={src} draggable={false} />
      <button
        className={styles.doodleClose}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onClose}
      >×</button>
    </div>
  )
}

export default function PixelDoodles() {
  const [items] = useState(() =>
    PRESET_DOODLES.map((d, i) => ({ id: i, src: renderDoodle(d.pixels), xPct: d.xPct, yPct: d.yPct, rotate: d.rotate }))
  )
  const [visible, setVisible] = useState(() => items.map(d => d.id))

  return (
    <>
      {items.filter(d => visible.includes(d.id)).map(d => (
        <DoodleSprite
          key={d.id}
          src={d.src}
          xPct={d.xPct}
          yPct={d.yPct}
          rotate={d.rotate}
          onClose={() => setVisible(v => v.filter(id => id !== d.id))}
        />
      ))}
    </>
  )
}
