import { useEffect, useRef } from 'react'
import { useWindows } from '../context/WindowContext'
import styles from './StartMenu.module.css'

const MENU_ITEMS = [
  { type: 'projects',  icon: '📁', label: 'Projects',    sub: 'browse my work' },
  { type: 'about',     icon: '👤', label: 'About Me',    sub: 'who am i' },
  { type: 'audio',     icon: '🎵', label: 'Music Player', sub: 'chiptune playlist' },
  { type: 'doodle',    icon: '✏️', label: 'Doodle',       sub: 'pixel drawing tool' },
  { type: 'documents', icon: '📄', label: 'Documents',    sub: 'cv & certificates' },
]

export default function StartMenu({ onClose }) {
  const { openWindow } = useWindows()
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    setTimeout(() => window.addEventListener('pointerdown', handleClick), 0)
    return () => window.removeEventListener('pointerdown', handleClick)
  }, [onClose])

  function open(type) {
    openWindow(type)
    onClose()
  }

  return (
    <div ref={ref} className={styles.menu}>
      {/* header strip */}
      <button className={styles.header} onClick={() => open('about')}>
        <div className={styles.avatar}>B</div>
        <div>
          <p className={styles.headerName}>Basia Szafraniec</p>
          <p className={styles.headerRole}>developer & designer</p>
        </div>
      </button>

      {/* programs list */}
      <div className={styles.body}>
        <p className={styles.sectionLabel}>Programs</p>
        {MENU_ITEMS.map(item => (
          <button key={item.type} className={styles.item} onClick={() => open(item.type)}>
            <span className={styles.itemIcon}>{item.icon}</span>
            <span className={styles.itemText}>
              <span className={styles.itemLabel}>{item.label}</span>
              <span className={styles.itemSub}>{item.sub}</span>
            </span>
          </button>
        ))}
      </div>

      <div className={styles.divider} />

      {/* bottom section */}
      <div className={styles.footer}>
        <a
          href="https://github.com/basiaszafraniec"
          target="_blank"
          rel="noreferrer"
          className={styles.footerItem}
          onClick={onClose}
        >
          <span>⌂</span> GitHub
        </a>
        <a
          href="mailto:basia.szafraniec@gmail.com"
          className={styles.footerItem}
          onClick={onClose}
        >
          <span>✉</span> Email
        </a>
        <a
          href="https://www.linkedin.com/in/basia-szafraniec"
          target="_blank"
          rel="noreferrer"
          className={styles.footerItem}
          onClick={onClose}
        >
          <span>in</span> LinkedIn
        </a>
        <button
          className={`${styles.footerItem} ${styles.shutdown}`}
          onClick={() => { sessionStorage.removeItem('visited'); location.reload() }}
        >
          <span>⏻</span> Log Out
        </button>
      </div>
    </div>
  )
}
