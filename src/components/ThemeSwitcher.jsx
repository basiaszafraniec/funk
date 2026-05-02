import { useState, useEffect } from 'react'
import styles from './ThemeSwitcher.module.css'

const THEMES = [
  { id: 'violet',    name: 'Violet Dream', dots: ['#430396', '#f891e9', '#a5e0ff'] },
  { id: 'sakura',    name: 'Sakura',       dots: ['#5c1a3a', '#ff8fab', '#ffc8da'] },
  { id: 'forest',    name: 'Forest Sprite',dots: ['#1b4332', '#74d89e', '#b8dfc0'] },
  { id: 'midnight',  name: 'Midnight',     dots: ['#b095f0', '#ff6ec7', '#0d0820'] },
  { id: 'tangerine', name: 'Tangerine',    dots: ['#7a3500', '#ffb800', '#ffcf7a'] },
]

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(() => localStorage.getItem('theme') || 'violet')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', active)
  }, [active])

  function pick(id) {
    localStorage.setItem('theme', id)
    setActive(id)
  }

  return (
    <div className={styles.wrap}>
      {open && (
        <div className={styles.panel}>
          <p className={styles.heading}>theme</p>
          {THEMES.map(t => (
            <button
              key={t.id}
              className={`${styles.row} ${active === t.id ? styles.activeRow : ''}`}
              onClick={() => pick(t.id)}
            >
              <span className={styles.dots}>
                {t.dots.map((c, i) => (
                  <span key={i} className={styles.dot} style={{ background: c }} />
                ))}
              </span>
              <span className={styles.name}>{t.name}</span>
              {active === t.id && <span className={styles.check}>✓</span>}
            </button>
          ))}
        </div>
      )}
      <button
        className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`}
        onClick={() => setOpen(o => !o)}
        title="change theme"
      >
        🎨
      </button>
    </div>
  )
}
