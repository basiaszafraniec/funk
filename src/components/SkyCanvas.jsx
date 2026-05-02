import { useEffect, useRef } from 'react'

const SZ = 6

const CLOUD_A = [
  [0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
]
const CLOUD_B = [
  [0,0,1,1,1,0,0,0],
  [0,1,1,1,1,1,0,0],
  [1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,0],
]
const CLOUD_C = [
  [0,0,0,1,1,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,1,1,0],
]

export default function SkyCanvas() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const cv = canvasRef.current
    const ctx = cv.getContext('2d')

    function resize() {
      cv.width = window.innerWidth
      cv.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const clouds = [
      { shape: CLOUD_A, x: 0.05, y: 0.06, speed: 0.18, alpha: 0.92 },
      { shape: CLOUD_B, x: 0.38, y: 0.14, speed: 0.11, alpha: 0.72 },
      { shape: CLOUD_C, x: 0.62, y: 0.07, speed: 0.15, alpha: 0.85 },
      { shape: CLOUD_B, x: 0.82, y: 0.20, speed: 0.09, alpha: 0.60 },
      { shape: CLOUD_A, x: 1.10, y: 0.28, speed: 0.13, alpha: 0.70 },
    ]
    clouds.forEach(c => { c.px = c.x * cv.width; c.py = c.y * cv.height })

    function drawCloud(shape, cx, cy, alpha) {
      ctx.globalAlpha = alpha
      shape.forEach((row, r) => row.forEach((cell, c) => {
        if (!cell) return
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(cx + c * SZ, cy + r * SZ, SZ, SZ)
      }))
      ctx.globalAlpha = 1
    }

    const birds = [
      { x: -30, y: 0.18, speed: 0.55, flap: 0, flapDir: 1, active: false },
      { x: -60, y: 0.22, speed: 0.45, flap: 3, flapDir: 1, active: false },
      { x: -40, y: 0.13, speed: 0.60, flap: 6, flapDir: -1, active: false },
    ]

    const timers = [
      setTimeout(() => activateBird(birds[0]), 4000),
      setTimeout(() => activateBird(birds[1]), 10000),
      setTimeout(() => activateBird(birds[2]), 15000),
    ]

    function activateBird(b) {
      b.x = -30
      b.py = b.y * cv.height + (Math.random() * 40 - 20)
      b.active = true
    }

    function drawBird(b, color) {
      const wing = Math.sin(b.flap * 0.35) * 2
      ctx.fillStyle = color
      ctx.fillRect(b.x - 6, b.py + wing, 3, 2)
      ctx.fillRect(b.x - 3, b.py + wing * 0.5, 3, 2)
      ctx.fillRect(b.x, b.py, 2, 2)
      ctx.fillRect(b.x + 2, b.py + wing * 0.5, 3, 2)
      ctx.fillRect(b.x + 5, b.py + wing, 3, 2)
    }

    function tick() {
      ctx.clearRect(0, 0, cv.width, cv.height)
      const birdColor = getComputedStyle(document.documentElement).getPropertyValue('--purple').trim() || '#430396'

      clouds.forEach(c => {
        c.px += c.speed
        const cw = c.shape[0].length * SZ
        if (c.px > cv.width + cw) c.px = -cw
        drawCloud(c.shape, Math.round(c.px), Math.round(c.py), c.alpha)
      })

      birds.forEach(b => {
        if (!b.active) return
        b.x += b.speed
        b.flap += b.flapDir
        if (Math.abs(b.flap) > 8) b.flapDir *= -1
        drawBird(b, birdColor)
        if (b.x > cv.width + 30) {
          b.active = false
          setTimeout(() => activateBird(b), 30000 + Math.random() * 60000)
        }
      })

      rafRef.current = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        imageRendering: 'pixelated',
      }}
    />
  )
}
