import { useRef, useState, useCallback } from 'react'
import { useWindows } from '../context/WindowContext'
import { useGridDrag } from '../hooks/useGridDrag'
import DesktopIcon from './DesktopIcon'
import Window from './Window'
import Taskbar from './Taskbar'
import SkyCanvas from './SkyCanvas'
import PixelDoodles from './PixelDoodles'
import AboutWindow from './windows/AboutWindow'
import ProjectsWindow from './windows/ProjectsWindow'
import ProjectDetailWindow from './windows/ProjectDetailWindow'
import AudioPlayer from './windows/AudioPlayer'
import DoodleWindow from './windows/DoodleWindow'
import DocumentsWindow from './windows/DocumentsWindow'
import { PROJECT_DATA } from '../data/projectData'
import styles from './Desktop.module.css'

const CELL = 90
const OFFSET_X = 20
const OFFSET_Y = 24

const ICONS = [
  { type: 'projects',  label: 'Projects',  icon: '/assets/folder2.png' },
  { type: 'about',     label: 'About Me',  icon: '/assets/face1.png'   },
  { type: 'audio',     label: 'Music',     icon: '/assets/record1.png' },
  { type: 'doodle',    label: 'Doodle',    icon: '/assets/paint1.png'  },
  { type: 'documents', label: 'Documents', icon: '/assets/doc1.png'    },
]

//  Projects   About Me
//  Music
//  Doodle     Documents
const INITIAL_POSITIONS = {
  projects:  { x: OFFSET_X + CELL * 4, y: OFFSET_Y + CELL * 2 }, //5th column 3rd row
  about:     { x: OFFSET_X + CELL * 6, y: OFFSET_Y + CELL }, //7th column 2nd row
  audio:     { x: OFFSET_X,          y: OFFSET_Y + CELL * 4 }, //1st column 5th row
  doodle:    { x: OFFSET_X,          y: OFFSET_Y + CELL * 3 }, //1st column 4th row
  documents: { x: OFFSET_X + CELL * 8, y: OFFSET_Y + CELL * 3 }, //9th column 4th row
}

const WINDOW_TITLES = {
  about:     'about_me.txt',
  projects:  'projects/',
  audio:     'music_player',
  doodle:    'doodle.png',
  documents: 'documents/',
}

const WINDOW_SIZES = {
  about:     { width: 600 },
  projects:  { width: 660, height: 380 },
  audio:     { width: 320 },
  doodle:    { width: 460 },
  documents: { width: 580, height: 360 },
  project:   { width: 500 },
}

const TICKER_WORDS = ['basia', 'szafraniec', 'barbara', 'szafraniec']

function WindowContent({ type, meta }) {
  switch (type) {
    case 'about':     return <AboutWindow />
    case 'projects':  return <ProjectsWindow />
    case 'audio':     return <AudioPlayer />
    case 'doodle':    return <DoodleWindow />
    case 'documents': return <DocumentsWindow />
    case 'project':   return <ProjectDetailWindow projectId={meta?.projectId} />
    default:          return null
  }
}

export default function Desktop() {
  const { windows, openWindow, stickers, removeSticker } = useWindows()
  const { getPos, onPointerDown: onIconPointerDown, draggingId, wasDragged } = useGridDrag(INITIAL_POSITIONS)

  const [catClicks, setCatClicks] = useState(0)
  const meowRef  = useRef(null)
  const angryRef = useRef(null)
  const [catBounce, setCatBounce] = useState(false)

  function handleCatClick() {
    const clicks = catClicks + 1
    setCatClicks(clicks)
    setCatBounce(true)
    setTimeout(() => setCatBounce(false), 400)
    const audio = clicks >= 3 ? angryRef.current : meowRef.current
    if (audio) { audio.currentTime = 0; audio.play().catch(() => {}) }
  }

  const [stickyPos, setStickyPos] = useState(null)
  const onStickyPointerDown = useCallback((e) => {
    if (e.button !== 0) return
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const startX = e.clientX - rect.left
    const startY = e.clientY - rect.top
    const onMove = (ev) => setStickyPos({ x: ev.clientX - startX, y: ev.clientY - startY })
    const onUp   = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [])

  const [stickerPositions, setStickerPositions] = useState({})
  const onStickerPointerDown = useCallback((id, e) => {
    if (e.button !== 0) return
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    const cur = stickerPositions[id] || stickers.find(s => s.id === id) || { x: 0, y: 0 }
    const startX = e.clientX - cur.x
    const startY = e.clientY - cur.y
    const onMove = (ev) => setStickerPositions(p => ({ ...p, [id]: { x: ev.clientX - startX, y: ev.clientY - startY } }))
    const onUp   = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [stickerPositions, stickers])

  return (
    <div className={styles.desktop}>
      <audio ref={meowRef}  src="/assets/meow.mp3"      preload="auto" />
      <audio ref={angryRef} src="/assets/angy-meow.mp3" preload="auto" />

      <SkyCanvas />
      <PixelDoodles />

      {/* scrolling ticker */}
      <div className={styles.ticker}>
        <ul className={styles.tickerList}>
          {[...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS].map((w, i) => <li key={i}>{w}</li>)}
        </ul>
      </div>

      {/* grid-draggable icons */}
      {ICONS.map((icon) => {
        const pos = getPos(icon.type)
        const isDragging = draggingId === icon.type
        return (
          <div
            key={icon.type}
            className={`${styles.iconWrap} ${isDragging ? styles.iconDragging : ''}`}
            style={{ left: pos.x, top: pos.y }}
            onPointerDown={(e) => onIconPointerDown(icon.type, e)}
            onClick={() => { if (!wasDragged()) openWindow(icon.type) }}
          >
            <DesktopIcon icon={icon.icon} label={icon.label} />
          </div>
        )
      })}

      {/* sticky note */}
      <div
        className={styles.sticky}
        style={stickyPos ? { left: stickyPos.x, top: stickyPos.y } : undefined}
        onPointerDown={onStickyPointerDown}
      >
        <span className={styles.tape} />
        <p className={styles.stickyTitle}>say hi! ✦</p>
        <div className={styles.stickyLinks}>
          <a href="https://github.com/basiaszafraniec" target="_blank" rel="noreferrer" className={styles.stickyLink}><span>⌂</span> github</a>
          <a href="mailto:basia.szafraniec@gmail.com" className={styles.stickyLink}><span>✉</span> email</a>
          <a href="https://www.linkedin.com/in/basia-szafraniec" target="_blank" rel="noreferrer" className={styles.stickyLink}><span className={styles.linkedinBadge}>in</span> linkedin</a>
        </div>
      </div>

      {/* user doodle stickers */}
      {stickers.map((s) => {
        const pos = stickerPositions[s.id] || { x: s.x, y: s.y }
        return (
          <div key={s.id} className={styles.sticker}
            style={{ left: pos.x, top: pos.y, transform: `rotate(${s.rotate})` }}
            onPointerDown={(e) => onStickerPointerDown(s.id, e)}
          >
            <img src={s.dataUrl} alt="sticker" draggable={false} style={{ imageRendering: 'pixelated', display: 'block', width: 100 }} />
            <button className={styles.stickerClose} onPointerDown={(e) => e.stopPropagation()} onClick={() => removeSticker(s.id)} aria-label="Remove"><div className={styles.xIcon} /></button>
          </div>
        )
      })}

      <img src="/assets/cat1.png" alt="pixel cat"
        className={`${styles.cat} ${catBounce ? styles.catBounce : ''}`}
        onClick={handleCatClick} title="click me!" />

      <Taskbar />

      {windows.map((win) => {
        const title = win.type === 'project'
          ? (PROJECT_DATA[win.meta?.projectId]?.title ?? 'project') + '.txt'
          : WINDOW_TITLES[win.type]
        return (
          <Window key={win.id} id={win.id}
            title={title}
            position={win.position} zIndex={win.zIndex} minimized={win.minimized}
            {...WINDOW_SIZES[win.type]}
          >
            <WindowContent type={win.type} meta={win.meta} />
          </Window>
        )
      })}
    </div>
  )
}
