import { useState, useEffect } from 'react'
import { useWindows } from '../context/WindowContext'
import { PROJECT_DATA } from '../data/projectData'
import StartMenu from './StartMenu'
import styles from './Taskbar.module.css'

const WIN_ICONS = {
  about:     '👤',
  projects:  '📁',
  audio:     '🎵',
  doodle:    '✏️',
  documents: '📄',
  project:   '◈',
}

const WIN_LABELS = {
  about:     'About Me',
  projects:  'Projects',
  audio:     'Music Player',
  doodle:    'Doodle',
  documents: 'Documents',
}

function getWinLabel(win) {
  if (win.type === 'project') {
    return PROJECT_DATA[win.meta?.projectId]?.title ?? 'Project'
  }
  return WIN_LABELS[win.type] ?? win.type
}

function Clock() {
  const fmt = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 10000)
    return () => clearInterval(id)
  }, [])
  return <span className={styles.clock}>{time}</span>
}

export default function Taskbar() {
  const { windows, focusWindow, minimizeWindow, closeWindow } = useWindows()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {menuOpen && <StartMenu onClose={() => setMenuOpen(false)} />}

      <div className={styles.taskbar}>
        <button
          className={`${styles.brand} ${menuOpen ? styles.brandActive : ''}`}
          onClick={() => setMenuOpen(m => !m)}
        >
          <span className={styles.startIcon}>⊞</span>
          start
        </button>

        <div className={styles.sep} />

        <div className={styles.windowList}>
          {windows.map((win) => (
            <div key={win.id} className={`${styles.winItem} ${win.minimized ? styles.minimized : ''}`}>
              <button
                className={styles.winBtn}
                onClick={() => {
                  if (win.minimized) minimizeWindow(win.id)
                  focusWindow(win.id)
                }}
              >
                <span className={styles.winIcon}>{WIN_ICONS[win.type] ?? '◈'}</span>
                {getWinLabel(win)}
              </button>
              <button
                className={styles.winClose}
                onClick={() => closeWindow(win.id)}
                aria-label="Close"
              >
                <div className={styles.xIcon} />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.right}>
          <Clock />
        </div>
      </div>
    </>
  )
}
